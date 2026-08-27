---
id: marklife_p7
brand: Marklife
model: P7

protocol:
  family: marklife-1f
  packet_prefix: "1f"

print:
  width_dots: 96
  width_mm: 12
  dpi: 203
  colour: monochrome
  colour_planes: 1
  max_density: 15
  speed_mode: false

connectivity:
  ble:
    service_uuid: 0000ff00-0000-1000-8000-00805f9b34fb
    write_uuid: 0000ff02-0000-1000-8000-00805f9b34fb
    name_pattern: "P7"

status: unverified

sources:
  - kind: catalogue
    note: >-
      Transcribed from a driver's model table; specifications not confirmed against hardware.
---

Catalogued from a driver's model table as part of the
[marklife-1f family](marklife-1f.html). The printhead width and the GATT service
are what that table records; nothing here has been checked against hardware, and
whether this model shares a dialect with the 15 mm members is unconfirmed.
