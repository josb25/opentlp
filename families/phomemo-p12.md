---
id: phomemo-p12
name: Phomemo P12/A30
summary: Narrow tape printers using response-paced 1f 11 setup exchanges and raw GS v 0 raster.
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
  - opcode: 1f 11 38
    name: Setup exchange 1
  - opcode: 1f 11 11
    name: Status or setup query
    description: One of six response-paced setup groups used before raster data.
  - opcode: 1b 40 1d 76 30 00
    name: Initialise and raster bit image
    payload: width u16le in bytes, height u16le in rows, packed raster
  - opcode: 1b 64 0d
    name: Tape feed
    description: Sent twice after the raster.

status: reported

sources:
  - kind: oss-project
    url: https://github.com/soburi/phomemo_p12/tree/3c1bf0d4237c92321a51f600c66bdc0b5640e529
    licence: MIT
    note: Primary public P12 implementation for setup exchanges, response pacing and print flow.
  - kind: oss-project
    url: https://github.com/transcriptionstream/phomymo/tree/1f58d3f0e7f941b9143277cda828380149e56855
    note: Licence metadata conflicts (README MIT, package.json ISC, no licence file); used only to corroborate protocol facts and the A30 row width.
  - kind: oss-project
    url: https://github.com/josb25/BleWebler2/commit/56a4106
    licence: MIT
    note: Independent TypeScript implementation and protocol-level tests.
---

## Name collision

`P12` is also used by incompatible Marklife printers on the same common FF00
BLE service. A name and service alone therefore cannot identify the protocol.
BleWebler2 exposes this family in its manual driver selector and refuses to
guess when automatic matching is ambiguous.
