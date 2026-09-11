---
id: phomemo-dq
name: Phomemo D/Q rotated raster
summary: Narrow Phomemo label printers using raw MSB-first GS v 0 raster over the FF00 BLE service.
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
  - opcode: 1b 37
    name: Heat configuration
    payload: 07, heat time, 02
  - opcode: 1f 11
    name: Media type
    payload: 0a for gapped labels, 0b for continuous media
  - opcode: 1b 40 1d 76 30 00
    name: Initialise and raster bit image
    payload: width u16le in bytes, height u16le in rows, packed raster
  - opcode: 1b 64 00
    name: End job

status: unverified

sources:
  - kind: oss-project
    url: https://github.com/transcriptionstream/phomymo/tree/1f58d3f0e7f941b9143277cda828380149e56855
    note: >-
      Primary public implementation used for the GATT layout, model grouping,
      commands, rotation, raw raster format and 128-byte pacing. Licence
      metadata conflicts (README MIT, package.json ISC, no licence file), so
      OpenTLP records protocol facts only.
  - kind: oss-project
    url: https://github.com/josb25/BleWebler2/commit/e76a0e2
    licence: MIT
    note: Independent TypeScript driver and protocol-level tests.
---

## BLE layout

- Service: `0000ff00-0000-1000-8000-00805f9b34fb`
- Write: `0000ff02-0000-1000-8000-00805f9b34fb`
- Notify: `0000ff03-0000-1000-8000-00805f9b34fb`

The editor image is rotated clockwise into one printer row per label-length
column, packed MSB first. Public implementations pace the raster as 128-byte
writes with a 20 ms inter-write delay.

## Scope

This family is narrower than the Phomemo brand. M02, M04, M110, P12/A30,
general M-series and TSPL devices use different setup or job-control sequences
and must not be selected merely because the product says Phomemo.

No physical printer report or capture has yet verified this entry. The command
stream is implemented and tested against public protocol facts, so project
support is `listed`, not `works`.
