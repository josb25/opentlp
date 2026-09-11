---
id: phomemo-m110
name: Phomemo M110/M120/M220
summary: Label printers using ESC N setup, raw GS v 0 raster and a 1f f0 footer.
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
  - opcode: 1b 4e 0d
    name: Print speed
    payload: u8, 01 slow through 05 fast
  - opcode: 1b 4e 04
    name: Print density
    payload: u8, 01 through 0f
  - opcode: 1f 11
    name: Media type
    payload: 0a gapped, 0b continuous, 26 black mark
  - opcode: 1d 76 30 00
    name: Raster bit image
    payload: width u16le in bytes, height u16le in rows, packed raster
  - opcode: 1f f0 05 00 1f f0 03 00
    name: End job

status: reported

sources:
  - kind: oss-project
    url: https://github.com/vivier/phomemo-tools/blob/master/README.md#5-protocol-for-m110m120m220
    licence: GPL-3.0
    note: >-
      Primary protocol documentation derived from captured USB packets. OpenTLP
      records the observable command bytes and ranges, not implementation code.
  - kind: oss-project
    url: https://github.com/transcriptionstream/phomymo/tree/1f58d3f0e7f941b9143277cda828380149e56855
    note: Licence metadata conflicts (README MIT, package.json ISC, no licence file); used only to corroborate BLE transport and job-sequence facts.
  - kind: oss-project
    url: https://github.com/josb25/BleWebler2/commit/ab8fbb7
    licence: MIT
    note: Independent TypeScript implementation and protocol-level tests.
---

## Model widths

The public sources disagree. A captured M110-family example is 43 bytes (344
dots) per row, while another public implementation uses 48 bytes (384 dots) for
M110/M120. M220 is described as a 72 mm model and is represented as 576 dots in
BleWebler2, but that geometry has no hardware confirmation here.

Those uncertainties are attached to the model pages and are why BleWebler2 is
listed as experimental rather than working. They do not change the captured
command family.
