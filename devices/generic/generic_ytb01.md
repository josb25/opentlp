---
id: generic_ytb01
brand: Generic
model: YTB01

protocol:
  family: catprinter-v5c
  variant: row-raster
  packet_prefix: "56 88"
  vendor_app: com.fun.mxw

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
    name_pattern: "YTB01"

support:
  blewebler2:
    level: listed
    notes: Experimental V5C driver added in 1a87e79; notification flag vectors corrected in 21849a5.
  timini-print:
    level: listed

status: reported

sources:
  - kind: oss-project
    url: https://github.com/Dejniel/TiMini-Print/tree/a9a456c4243132bad52c500e39bdec221fe98db9
    licence: Apache-2.0
    note: Associates the YTB01 advertised name and Fun Print app family with the V5C 384-dot profile.
  - kind: oss-project
    url: https://github.com/josb25/BleWebler2/tree/21849a5/packages/core/src/drivers/catprinter
    licence: MIT
    note: Implements experimental YTB01 detection and the V5C print flow.
---

YTB01 is the named V5C device in the public TiMini-Print catalogue. It uses a
384-dot mechanism and the Catprinter AE30 GATT service, but its `56 88` packets
are not compatible with Tiny, V5G or V5X.

## Not yet recorded

Manufacturer, certification, battery, enclosure, indicators, cutter geometry
and an observed Bluetooth name example.
