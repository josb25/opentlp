---
id: phomemo_d30s
brand: Phomemo
model: D30S

protocol:
  family: phomemo-dq

print:
  width_dots: 96
  width_mm: 12
  dpi: 203
  colour: monochrome

connectivity:
  ble:
    service_uuid: 0000ff00-0000-1000-8000-00805f9b34fb
    write_uuid: 0000ff02-0000-1000-8000-00805f9b34fb
    notify_uuid: 0000ff03-0000-1000-8000-00805f9b34fb
    name_pattern: "D30S"

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
    url: https://phomemo.com/products/thermal-label-white-multiple-sizes
    note: Names D30S as compatible with the same media range as D30/D35/Q30/Q30S.
---

Listed under the D/Q protocol from public implementation and vendor media
compatibility evidence. Nothing here has been confirmed against hardware.

