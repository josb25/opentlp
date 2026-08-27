---
id: niimbot_p1s
brand: NIIMBOT
model: P1S

protocol:
  family: niimbot

print:
  width_dots: 662
  width_mm: 56
  dpi: 300
  media: [pvc-tag]
  colour: monochrome
  colour_planes: 1
  max_density: 5

mechanism:
  paper_drm: strict

connectivity:
  ble:
    name_pattern: "P1S"

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

Catalogued from [niimbluelib](https://github.com/MultiMote/niimbluelib), the
reference implementation for this family. The printhead width, resolution,
accepted media and density range are what that library records; the mechanism,
power and physical details are unrecorded.

The [NIIMBOT Community Wiki](https://printers.niim.blue/) documents this family
in more depth than this page does.
