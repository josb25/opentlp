---
id: phomemo_m04s
brand: Phomemo
model: M04S

protocol:
  family: phomemo-m04

print:
  dpi: 300
  media: [continuous]
  colour: monochrome

mechanism:
  media_widths_mm: { min: 53, max: 110 }

connectivity:
  ble:
    service_uuid: 0000ff00-0000-1000-8000-00805f9b34fb
    write_uuid: 0000ff02-0000-1000-8000-00805f9b34fb
    notify_uuid: 0000ff03-0000-1000-8000-00805f9b34fb
    name_pattern: "M04S"

support:
  blewebler2:
    level: listed
    notes: Experimental multi-width M04 driver added in 1f5eb8b.

status: unverified

sources:
  - kind: oss-project
    url: https://github.com/josb25/BleWebler2/commit/1f5eb8b
    licence: MIT
    note: Implements the experimental protocol and the 53/80/110 mm raster profiles.
  - kind: vendor-doc
    url: https://phomemo.com/en-gb/products/m04as
    note: The comparison table gives M04S paper sizes, resolution, speed, battery and PC support.
  - kind: oss-project
    url: https://github.com/transcriptionstream/phomymo/tree/1f58d3f0e7f941b9143277cda828380149e56855
    note: Licence metadata conflicts (README MIT, package.json ISC, no licence file); used only for protocol and hardware-test facts.
---

BleWebler2 lists this family as experimental. The underlying public protocol
implementation reports hardware testing, but this catalogue entry has not been
independently confirmed on a device.

## Printable width

The three known raster settings are 600, 896 and 1232 dots for nominal 53, 80
and 110 mm rolls. Phomemo lists 300 dpi, 10–15 mm/s and a 2600 mAh battery for
M04S.

## Not yet recorded

Indicators, exact paper alignment, cutter geometry and what the printer reports back.
