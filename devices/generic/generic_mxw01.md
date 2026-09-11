---
id: generic_mxw01
brand: Generic
model: MXW01

protocol:
  family: catprinter-v5x
  variant: bulk-raster
  packet_prefix: 22 21

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
    name_pattern: "^MXW01(?:-1)?$"
    name_examples: [MXW01, MXW01-1]

support:
  blewebler2:
    level: listed
    notes: Experimental V5X/MXW01 driver added in 6ed47ca.
  timini-print:
    level: listed

status: reported

sources:
  - kind: oss-project
    url: https://github.com/jeremy46231/MXW01-catprinter/blob/0744587459fbe9644b4a2295c9a3ecb06b12d5cc/PROTOCOL.md
    licence: MIT
    note: Records the GATT layout, packet format, 384-dot raster and working print flow.
  - kind: oss-project
    url: https://github.com/josb25/BleWebler2/commit/6ed47ca
    licence: MIT
    note: Implements experimental printing and automatic MXW01-name detection.
  - kind: oss-project
    url: https://github.com/Dejniel/TiMini-Print/tree/a9a456c4243132bad52c500e39bdec221fe98db9
    licence: Apache-2.0
    note: Lists MXW01 and MXW01-1 in its V5X clone group.
---

MXW01 is the best-documented member of the V5X family. It is not a Tiny
`51 78` printer: image data uses a dedicated AE03 characteristic and control
packets begin `22 21`.

## Rebrand handling

Other V5X names are recorded on the family page. They are not aliases here
because shared protocol support alone does not prove that their non-protocol
hardware facts match MXW01.

## Not yet recorded

Manufacturer, certification, battery, enclosure, indicators and cutter geometry.
