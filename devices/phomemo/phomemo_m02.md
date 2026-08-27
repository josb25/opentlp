---
id: phomemo_m02
brand: Phomemo
model: M02

protocol:
  family: phomemo

print:
  width_dots: 384
  width_mm: 48
  dpi: 203
  colour: monochrome

connectivity:
  ble:
    name_pattern: "M02"

support:
  phomemo-tools:
    level: listed
    notes: Named in the project's supported-model list.

status: unverified

sources:
  - kind: oss-project
    url: https://github.com/vivier/phomemo-tools
    licence: GPL-3.0
    note: >-
      Names this model as supported, and states 48 bytes per line — 384 dots at
      203 dpi on 48 mm paper. The only Phomemo width every source agrees on.
  - kind: catalogue
    note: >-
      Transcribed from a driver's model table; specifications not confirmed against hardware.
---

Catalogued from a driver's model table. The printhead width is what that
table records; the mechanism, media handling and status reporting are unrecorded.
