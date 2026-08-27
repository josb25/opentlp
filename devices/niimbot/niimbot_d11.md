---
id: niimbot_d11
brand: NIIMBOT
model: D11

protocol:
  family: niimbot

print:
  width_dots: 96
  width_mm: 12
  dpi: 203
  media: [gap, transparent]
  colour: monochrome
  colour_planes: 1
  max_density: 3

mechanism:
  paper_drm: strict

connectivity:
  ble:
    service_uuid: 0000fee0-0000-1000-8000-00805f9b34fb
    name_pattern: "D11"

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

## Protocol notes

- Packets are acknowledged and device state is reported.
- Label rolls carry an RFID tag which the printer reads, and unknown stock is
  refused. Workarounds exist, but they involve modifying the firmware.

See the [NIIMBOT Community Wiki](https://printers.niim.blue/) for teardowns,
firmware notes and memory maps.

## Not yet recorded

What exactly the printer reports back. Cutter, media widths, print speed, power
and certification ids.
