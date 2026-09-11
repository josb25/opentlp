---
id: phomemo_m02x
brand: Phomemo
model: M02X

protocol:
  family: phomemo-m02

print:
  width_dots: 384
  width_mm: 48.0
  dpi: 203
  colour: monochrome

connectivity:
  ble:
    service_uuid: 0000ff00-0000-1000-8000-00805f9b34fb
    write_uuid: 0000ff02-0000-1000-8000-00805f9b34fb
    notify_uuid: 0000ff03-0000-1000-8000-00805f9b34fb
    name_pattern: "M02X"

support:
  blewebler2:
    level: listed
    notes: Experimental M02 driver added in 463c704; awaiting hardware validation.

status: unverified

sources:
  - kind: oss-project
    url: https://github.com/josb25/BleWebler2/commit/463c704
    licence: MIT
    note: Implements the M02X protocol profile.
  - kind: oss-project
    url: https://github.com/transcriptionstream/phomymo
    note: >-
      Lists this model as supported. Its README states MIT but the repository
      carries no licence file, so only factual claims are taken from it.
---

Listed as supported by [phomymo](https://github.com/transcriptionstream/phomymo).
Nothing here has been confirmed against hardware.

## Not yet recorded

Mechanism, media handling, power, indicators and what the printer reports back.
