---
id: phomemo-m-series
name: Phomemo general M-series
summary: Raw GS v 0 raster devices using ESC @, ESC 7 heat, GS | density and ESC J feed.
based_on: ESC/POS
transports: [ble]

raster:
  bit_order: msb-first
  polarity: 1-is-black
  row_padding: byte
  width_unit: bytes
  compression:
    algorithm: none

commands:
  - opcode: 1b 40
    name: Initialise
  - opcode: 1b 37
    name: Heat configuration
    payload: 07, heat time, 02
  - opcode: 1d 7c
    name: Density
    payload: u8 level
  - opcode: 1d 76 30 00
    name: Raster bit image
    payload: width u16le in bytes, height u16le in rows, packed raster
  - opcode: 1b 4a
    name: Feed
    payload: u8 dots

status: unverified

sources:
  - kind: oss-project
    url: https://github.com/transcriptionstream/phomymo/tree/1f58d3f0e7f941b9143277cda828380149e56855
    note: Licence metadata conflicts (README MIT, package.json ISC, no licence file); used only for model grouping, command sequence and BLE pacing facts.
  - kind: oss-project
    url: https://github.com/josb25/BleWebler2/commit/c029b12
    licence: MIT
    note: Independent TypeScript implementation and protocol-level tests.
  - kind: oss-project
    url: https://github.com/Dejniel/TiMini-Print/tree/a9a456c4243132bad52c500e39bdec221fe98db9
    licence: Apache-2.0
    note: Source for the exact T02E, Q02E and C02E Bluetooth-name aliases.
---

BleWebler2 currently assigns this sequence to M03, T02 (including exact aliases
T02E, Q02E and C02E), M200, M221, M250 and M260. M220 is not included because
captured documentation groups that retail
model with the M110/M120 command family. The public width claims remain
unverified on the individual model pages.
