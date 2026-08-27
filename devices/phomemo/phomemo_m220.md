---
id: phomemo_m220
brand: Phomemo
model: M220

protocol:
  family: phomemo

print:
  dpi: 203
  colour: monochrome

connectivity:
  ble:
    name_pattern: "M220"

support:
  phomemo-tools:
    level: listed
    notes: Named in the project's supported-model list.

status: unverified

sources:
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
| phomymo | 576 dots, 72 mm |
| phomemo-tools | 344 dots (43 bytes per line) |
| a driver model table | 384 dots |

No width is recorded until this is resolved against hardware.
