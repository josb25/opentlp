---
id: marklife_l13
brand: Marklife
model: L13
aliases:
  - SilverCrest
  - MUNBYN
  - luckjingle
summary: 15 mm label maker sold under several brands; speaks the same protocol as the P12.

protocol:
  family: marklife-1f
  packet_prefix: "1f"

print:
  width_dots: 96
  width_mm: 12
  media_width_mm: 15
  dpi: 203
  media: [gap, continuous]
  colour: monochrome
  colour_planes: 1
  max_density: 15
  speed_mode: false

mechanism:
  cutter: false

connectivity:
  ble:
    service_uuid: 0000ff00-0000-1000-8000-00805f9b34fb
    write_uuid: 0000ff02-0000-1000-8000-00805f9b34fb
    name_pattern: "L13"
    name_examples: [L13, DP-L13]

reports: [battery, faults, device-name, serial-number, firmware-version, hardware-version]

status: verified

sources:
  - kind: user-report
    note: Printed from; no cutter fitted.
  - kind: protocol-capture
    note: BLE traffic captured against the physical unit.
---

## Relationship to the P12

The L13 and the [P12](marklife_p12.html) share a protocol but are not the same
hardware. The L13 has no cutter. No further comparison has been recorded.

## Protocol notes

- Wire-identical to the P12, including the `windowBits: 10` zlib requirement and
  the status replies.
- The firmware reports `DP-L13` regardless of the brand on the packaging.
- No Marklife-branded L13 exists. The `brand` field records the protocol family,
  not a name on a box.

## Not yet recorded

Which badges it ships under. A full comparison against the P12 — the cutter is
the only difference confirmed so far.
