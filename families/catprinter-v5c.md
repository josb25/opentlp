---
id: catprinter-v5c
name: Catprinter V5C / YTB01
summary: 384-dot row-raster protocol with 56 88 packets and notification-based buffer flow control.
also_known_as: [V5C protocol, YTB01 protocol]
transports: [ble]
acknowledges: false

framing:
  prefix: "56 88"
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
  max_write_bytes: 123
  control: notify-pause
  pause_bytes: "56 88 a7 01 01 00 01 07 ff"
  resume_bytes: "56 88 a7 01 01 00 00 00 ff"

commands:
  - opcode: aa
    name: Initialise connection
    payload: "00"
  - opcode: a1
    name: Query status
    payload: "00"
  - opcode: a2
    name: Set density and content mode
    payload: density (01..03), mode (01 text or 02 image)
  - opcode: a3
    name: Begin print
    payload: "01"
  - opcode: a4
    name: Print raw row
    payload: 48 packed bytes at 384 dots
  - opcode: a6
    name: Finish and position paper
    payload: "30 00"
  - opcode: a7
    name: Buffer flow notification
    direction: from-printer
    payload: "01 pause or 00 resume"

conformance:
  vectors_url: https://github.com/josb25/BleWebler2/tree/21849a5/packages/core/src/drivers/catprinter
  licence: MIT
  covers: [framing, checksum, row packing, job structure, flow-control]

implementations:
  - project: timini-print
    url: https://github.com/Dejniel/TiMini-Print/tree/a9a456c4243132bad52c500e39bdec221fe98db9
  - project: blewebler2
    url: https://github.com/josb25/BleWebler2/tree/21849a5/packages/core/src/drivers/catprinter

status: reported

sources:
  - kind: oss-project
    url: https://github.com/Dejniel/TiMini-Print/tree/a9a456c4243132bad52c500e39bdec221fe98db9
    licence: Apache-2.0
    note: V5C packet format, YTB01 association, job commands, raster encoding, BLE pacing, connection settle time and pause/resume notifications.
  - kind: oss-project
    url: https://github.com/josb25/BleWebler2/tree/21849a5/packages/core/src/drivers/catprinter
    licence: MIT
    note: Independent TypeScript implementation with packet, raster and corrected notification-flag flow-control tests.
---

V5C uses service `0000ae30`, writes on `0000ae01`, and reports flow and status
on `0000ae02`. Packets use a `56 88` prefix and the same payload-only CRC-8
parameters found in several Catprinter families.

A connection sends `AA 00` after a 600 ms settle interval. An image job sends
an `A2` density/mode packet, opens printing with `A3 01`, and wraps each
384-dot LSB-first row in an `A4` packet. `A6 30 00` finishes the raster and an
`A1` query requests status.

The `A7 01` notification pauses outgoing writes while `A7 00` resumes them.
These frames use flag byte `01`; ordinary command packets use flag byte `00`.

## Not yet recorded

Status payload meanings verified on YTB01 hardware, maximum print length and
the optional compressed raster mode.
