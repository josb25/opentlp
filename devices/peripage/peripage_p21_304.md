---
id: peripage_p21_304
brand: PeriPage
model: P21 (304 dpi)
summary: 384-dot high-resolution P21 profile; excludes the compressed P21+.

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
    name_pattern: "PPG[-_ ]?P21[-_ ]?(?:HD|UD|UHD)"

support:
  blewebler2:
    level: listed
    notes: Experimental shared PeriPage raw-raster driver; compressed P21+ deliberately excluded.

hardware:
  certification:
    - authority: fcc
      id: 2ASPY-ALD-P210
      url: https://fccid.io/2ASPY-ALD-P210
      holder: Xiamen iLead Tek Co., Ltd.

status: unverified

sources:
  - kind: oss-project
    url: https://github.com/josb25/BleWebler2/tree/2c81a764cf04dc1a90bad77897c62115f07dd936/packages/core/src/drivers/peripage
    licence: MIT
    note: Shared PeriPage raw-raster driver and profile tests; compressed P21+ excluded.
  - kind: vendor-doc
    url: https://www.peripageglobal.com/products/photo-printer-bluetooth-thermal
    retrieved: 2026-09-12
    note: Official product page identifies separate P21 203-dpi and 304-dpi retail variants.
  - kind: vendor-doc
    url: https://apkpure.net/peripage/com.ileadtek.peripage
    retrieved: 2026-09-12
    note: App 6.10.11 clean-room inspection maps PPG_P21_HD, PPG_P21_UD and PPG_P21_UHD to the 384-dot, 12-dpmm raw path and density range 0-2, while routing P21+ through compression.
  - kind: vendor-doc
    url: https://fccid.io/2ASPY-ALD-P210/User-Manual/Users-Manual-7813828
    retrieved: 2026-09-12
    note: FCC filing identifies the P21/ALD-P210 product and filing holder Xiamen iLead Tek Co., Ltd.; this is not treated as proof of the factory.
---

PeriPage markets this variant as 304 dpi; OpenTLP normalizes it to the 300-dpi
class. `P21` alone is ambiguous, and `P21+` is a different compressed path.
