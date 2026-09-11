---
id: phomemo_q32
brand: Phomemo
model: Q32

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
    name_pattern: "Q32"

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
  - kind: catalogue
    note: >-
      Transcribed from a driver's model table; specifications not confirmed against hardware.
---

Catalogued from a driver's model table. The printhead width is what that
table records; the mechanism, media handling and status reporting are unrecorded.
