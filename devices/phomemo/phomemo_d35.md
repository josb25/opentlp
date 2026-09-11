---
id: phomemo_d35
brand: Phomemo
model: D35

protocol:
  family: phomemo-dq

print:
  colour: monochrome

connectivity:
  ble:
    service_uuid: 0000ff00-0000-1000-8000-00805f9b34fb
    write_uuid: 0000ff02-0000-1000-8000-00805f9b34fb
    notify_uuid: 0000ff03-0000-1000-8000-00805f9b34fb
    name_pattern: "D35"

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
  - kind: oss-project
    url: https://github.com/transcriptionstream/phomymo
    note: >-
      Lists this model as supported. Its README states MIT but the repository
      carries no licence file, so only factual claims are taken from it.
---

Listed as supported by [phomymo](https://github.com/transcriptionstream/phomymo).
Nothing here has been confirmed against hardware.

## Printable width

phomymo states 12-15 mm media; the printable width is not stated.

## Not yet recorded

Mechanism, media handling, power, indicators and what the printer reports back.
