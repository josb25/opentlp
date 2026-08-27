---
id: marklife_p50
brand: Marklife
model: P50
summary: 48 mm desktop label printer on the same protocol as the P12.

artwork:
  file: marklife_p50.svg
  licence: CC0-1.0
  credit: BleWebler2
  note: >-
    Traced from the stock product render and rebuilt from primitives. The style
    block is scoped to this drawing's own data-printer attribute.
  properties:
    - --printer-body
    - --printer-shade
    - --printer-outline

protocol:
  family: marklife-1f
  packet_prefix: "1f"

print:
  width_dots: 384
  width_mm: 48
  dpi: 203
  media: [gap, continuous]
  colour: monochrome
  colour_planes: 1
  max_density: 15
  speed_mode: true

mechanism:
  media_widths_mm: { min: 20, max: 50 }

connectivity:
  ble:
    service_uuid: 0000ff00-0000-1000-8000-00805f9b34fb
    write_uuid: 0000ff02-0000-1000-8000-00805f9b34fb
    name_pattern: "P50"

status: unverified

sources:
  - kind: catalogue
    note: >-
      Transcribed from a driver's model table. Nobody has confirmed the
      specifications or the protocol against hardware.
---

## Protocol notes

Recorded as [`marklife-1f`](marklife-1f.html) on the strength of the family it
is catalogued with. This has not been confirmed against hardware, and the 48 mm
members of the family may not share a dialect with the 15 mm ones.

## Not yet recorded

Every field on this page is transcription rather than observation. Colourways
for the artwork are also unrecorded.
