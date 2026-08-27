---
id: generic_ly10
brand: Generic Cat Printer
model: LY10
summary: A tiny-family printer that prefixes every packet with an extra 0x12 byte.

protocol:
  family: tiny
  variant: prefixed
  packet_prefix: "12 51 78"
  vendor_app: com.frogtosea.tinyPrint

print:
  width_dots: 384
  width_mm: 48
  media_width_mm: 58
  dpi: 203
  media: [continuous]
  colour: monochrome

connectivity:
  ble:
    service_uuid: 0000ae30-0000-1000-8000-00805f9b34fb
    write_uuid: 0000ae01-0000-1000-8000-00805f9b34fb
    notify_uuid: 0000ae02-0000-1000-8000-00805f9b34fb
    name_pattern: "LY10"
    name_examples: [LY10]

reports: []

status: reported

sources:
  - kind: oss-project
    url: https://github.com/Dejniel/TiMini-Print
    licence: Apache-2.0
    note: Golden protocol vectors distinguish the prefixed dialect.

documentation:
  - url: https://github.com/JJJollyjim/catprinter/blob/main/COMMANDS.md
    title: catprinter — command reference
    covers: [protocol]
    note: Documents the standard dialect; the framing differs by one byte.
---

## Protocol notes

- Framing begins `12 51 78` instead of `51 78`. Everything after that — command
  byte, little-endian length, payload, CRC-8 — matches
  [GB01](generic_gb01.html), as does the LSB-first row packing.
- A driver written for the standard dialect connects and writes without error,
  and does not print.
- `LY01` to `LY05` are not prefixed. The model stem is no guide to the dialect,
  hence the anchored name pattern. Where an advertised name is unrecognised, the
  standard dialect is the more common of the two.
