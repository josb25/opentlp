---
id: phomemo_m02
brand: Phomemo
model: M02
aliases:
  - M02C
  - Mr.in
  - Mr.in_M02

protocol:
  family: phomemo-m02

print:
  width_dots: 384
  width_mm: 48
  dpi: 203
  colour: monochrome

connectivity:
  ble:
    service_uuid: 0000ff00-0000-1000-8000-00805f9b34fb
    write_uuid: 0000ff02-0000-1000-8000-00805f9b34fb
    notify_uuid: 0000ff03-0000-1000-8000-00805f9b34fb
    name_pattern: "(?:M02|M02C|Mr\\.in|Mr\\.in_M02)"

support:
  phomemo-tools:
    level: listed
    notes: Named in the project's supported-model list.
  blewebler2:
    level: listed
    notes: Experimental M02 driver; exact advertising aliases added in 9c6a92a.

status: unverified

sources:
  - kind: oss-project
    url: https://github.com/josb25/BleWebler2/commit/9c6a92a
    licence: MIT
    note: Implements the M02 protocol profile.
  - kind: oss-project
    url: https://github.com/Dejniel/TiMini-Print/tree/a9a456c4243132bad52c500e39bdec221fe98db9
    licence: Apache-2.0
    note: Catalogues M02C, Mr.in and Mr.in_M02 as exact advertising names for M02.
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
