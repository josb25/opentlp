---
id: phomemo_m03
brand: Phomemo
model: M03

protocol:
  family: phomemo-m-series

print:
  dpi: 203
  colour: monochrome

connectivity:
  ble:
    service_uuid: 0000ff00-0000-1000-8000-00805f9b34fb
    write_uuid: 0000ff02-0000-1000-8000-00805f9b34fb
    notify_uuid: 0000ff03-0000-1000-8000-00805f9b34fb
    name_pattern: "M03"

support:
  blewebler2:
    level: listed
    notes: Experimental general M-series driver added in c029b12.

status: unverified

sources:
  - kind: oss-project
    url: https://github.com/josb25/BleWebler2/commit/c029b12
    licence: MIT
    note: Implements an experimental 432-dot profile.
  - kind: oss-project
    url: https://github.com/vivier/phomemo-tools
    licence: GPL-3.0
    note: Documents the command set and per-model line widths.
  - kind: oss-project
    url: https://github.com/transcriptionstream/phomymo
    note: >-
      Lists supported models and widths. Its README states MIT but the
      repository carries no licence file, so only factual claims are taken
      from it.
  - kind: catalogue
    note: >-
      Transcribed from a driver's model table; specifications not confirmed against hardware.
---

Catalogued from a driver's model table. The printhead width is what that
table records; the mechanism, media handling and status reporting are unrecorded.

## Printable width is contested

Three sources disagree, and none of them is a measurement:

| Source | Claim |
|---|---|
| phomymo | 432 dots, 53 mm |
| a driver model table | 384 dots |

No width is recorded until this is resolved against hardware.
