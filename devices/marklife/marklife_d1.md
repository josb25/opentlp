---
id: marklife_d1
brand: Marklife
model: D1

protocol:
  family: marklife-1f
  packet_prefix: "1f"

print:
  colour: monochrome
  colour_planes: 1
  max_density: 15

connectivity:
  ble:
    service_uuid: 0000ff00-0000-1000-8000-00805f9b34fb
    write_uuid: 0000ff02-0000-1000-8000-00805f9b34fb
    name_pattern: "D1"

status: unverified

sources:
  - kind: vendor-doc
    title: Marklife app device artwork
    note: >-
      The manufacturer's own application ships artwork for this model, which is
      what attributes it to Marklife rather than to the protocol family it
      shares with other badges.
  - kind: catalogue
    note: >-
      Transcribed from a driver's model table; specifications not confirmed
      against hardware.
---

Catalogued from the Marklife application, which ships artwork for this model.

## Printable width

Not recorded. The driver that lists this model places it in a group named
"OEM / Unknown", where the width is a fallback applied to unrecognised hardware
rather than a measured value.
A driver that supports this family lists it as `LuckP_D1`, suggesting the same
hardware is also sold under the LuckP badge. The Marklife app names it `D1`.

## Not yet recorded

Mechanism, media handling, power, indicators, and what the printer reports back.
