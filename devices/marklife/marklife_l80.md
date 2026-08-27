---
id: marklife_l80
brand: Marklife
model: L80

protocol:
  family: marklife-1f
  packet_prefix: "1f"

print:
  width_dots: 576
  width_mm: 72
  dpi: 203
  colour: monochrome
  colour_planes: 1
  max_density: 15

connectivity:
  ble:
    service_uuid: 0000ff00-0000-1000-8000-00805f9b34fb
    write_uuid: 0000ff02-0000-1000-8000-00805f9b34fb
    name_pattern: "L80"

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

Printhead width is taken from the size family a driver assigns it to.

## Not yet recorded

Mechanism, media handling, power, indicators, and what the printer reports back.
