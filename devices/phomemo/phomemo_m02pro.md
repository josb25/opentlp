---
id: phomemo_m02pro
brand: Phomemo
model: M02 Pro

protocol:
  family: phomemo-m02

print:
  width_dots: 624
  width_mm: 53
  dpi: 300
  colour: monochrome

connectivity:
  ble:
    service_uuid: 0000ff00-0000-1000-8000-00805f9b34fb
    write_uuid: 0000ff02-0000-1000-8000-00805f9b34fb
    notify_uuid: 0000ff03-0000-1000-8000-00805f9b34fb
    name_pattern: "M02 Pro"

support:
  blewebler2:
    level: listed
    notes: Experimental M02 driver added in 463c704; awaiting hardware validation.

status: unverified

sources:
  - kind: oss-project
    url: https://github.com/josb25/BleWebler2/commit/463c704
    licence: MIT
    note: Implements the 78-byte M02 Pro protocol profile.
  - kind: oss-project
    url: https://github.com/transcriptionstream/phomymo
    note: >-
      Lists this model as supported. Its README states MIT but the repository
      carries no licence file, so only factual claims are taken from it.
---

Listed as supported by [phomymo](https://github.com/transcriptionstream/phomymo).
Nothing here has been confirmed against hardware.

## Printable width

phomymo states 626 dots at 300 dpi and 53 mm, while its wire-width table uses
78 bytes (624 dots). The profile uses the byte-aligned wire width and keeps the
discrepancy explicit pending a hardware report.

## Not yet recorded

Mechanism, media handling, power, indicators and what the printer reports back.
