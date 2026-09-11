---
id: phomemo_m120
brand: Phomemo
model: M120

protocol:
  family: phomemo-m110

print:
  dpi: 203
  colour: monochrome

connectivity:
  ble:
    service_uuid: 0000ff00-0000-1000-8000-00805f9b34fb
    write_uuid: 0000ff02-0000-1000-8000-00805f9b34fb
    notify_uuid: 0000ff03-0000-1000-8000-00805f9b34fb
    name_pattern: "M120"

support:
  phomemo-tools:
    level: listed
    notes: Named in the project's supported-model list.
  blewebler2:
    level: listed
    notes: Experimental family driver added in ab8fbb7; awaiting hardware validation.

status: unverified

sources:
  - kind: oss-project
    url: https://github.com/josb25/BleWebler2/commit/ab8fbb7
    licence: MIT
    note: Implements the captured 43-byte M120 protocol profile.
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
| phomymo | 384 dots, 48 mm |
| phomemo-tools | 344 dots (43 bytes per line) |
| a driver model table | 384 dots |

No width is recorded until this is resolved against hardware.
