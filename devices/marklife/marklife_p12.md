---
id: marklife_p12
brand: Marklife
model: P12
summary: 15 mm pocket label maker; reports battery, media and faults over BLE.

artwork:
  file: marklife_p12.svg
  licence: CC0-1.0
  credit: BleWebler2
  note: >-
    Traced from the stock product render and rebuilt from primitives — no traced
    paths, no gradients. The style block is scoped to this drawing's own
    data-printer attribute so several drawings can share a page.
  properties:
    - --printer-body
    - --printer-cutter
    - --printer-led
    - --printer-outline
  hooks:
    cutter: { class: cutter, property: --printer-cutter-mm, units_per_mm: 1.35 }
    led: { class: led, property: --printer-led }
    body: { property: --printer-body }
    outline: { property: --printer-outline }
  lamps:
    - hook: led
      unlit: "#5f5f5f"
      states:
        red: "#ff3b2f"
        green: "#37d067"
        blue: "#3d8bff"
  animations:
    - id: cut
      label: Cut
      part: cutter
      travel_mm: -6
      duration_ms: 700
    - id: open
      label: Open
      part: cutter
      travel_mm: 4
      duration_ms: 800
  variants:
    - id: white-red
      label: White, red cutter
      colours: { printer-body: "#ffffff", printer-cutter: "#a94f51" }
    - id: white-white
      label: White
      colours: { printer-body: "#ffffff", printer-cutter: "#ffffff" }
    - id: mint-mint
      label: Mint
      colours: { printer-body: "#a8ddba", printer-cutter: "#a8ddba" }
    - id: mint-white
      label: Mint, white cutter
      colours: { printer-body: "#a8ddba", printer-cutter: "#ffffff" }

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
  cutter: true
  head_to_cutter_dots: 66
  paper_drm: none

connectivity:
  ble:
    service_uuid: 0000ff00-0000-1000-8000-00805f9b34fb
    write_uuid: 0000ff02-0000-1000-8000-00805f9b34fb
    name_pattern: "P12"
    name_examples: [P12, P12_]

indicators:
  - id: status
    label: Status LED
    kind: smd-single-colour
    states:
      - colour: green
        hex: "#37d067"
        means: On, searching for a connection
      - colour: blue
        hex: "#3d8bff"
        means: Connected
      - colour: red
        hex: "#ff3b2f"
        means: Battery low

reports: [battery, faults, device-name, serial-number, firmware-version, hardware-version]

status: verified

sources:
  - kind: protocol-capture
    note: BLE traffic captured against the physical unit; printing confirmed.
  - kind: user-report
    note: >-
      Head-to-cutter distance, cutter travel and LED meanings measured against
      the physical unit by the artwork's author.
---

## Protocol notes

- Commands are framed with a `1F` prefix.
- Raster data is zlib-compressed with a 1 KiB window (`windowBits: 10`),
  identifiable by a `28 91` stream header rather than the default `78 9c`.
  A stream compressed with a 32 KiB window is valid zlib and does not print.
- The trailing underscore in the advertised name varies by firmware.
- Media is **not** reported. The protocol says whether stock is present, not
  what stock is loaded.
