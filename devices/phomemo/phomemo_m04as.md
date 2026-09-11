---
id: phomemo_m04as
brand: Phomemo
model: M04AS

protocol:
  family: phomemo-m04

print:
  dpi: 300
  media: [continuous]
  colour: monochrome

mechanism:
  media_widths_mm: { min: 15, max: 110 }

connectivity:
  ble:
    service_uuid: 0000ff00-0000-1000-8000-00805f9b34fb
    write_uuid: 0000ff02-0000-1000-8000-00805f9b34fb
    notify_uuid: 0000ff03-0000-1000-8000-00805f9b34fb
    name_pattern: "M04AS"

support:
  blewebler2:
    level: listed
    notes: Experimental multi-width M04 driver added in 1f5eb8b.

status: unverified

sources:
  - kind: oss-project
    url: https://github.com/josb25/BleWebler2/commit/1f5eb8b
    licence: MIT
    note: Implements the experimental protocol and dynamically selects its raster profile from the print-job paper.
  - kind: vendor-doc
    url: https://phomemo.com/products/m04as
    note: Product page gives 15/53/80/110 mm paper support and 300/304 dpi.
  - kind: oss-project
    url: https://github.com/transcriptionstream/phomymo/tree/1f58d3f0e7f941b9143277cda828380149e56855
    note: Licence metadata conflicts (README MIT, package.json ISC, no licence file); used only for protocol and hardware-test facts.
---

BleWebler2 lists this family as experimental. The underlying public protocol
implementation reports M04AS hardware testing, but this catalogue entry has not
been independently confirmed on a device.

## Printable width

The three known wide raster settings are 600, 896 and 1232 dots for nominal 53,
80 and 110 mm rolls. The vendor also lists 15 mm rolls; current public protocol
evidence uses the 600-dot profile for media at or below 53 mm.

## Not yet recorded

Indicators, exact narrow-roll alignment, cutter geometry and what the printer reports back.
