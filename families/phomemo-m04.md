---
id: phomemo-m04
name: Phomemo M04S/M04AS
summary: Proprietary 300 dpi continuous-paper protocol with selectable raw-raster widths.
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
  - opcode: 1f 11 02
    name: Density
    payload: u8 level, 0-15
  - opcode: 1f 11 37
    name: Heat and speed
    payload: u8 parameter
  - opcode: 1f 11 0b
    name: Continuous media mode
  - opcode: 1f 11 35 00
    name: Raw raster mode
  - opcode: 1d 76 30 00
    name: Raster bit image
    payload: width u16le in bytes, height u16le in rows, packed raster
  - opcode: 1b 64 02
    name: Feed

status: unverified

sources:
  - kind: oss-project
    url: https://github.com/transcriptionstream/phomymo/tree/1f58d3f0e7f941b9143277cda828380149e56855
    note: Licence metadata conflicts (README MIT, package.json ISC, no licence file); used only for setup, raster-width, pacing, feed and hardware-test facts.
  - kind: oss-project
    url: https://github.com/josb25/BleWebler2/commit/1f5eb8b
    licence: MIT
    note: Independent TypeScript implementation with protocol and driver tests.
---

The known raw profiles use 75, 112 and 154 bytes per row: 600, 896 and 1232
dots. They correspond to the 53, 80 and 110 mm paper settings. Those are
printable raster widths, not a claim that the mechanism images every millimetre
of the nominal roll width.

BleWebler2 keeps this separate from the general Phomemo M-series driver because
the setup opcodes, density scale, chunk size and feed sequence differ.
