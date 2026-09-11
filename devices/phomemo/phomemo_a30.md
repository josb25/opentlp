---
id: phomemo_a30
brand: Phomemo
model: A30

protocol:
  family: phomemo-p12

print:
  width_dots: 120
  width_mm: 15
  dpi: 203
  colour: monochrome

connectivity:
  ble:
    service_uuid: 0000ff00-0000-1000-8000-00805f9b34fb
    write_uuid: 0000ff02-0000-1000-8000-00805f9b34fb
    notify_uuid: 0000ff03-0000-1000-8000-00805f9b34fb
    name_pattern: "A30"

support:
  blewebler2:
    level: listed
    notes: Experimental P12/A30 driver added in 56a4106.

status: unverified

sources:
  - kind: oss-project
    url: https://github.com/josb25/BleWebler2/commit/56a4106
    licence: MIT
    note: Implements the 15-byte/120-dot A30 protocol profile.
  - kind: oss-project
    url: https://github.com/transcriptionstream/phomymo
    note: >-
      Lists this model as supported. Its README states MIT but the repository
      carries no licence file, so only factual claims are taken from it.
---

Listed as supported by [phomymo](https://github.com/transcriptionstream/phomymo).
Nothing here has been confirmed against hardware.

## Printable width

The 120-dot width follows the 15-byte wire profile. The printer accepts 12-15
mm continuous tape; actual printable margins remain unmeasured.

## Not yet recorded

Mechanism, media handling, power, indicators and what the printer reports back.
