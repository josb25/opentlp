---
id: phomemo_m110s
brand: Phomemo
model: M110S

protocol:
  family: phomemo-m110

print:
  width_dots: 384
  width_mm: 48
  dpi: 203
  colour: monochrome

connectivity:
  ble:
    service_uuid: 0000ff00-0000-1000-8000-00805f9b34fb
    write_uuid: 0000ff02-0000-1000-8000-00805f9b34fb
    notify_uuid: 0000ff03-0000-1000-8000-00805f9b34fb
    name_pattern: "M110S|Q199E.*"
    name_examples: [M110S, Q199E]

support:
  blewebler2:
    level: listed
    notes: Experimental family driver added in ab8fbb7; awaiting hardware validation.

status: unverified

sources:
  - kind: oss-project
    url: https://github.com/transcriptionstream/phomymo/tree/1f58d3f0e7f941b9143277cda828380149e56855
    licence: MIT
    note: Lists M110S as a 48-byte/384-dot member and records its Q199E advertising pattern.
  - kind: oss-project
    url: https://github.com/josb25/BleWebler2/commit/ab8fbb7
    licence: MIT
    note: Implements the M110S profile and advertising-name match.
---

The M110S association and geometry come from a public implementation, not a
capture or local hardware. Its Bluetooth name may begin with `Q199E` rather
than the retail model number.

