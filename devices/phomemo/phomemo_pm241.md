---
id: phomemo_pm241
brand: Phomemo
model: PM-241

protocol:
  family: tspl

print:
  width_dots: 816
  width_mm: 102
  media_width_mm: 102
  dpi: 203
  media: [gap]
  colour: monochrome
  max_density: 15
  speed_mode: true

mechanism:
  media_widths_mm: 102

connectivity:
  usb:
    class: printer

support:
  blewebler2:
    level: listed
    notes: Experimental TSPL bitmap driver added in bb4fd7e; use USB.

status: unverified

sources:
  - kind: oss-project
    url: https://github.com/josb25/BleWebler2/commit/bb4fd7e
    licence: MIT
    note: Implements the 102-byte PM-241 TSPL profile over existing USB transports.
  - kind: oss-project
    url: https://github.com/transcriptionstream/phomymo/tree/1f58d3f0e7f941b9143277cda828380149e56855
    note: Licence metadata conflicts (README MIT, package.json ISC, no licence file); used only for PM-241 TSPL, width and transport facts.
  - kind: vendor-doc
    url: https://phomemo.com/en-ca/pages/pm-241-bt-support-center-1
    note: Phomemo support page documents USB setup for the PM-241 family.
---

BleWebler2 lists TSPL bitmap printing as experimental. The encoder follows the
published TSPL specification, but this model profile has not been confirmed on
physical hardware.

## Printable width

The public profile uses a 102-byte row: 816 dots, or about 102 mm at 203 dpi.
The non-BT model is connected over USB.

## Not yet recorded

Exact media range, sensors, cutter geometry, power, indicators and status replies.
