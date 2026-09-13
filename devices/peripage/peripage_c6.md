---
id: peripage_c6
brand: PeriPage
model: C6
summary: 384-dot C6 profile using the uncompressed PeriPage GS v 0 family.

protocol:
  family: peripage-raw-gsv0
  variant: 384-dot 8-dpmm
  vendor_app: com.ileadtek.peripage

print:
  width_dots: 384
  dpi: 203
  colour: monochrome
  max_density: 2
  speed_mode: false

connectivity:
  ble:
    name_pattern: "PeriPage[-_ ]?C6"

support:
  blewebler2:
    level: listed
    notes: Experimental shared PeriPage raw-raster driver; awaiting hardware validation.

status: unverified

sources:
  - kind: oss-project
    url: https://github.com/josb25/BleWebler2/tree/2c81a764cf04dc1a90bad77897c62115f07dd936/packages/core/src/drivers/peripage
    licence: MIT
    note: Shared PeriPage raw-raster driver and profile tests.
  - kind: vendor-doc
    url: https://apkpure.net/peripage/com.ileadtek.peripage
    retrieved: 2026-09-12
    note: App 6.10.11 clean-room inspection maps the PeriPage_C6 firmware name to the 384-dot, 8-dpmm raw path and density range 0-2.
---

This entry records the app-routed profile only. BLE endpoints are not copied
from A6+ because no source yet confirms that the C6 exposes the same GATT path.
