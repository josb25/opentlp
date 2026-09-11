---
id: phomemo_t02
brand: Phomemo
model: T02

protocol:
  family: phomemo-m-series

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
    name_pattern: "T02"

support:
  phomemo-tools:
    level: listed
    notes: Named in the project's supported-model list.
  blewebler2:
    level: listed
    notes: Experimental general M-series driver added in c029b12.

status: unverified

sources:
  - kind: oss-project
    url: https://github.com/josb25/BleWebler2/commit/c029b12
    licence: MIT
    note: Implements the 384-dot T02 profile.
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
