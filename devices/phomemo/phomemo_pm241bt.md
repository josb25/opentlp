---
id: phomemo_pm241bt
brand: Phomemo
model: PM-241-BT

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
  serial: true

support:
  blewebler2:
    level: listed
    notes: Experimental TSPL driver supports USB and native Bluetooth Classic transports; Web Bluetooth cannot connect.

status: unverified

sources:
  - kind: oss-project
    url: https://github.com/josb25/BleWebler2/commit/bb4fd7e
    licence: MIT
    note: Implements the PM-241-BT TSPL profile over USB and native serial/Classic transports.
  - kind: oss-project
    url: https://github.com/transcriptionstream/phomymo/tree/1f58d3f0e7f941b9143277cda828380149e56855
    note: Licence metadata conflicts (README MIT, package.json ISC, no licence file); used only for PM-241-BT TSPL, width and transport facts.
  - kind: vendor-doc
    url: https://phomemo.com/en-ca/pages/pm-241-bt-support-center-1
    note: Official product support identity and USB setup documentation.
---

The BT suffix denotes Bluetooth Classic, not BLE. It can use a native
RFCOMM/SPP-style transport, but browser Web Bluetooth cannot connect to it; USB
is the portable browser route.

The public profile uses a 102-byte row: 816 dots, or about 102 mm at 203 dpi.
Support remains unverified pending a print report from physical hardware.
