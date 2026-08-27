---
id: niimbot_m2
brand: NIIMBOT
model: M2

protocol:
  family: niimbot

mechanism:
  paper_drm: strict

print:
  width_dots: 384
  width_mm: 48
  dpi: 203
  colour: monochrome

connectivity:
  ble:
    service_uuid: e7810a71-73ae-499d-8c15-faa9aef0c3f2
    name_pattern: "M2"

status: unverified

sources:
  - kind: user-report
    note: >-
      NIIMBOT consumables are enforced across the range; third-party stock is
      refused without a firmware modification.
  - kind: catalogue
    note: >-
      Transcribed from a driver's model table; specifications not confirmed against hardware.

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
