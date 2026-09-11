---
id: phomemo_d50
brand: Phomemo
model: D50

protocol:
  family: phomemo-dq

print:
  width_dots: 192
  width_mm: 24
  dpi: 203
  colour: monochrome

connectivity:
  ble:
    service_uuid: 0000ff00-0000-1000-8000-00805f9b34fb
    write_uuid: 0000ff02-0000-1000-8000-00805f9b34fb
    notify_uuid: 0000ff03-0000-1000-8000-00805f9b34fb
    name_pattern: "D50"

support:
  blewebler2:
    level: listed
    notes: Experimental D/Q driver added in e76a0e2; awaiting hardware validation.

status: unverified

sources:
  - kind: oss-project
    url: https://github.com/josb25/BleWebler2/commit/e76a0e2
    licence: MIT
    note: Implements this model's D/Q protocol profile.
  - kind: vendor-doc
    url: https://phomemo.com/products/d50-labels-collection
    note: Documents 16, 20 and 24 mm media for D50.
---

The 192-dot width is inferred from the largest documented 24 mm medium at
203 dpi. This must be checked against a physical printer; it is not marked
verified or working.

