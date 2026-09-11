---
id: phomemo-m02
name: Phomemo M02
summary: Pocket printers using a 10 ff fe 01 wake prefix followed by raw ESC/POS raster commands.
based_on: ESC/POS
transports: [ble, usb]

raster:
  bit_order: msb-first
  polarity: 1-is-black
  row_padding: byte
  width_unit: bytes
  compression:
    algorithm: none

commands:
  - opcode: 10 ff fe 01
    name: Wake or protocol prefix
  - opcode: 1b 40
    name: Initialise
  - opcode: 1b 37
    name: Heat configuration
    payload: 07, heat time, 02
  - opcode: 1d 76 30 00
    name: Raster bit image
    payload: width u16le in bytes, height u16le in rows, packed raster
  - opcode: 1b 4a 08
    name: Minimal final feed

status: reported

sources:
  - kind: oss-project
    url: https://github.com/vivier/phomemo-tools/blob/master/README.md#4-protocol-for-m02
    licence: GPL-3.0
    note: >-
      Captured M02 raster framing, 48-byte rows and response examples. OpenTLP
      records wire facts only and does not reproduce GPL implementation code.
  - kind: oss-project
    url: https://github.com/transcriptionstream/phomymo/tree/1f58d3f0e7f941b9143277cda828380149e56855
    note: Licence metadata conflicts (README MIT, package.json ISC, no licence file); used only for BLE layout, wake prefix, heat setup, pacing and model facts.
  - kind: oss-project
    url: https://github.com/josb25/BleWebler2/commit/463c704
    licence: MIT
    note: Independent TypeScript implementation and protocol-level tests.
  - kind: oss-project
    url: https://github.com/Dejniel/TiMini-Print/tree/a9a456c4243132bad52c500e39bdec221fe98db9
    licence: Apache-2.0
    note: Source for exact advertising-name mappings across the four M02 profiles.
---

M02, M02S and M02X use 48-byte/384-dot rows in the current public model
tables. M02 Pro uses a 78-byte row at 300 dpi. One source describes the Pro as
626 dots, but an integral 78-byte row carries 624 dots; hardware confirmation
is needed to explain the discrepancy.
