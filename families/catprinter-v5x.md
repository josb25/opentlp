---
id: catprinter-v5x
name: Catprinter V5X / MXW01
summary: 384-dot bulk-raster family with 22 21 control packets and a separate AE03 data channel.
also_known_as: [MXW01 protocol, V5X protocol]
transports: [ble]
acknowledges: true

framing:
  prefix: "22 21"
  layout: prefix, command (u8), 0x00, length (u16le), payload, crc8, 0xff
  length:
    bytes: 2
    endian: little
    covers: payload
  checksum:
    algorithm: crc8
    polynomial: "0x07"
    init: "0x00"
    reflect_in: false
    reflect_out: false
    xor_out: "0x00"
    covers: payload

raster:
  bit_order: lsb-first
  polarity: 1-is-black
  row_padding: byte
  width_unit: bytes
  compression:
    algorithm: none

flow:
  max_write_bytes: 48
  control: ack-per-packet
  note: The A9 print request is acknowledged; bulk AE03 raster rows are paced without per-row acknowledgements.

commands:
  - opcode: a2
    name: Set intensity
    payload: u8 intensity
  - opcode: a9
    name: Request print
    payload: row count u16le, 30, mode
  - opcode: ad
    name: Flush raster data
    payload: "00"
  - opcode: aa
    name: Print complete notification

status: reported

sources:
  - kind: oss-project
    url: https://github.com/jeremy46231/MXW01-catprinter/blob/0744587459fbe9644b4a2295c9a3ecb06b12d5cc/PROTOCOL.md
    licence: MIT
    note: Dedicated public protocol description, explicitly marked incomplete by its author.
  - kind: oss-project
    url: https://github.com/Dejniel/TiMini-Print/tree/a9a456c4243132bad52c500e39bdec221fe98db9
    licence: Apache-2.0
    note: Independent implementation and V5X clone-name catalogue.
  - kind: oss-project
    url: https://github.com/josb25/BleWebler2/commit/6ed47ca
    licence: MIT
    note: Independent TypeScript implementation with protocol and driver tests.
---

Control packets go to AE01, replies arrive on AE02, and raw 48-byte raster rows
go to AE03. This characteristic split and the `22 21` prefix make the family
incompatible with the older Tiny `51 78` protocol despite the shared AE30
service and similar cat-shaped cases.

Public implementations pad jobs shorter than 90 rows to 4,320 bytes. A print
starts with A9 and should wait for an A9 acceptance response before bulk data;
AD flushes the completed raster.

## Detection names and rebrands

TiMini groups these advertised names with V5X: `X1`, `X2`, `MXW01`, `MXW01-1`,
`C17`, `MXW-W5`, `AC695X_PRINT`, `JK01`, `PORTABLEPRINTER`,
`INSTANTPRINTPLUS`, `REKA`, `HDMDT-00`, `KERUI` and `BH03`.

That is protocol evidence, not proof that every enclosure, battery and mechanism
is identical. They remain family-level detection names until individual hardware
records or certifications establish more.
