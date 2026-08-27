---
id: niimbot_n1
brand: NIIMBOT
model: N1

protocol:
  family: niimbot

print:
  width_dots: 96
  width_mm: 12
  dpi: 203
  media: [gap, heat-shrink, transparent, black-mark-gap, continuous]
  colour: monochrome
  colour_planes: 1
  max_density: 3

mechanism:
  paper_drm: strict

connectivity:
  ble:
    name_pattern: "N1"

support:
  niimblue:
    level: listed
    notes: Listed in the project's model library.

status: unverified

sources:
  - kind: oss-project
    url: https://github.com/MultiMote/niimbluelib
    title: niimbluelib model library
    licence: MIT
  - kind: user-report
    note: >-
      NIIMBOT consumables are enforced across the range; third-party stock is
      refused without a firmware modification.

documentation:
  - url: https://printers.niim.blue/
    title: NIIMBOT Community Wiki
    licence: CC-BY-SA-4.0
    covers: [teardown, firmware, specs, protocol]
---

Catalogued from a driver's model table. The printhead width and the GATT service
are what that table records; the mechanism and status reporting are unrecorded.

The [NIIMBOT Community Wiki](https://printers.niim.blue/) documents this family in
far more depth than this page does.
