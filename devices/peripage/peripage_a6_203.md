---
id: peripage_a6_203
brand: PeriPage
model: A6 (203 dpi)
summary: 384-dot A6 profile using the uncompressed PeriPage GS v 0 family.

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
    name_pattern: "(?:PeriPage[-_ ]?A6|PPG[-_ ]?A6[-_ ]?SD)"

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
    note: App 6.10.11 clean-room inspection maps PeriPage_A6 and PPG_A6_SD firmware names to the 384-dot, 8-dpmm raw path and density range 0-2.
  - kind: oss-project
    url: https://github.com/bitrate16/peripage-python/tree/692c3cd7c500dc12933a944f4f29dfece5f2cb91
    licence: GPL-3.0
    note: Independently documents the 384-dot A6 raw-raster protocol. Facts only; no source code copied.
---

This is a geometry profile within the shared raw-raster family. The bare name
`A6` is intentionally not treated as a globally unique hardware identity.
