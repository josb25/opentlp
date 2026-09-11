---
id: phomemo_m02s
brand: Phomemo
model: M02S
aliases:
  - Mr.in_M02S

protocol:
  family: phomemo-m02

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
    name_pattern: "(?:M02S|Mr\\.in_M02S)"

support:
  phomemo-tools:
    level: listed
    notes: Named in the project's supported-model list.
  blewebler2:
    level: listed
    notes: Experimental M02 driver; exact advertising alias added in 9c6a92a.

status: unverified

sources:
  - kind: oss-project
    url: https://github.com/josb25/BleWebler2/commit/9c6a92a
    licence: MIT
    note: Implements the M02S protocol profile.
  - kind: oss-project
    url: https://github.com/Dejniel/TiMini-Print/tree/a9a456c4243132bad52c500e39bdec221fe98db9
    licence: Apache-2.0
    note: Catalogues Mr.in_M02S as an exact advertising name for M02S.
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
