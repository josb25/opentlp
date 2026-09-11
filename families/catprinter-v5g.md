---
id: catprinter-v5g
name: Catprinter V5G
summary: 384-dot 51 78 family with an F2 density command and one raw A2 packet per print row.
also_known_as: [V5G dot protocol, YT01 V5G protocol]
transports: [ble]
acknowledges: false

framing:
  prefix: "51 78"
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
  max_write_bytes: 56
  control: none
  note: One 384-dot A2 row frame is 56 bytes including its packet envelope; public implementations also group rows when the negotiated BLE payload permits it.

commands:
  - opcode: f2
    name: Set density
    payload: 01, density (u8 in the range 1..200)
  - opcode: a3
    name: Query device state
    payload: "00"
  - opcode: a4
    name: Set blackening level
    payload: ASCII 1 through 5
  - opcode: a6
    name: Set lattice
    payload: Fixed start or finish envelope
  - opcode: af
    name: Set energy
    payload: u16le
  - opcode: be
    name: Set image mode
    payload: "00"
  - opcode: bd
    name: Feed control
    payload: u8 control value
  - opcode: a2
    name: Print raw row
    payload: 48 packed bytes at 384 dots
  - opcode: a1
    name: Position paper
    payload: 30 00 at 203 dpi

conformance:
  vectors_url: https://github.com/josb25/BleWebler2/tree/63479ab/packages/core/src/drivers/catprinter
  licence: MIT
  covers: [framing, checksum, row packing, job structure]

implementations:
  - project: timini-print
    url: https://github.com/Dejniel/TiMini-Print/tree/a9a456c4243132bad52c500e39bdec221fe98db9
  - project: blewebler2
    url: https://github.com/josb25/BleWebler2/commit/63479ab

status: reported

sources:
  - kind: oss-project
    url: https://github.com/Dejniel/TiMini-Print/tree/a9a456c4243132bad52c500e39bdec221fe98db9
    licence: Apache-2.0
    note: Packet format, V5G command sequence, raster encoding, BLE endpoints, pacing profiles and advertised-name associations.
  - kind: oss-project
    url: https://github.com/josb25/BleWebler2/commit/63479ab
    licence: MIT
    note: Independent TypeScript implementation and conformance tests derived from the documented wire facts.
---

V5G uses service `0000ae30`, writes packets to `0000ae01`, and may expose
notifications on `0000ae02`. A monochrome job sets density, queries device
state, selects blackening, opens the lattice, sets energy and image mode, then
sends one `A2` packet for each 384-dot row. The job closes with feed control,
paper positioning, the finish lattice and two device-state queries.

## Relationship to Tiny

V5G and Tiny share the `51 78` envelope, CRC-8 parameters, AE30 GATT service
and several command numbers. They differ in command meanings and job order.
V5G uses `F2` density and raw `A2` row packets; Tiny may select `BF` RLE rows
and follows its own setup and feed sequence.

## Advertised-name ambiguity

TiMini associates V5G with `YT01`, `YT02`, `MX01`, `MX05`, `MX06`, `MX08`,
`MX09`, `MX10`, `MX11`, `MX12`, `MX13`, `MXTP-100`, `MXPC-100`,
`AZ-P2108X`, `PD01`, `URBANWORXKIDSCAMERA`, `CYLOBTPRINTER`, `XOPOPPY`,
`BQ01`, `BQ02`, `BQ03`, `BQ05`, `BQ06`, `BQ06B`, `BQ07`, `BQ7A`, `BQ7B`,
`BQ08`, `BQ17`, `BQ95`, `BQ95B`, `BQ95C`, `BQ96`, `MXW009`, `MXW010`,
`EWTTOET-Z0499`, `EWTTOET-N3689`, `EWTTOET-N3687`, `KP-IM606`,
`GV-MA211`, `X6`, `K06`, `MINIPRINTER` and `JL-BR22`.

Some of these names also occur on Tiny hardware. TiMini additionally selects
V5X for units in this name group whose Bluetooth address ends in `59`. Web
Bluetooth normally exposes an opaque device identifier rather than the address,
and all three families may expose AE30, so a browser cannot always distinguish
them before sending a protocol-specific query or print job.

## Not yet recorded

Notification payload meanings and hardware-verified density ranges for each
advertised-name group.
