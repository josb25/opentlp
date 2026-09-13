---
id: peripage_a6_plus
brand: PeriPage
model: A6+
summary: Hardware-reported 576-dot A6+ profile using FF00 BLE and separate raster-row writes.

protocol:
  family: peripage-raw-gsv0
  variant: 576-dot 12-dpmm
  vendor_app: com.ileadtek.peripage

print:
  width_dots: 576
  dpi: 300
  colour: monochrome
  max_density: 2
  speed_mode: false

connectivity:
  ble:
    service_uuid: 0000ff00-0000-1000-8000-00805f9b34fb
    write_uuid: 0000ff02-0000-1000-8000-00805f9b34fb
    notify_uuid: 0000ff01-0000-1000-8000-00805f9b34fb
    name_pattern: '(?:PeriPage\+[0-9A-Za-z]+(?:_BLE)?|(?:PeriPage|PPG)[-_ ]?A6\+)'
    name_examples: [PeriPage+8B91_BLE]

support:
  blewebler2:
    level: listed
    notes: Experimental shared PeriPage raw-raster driver; awaiting project-owner hardware validation.

status: reported

sources:
  - kind: oss-project
    url: https://github.com/josb25/BleWebler2/tree/2c81a764cf04dc1a90bad77897c62115f07dd936/packages/core/src/drivers/peripage
    licence: MIT
    note: Shared PeriPage raw-raster driver and packet-boundary tests.
  - kind: oss-project
    url: https://github.com/ouor/my-bt-printers/blob/9c65351c457ac8d60300aba20f4c48d609aafd4a/docs/devices/Peripage.md
    note: Hardware-observed name, 576-dot width, FF00/FF02/FF01 GATT path, MSB-first raster, command sequence and row write boundaries. The repository declares no licence, so only facts were used.
  - kind: vendor-doc
    url: https://apkpure.net/peripage/com.ileadtek.peripage
    retrieved: 2026-09-12
    note: App 6.10.11 clean-room inspection independently maps PeriPage+ firmware names to the 576-dot, 12-dpmm raw route and density range 0-2.
---

The public hardware report preserves one write for the GS v 0 header and one
72-byte write per raster row. This is the only profile here whose BLE endpoint
and packet boundaries have a public hardware observation.
