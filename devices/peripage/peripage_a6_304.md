---
id: peripage_a6_304
brand: PeriPage
model: A6 (304 dpi)
summary: 384-dot high-resolution A6 profile using the uncompressed PeriPage GS v 0 family.

protocol:
  family: peripage-raw-gsv0
  variant: 384-dot 12-dpmm
  vendor_app: com.ileadtek.peripage

print:
  width_dots: 384
  dpi: 300
  colour: monochrome
  max_density: 2
  speed_mode: false

connectivity:
  ble:
    name_pattern: "PPG[-_ ]?A6[-_ ]?(?:HD|UD|UHD)"

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
    note: App 6.10.11 clean-room inspection maps PPG_A6_HD, PPG_A6_UD and PPG_A6_UHD firmware names to the 384-dot, 12-dpmm raw path and density range 0-2.
---

PeriPage markets this class as 304 dpi; OpenTLP's normalized resolution field
records it as the 300-dpi class while preserving the vendor wording in the model.
