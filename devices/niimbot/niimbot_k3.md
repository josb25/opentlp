---
id: niimbot_k3
brand: NIIMBOT
model: K3

protocol:
  family: niimbot

print:
  width_dots: 640
  width_mm: 80.1
  dpi: 203
  media: [gap, black-mark, transparent]
  colour: monochrome
  colour_planes: 1
  max_density: 5

mechanism:
  paper_drm: strict

connectivity:
  ble:
    name_pattern: "K3"

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
