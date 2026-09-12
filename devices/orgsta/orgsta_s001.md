---
id: orgsta_s001
brand: Orgsta
model: S001

protocol:
  family: yk-astra-p1
  variant: s001

print:
  width_dots: 90
  width_mm: 11.3
  media_width_mm: 15
  dpi: 203
  media: [gap, continuous, black-mark]
  colour: monochrome
  max_density: 5
  speed_mode: false

mechanism:
  media_widths_mm: 15

connectivity:
  serial: true

support:
  timini-print:
    level: listed
    notes: Source of the S001 profile and YK Astra P1 job recipe.
  blewebler2:
    level: listed
    notes: Experimental SPP/serial implementation added in 85f2680; hardware validation needed.

status: unverified

sources:
  - kind: vendor-doc
    url: https://orgsta.com/home/s001-user-manual-and-video/
    note: Official model identity, Snap & Tag app and Bluetooth product documentation.
  - kind: oss-project
    url: https://github.com/Dejniel/TiMini-Print/tree/a9a456c4243132bad52c500e39bdec221fe98db9
    licence: Apache-2.0
    note: S001 model association, exact Bluetooth name, SPP transport and 96/90-dot raster profile.
  - kind: oss-project
    url: https://github.com/josb25/BleWebler2/commit/85f2680
    licence: MIT
    note: Implements and tests the S001 YK-framed protocol over raw serial transports.
---

The head carries 96 bits per row, but the captured S001 recipe reserves six
leading dots and exposes a 90-dot printable canvas. The official product page
describes a 203-dpi direct-thermal Bluetooth label printer.

The public protocol profile selects RFCOMM/SPP rather than BLE GATT. BleWebler2
therefore supports Android Bluetooth Classic and raw serial transports and
deliberately rejects Web Bluetooth until an S001 service/characteristic capture
is available.

## Not yet recorded

Firmware revisions, status replies, power details, exact media catalogue and a
physical print result from this implementation.
