---
id: phomemo_p12pro
brand: Phomemo
model: P12 Pro

protocol:
  family: phomemo-p12

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
    name_pattern: "P12 PRO|P12PRO"

support:
  blewebler2:
    level: listed
    notes: Experimental P12/A30 driver added in 56a4106.

status: unverified

sources:
  - kind: oss-project
    url: https://github.com/transcriptionstream/phomymo/tree/1f58d3f0e7f941b9143277cda828380149e56855
    note: Licence metadata conflicts (README MIT, package.json ISC, no licence file); used only for P12 Pro family and geometry facts.
  - kind: oss-project
    url: https://github.com/josb25/BleWebler2/commit/56a4106
    licence: MIT
    note: Implements the P12 Pro profile.
---

The protocol association and geometry come from public implementations; no
physical P12 Pro report is recorded yet.
