---
id: tspl
name: TSPL / TSPL2
summary: TSC's line-oriented label-printer language with binary bitmap payloads.
also_known_as: [TSPL2, TSC Printer Language]
transports: [usb, serial, tcp]
acknowledges: false

raster:
  bit_order: msb-first
  polarity: 0-is-black
  row_padding: byte
  width_unit: bytes
  compression:
    algorithm: none

flow:
  max_write_bytes: 512
  control: none

commands:
  - opcode: "53 49 5a 45"
    name: SIZE
    payload: label width and height
  - opcode: "47 41 50"
    name: GAP
    payload: gap and offset
  - opcode: "4f 46 46 53 45 54"
    name: OFFSET
    payload: signed media offset
  - opcode: "44 45 4e 53 49 54 59"
    name: DENSITY
    payload: level 0-15
  - opcode: "53 50 45 45 44"
    name: SPEED
    payload: speed level
  - opcode: "43 4c 53"
    name: CLS
  - opcode: "42 49 54 4d 41 50"
    name: BITMAP
    payload: x, y, width bytes, height dots, mode, binary raster
  - opcode: "50 52 49 4e 54"
    name: PRINT
    payload: sets and copies

status: reported

sources:
  - kind: vendor-doc
    url: https://fs.tscprinters.com/system/files/31-0000001-00_tspl_tspl2_programming_3_0.pdf
    note: TSC's official programming manual defines the directives and BITMAP layout.
  - kind: oss-project
    url: https://github.com/josb25/BleWebler2/commit/bb4fd7e
    licence: MIT
    note: Independent TypeScript subset for bitmap printing, with protocol-level tests.
---

Commands are ASCII and normally end in CRLF. `BITMAP` is the exception: its
comma-terminated ASCII header is followed immediately by `width × height`
binary bytes, then CRLF. `PRINT` commits the label buffer.

TSPL is vendor-neutral protocol documentation, so implementations should be
written from the programming specification rather than copied from a device
driver. Individual printers may implement only a subset or add extensions.

