---
id: generic_bh01
brand: Generic
model: BH-01

protocol:
  family: funny-lx
  variant: lx-d-direct
  vendor_app: com.lailaixiong.funnyprint

print:
  width_dots: 384
  width_mm: 48
  media_width_mm: 58
  dpi: 203
  media: [continuous]
  colour: monochrome

connectivity:
  ble:
    service_uuid: 0000ffe6-0000-1000-8000-00805f9b34fb
    write_uuid: 0000ffe1-0000-1000-8000-00805f9b34fb
    notify_uuid: 0000ffe2-0000-1000-8000-00805f9b34fb
    name_pattern: "LX-D(?:0[1-9]|[2-9])"

support:
  blewebler2:
    level: listed
    notes: Experimental authenticated Funny LX driver added in b481ece.
  timini-print:
    level: listed

status: reported

sources:
  - kind: oss-project
    url: https://github.com/Dejniel/TiMini-Print/tree/a9a456c4243132bad52c500e39bdec221fe98db9
    licence: Apache-2.0
    note: Associates the BH-01 marketing name with LX-D01 through LX-D09 Bluetooth names and the 384-dot direct LX protocol.
  - kind: oss-project
    url: https://github.com/josb25/BleWebler2/commit/b481ece
    licence: MIT
    note: Implements experimental LX-D/BH-01 detection, authentication and printing.
---

BH-01 is the marketing name recorded for the direct LX-D printer group. The
supported firmware names are `LX-D01`, `LX-D02`, `LX-D2`, `LX-D3` through
`LX-D9`, and the zero-padded `LX-D03` through `LX-D09` forms.

Names such as `LX-D002` and `DL-T1` are not included because the source
catalogue assigns them to other, unsupported Funny Print protocol types.

## Not yet recorded

Manufacturer, certification, battery, enclosure, indicators, cutter geometry
and an observed Bluetooth scan record.
