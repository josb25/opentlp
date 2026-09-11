---
id: phomemo_m02pro
brand: Phomemo
model: M02 Pro
aliases:
  - M02PRO
  - sandymaro

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
    name_pattern: "(?:M02 Pro|M02PRO|sandymaro)"

support:
  blewebler2:
    level: listed
    notes: Experimental M02 driver; exact advertising aliases added in 9c6a92a.

status: unverified

sources:
  - kind: oss-project
    url: https://github.com/josb25/BleWebler2/commit/9c6a92a
    licence: MIT
    note: Implements the 78-byte M02 Pro protocol profile.
  - kind: oss-project
    url: https://github.com/Dejniel/TiMini-Print/tree/a9a456c4243132bad52c500e39bdec221fe98db9
    licence: Apache-2.0
    note: Catalogues M02PRO and sandymaro as exact advertising names for M02 Pro.
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
