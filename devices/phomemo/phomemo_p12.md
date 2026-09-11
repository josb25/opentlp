---
id: phomemo_p12
brand: Phomemo
model: P12

protocol:
  family: phomemo-p12

print:
  width_dots: 96
  width_mm: 12
  dpi: 203
  colour: monochrome

connectivity:
  ble:
    service_uuid: 0000ff00-0000-1000-8000-00805f9b34fb
    write_uuid: 0000ff02-0000-1000-8000-00805f9b34fb
    notify_uuid: 0000ff03-0000-1000-8000-00805f9b34fb
    name_pattern: "P12"

support:
  blewebler2:
    level: listed
    notes: Experimental P12/A30 driver added in 56a4106; manual selection may be required.

status: reported

sources:
  - kind: oss-project
    url: https://github.com/soburi/phomemo_p12/tree/3c1bf0d4237c92321a51f600c66bdc0b5640e529
    licence: MIT
    note: Implements printing on physical P12 hardware and documents the protocol flow.
  - kind: oss-project
    url: https://github.com/josb25/BleWebler2/commit/56a4106
    licence: MIT
    note: Independent TypeScript driver using the public wire facts.
---

Not to be confused with the [Marklife P12](marklife_p12.html). The products
share a retail model number and common BLE service but use different command
sets, so manual driver selection is the correct fallback.

