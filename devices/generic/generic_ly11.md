---
id: generic_ly11
brand: Generic Cat Printer
model: LY11

protocol:
  family: tiny
  variant: prefixed
  packet_prefix: "12 51 78"

print:
  width_dots: 384
  width_mm: 48
  dpi: 203
  colour: monochrome

connectivity:
  ble:
    service_uuid: 0000ae30-0000-1000-8000-00805f9b34fb
    write_uuid: 0000ae01-0000-1000-8000-00805f9b34fb
    notify_uuid: 0000ae02-0000-1000-8000-00805f9b34fb
    name_pattern: "LY11"

status: unverified

sources:
  - kind: catalogue
    note: >-
      Transcribed from a driver's model table; specifications not confirmed against hardware.
---

Part of the [tiny family](tiny.html). Catalogued from a driver's model
table — the printhead width and the protocol dialect are what that table records,
and nothing here has been checked against the hardware.
