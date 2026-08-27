---
id: niimbot
name: NIIMBOT
summary: NIIMBOT's label printers; acknowledged packets and RFID-tagged consumables.
transports: [ble]
acknowledges: true

flow:
  control: ack-per-packet
  note: >-
    A minimum interval between writes is observed in practice on the D-series;
    the exact figure is unrecorded.

implementations:
  - project: niimblue
    note: Reference implementation for this family.

status: unverified

sources:
  - kind: oss-project
    url: https://github.com/MultiMote/niimbluelib
    title: niimbluelib
    licence: MIT
  - kind: oss-project
    url: https://github.com/MultiMote/niimbot-wiki
    title: NIIMBOT Community Wiki
    licence: CC-BY-SA-4.0
---

## Transports

Two GATT services are in use across the range:

| Service | Models |
|---|---|
| `0000fee0-0000-1000-8000-00805f9b34fb` | D-series |
| `e7810a71-73ae-499d-8c15-faa9aef0c3f2` | B-series |

## Consumables

Label rolls carry an RFID tag which the printer reads, and unknown stock is
refused. Workarounds exist but involve modifying the firmware.

## Further documentation

The [NIIMBOT Community Wiki](https://printers.niim.blue/) documents this family
in depth — per-model teardowns, PCB photographs, memory maps and firmware notes
— and [niimbluelib](https://github.com/MultiMote/niimbluelib) is the reference
implementation. Both are maintained by the same author.

## Not yet recorded

Packet framing. Checksum. The command table. Raster format and bit order.
Maximum write size. The acknowledgement sequence.
