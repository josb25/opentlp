---
id: generic_gb01
brand: Generic Cat Printer
model: GB01
summary: The archetypal 58 mm "cat printer" — write-only, cheap, and everywhere.

protocol:
  family: tiny
  variant: standard
  packet_prefix: "51 78"
  vendor_app: com.frogtosea.tinyPrint

print:
  width_dots: 384
  width_mm: 48
  media_width_mm: 58
  dpi: 203
  media: [continuous]
  colour: monochrome

connectivity:
  ble:
    service_uuid: 0000ae30-0000-1000-8000-00805f9b34fb
    write_uuid: 0000ae01-0000-1000-8000-00805f9b34fb
    notify_uuid: 0000ae02-0000-1000-8000-00805f9b34fb
    name_pattern: "GB01"
    name_examples: [GB01]

reports: []

support:
  cat-printer:
    level: listed

status: reported

sources:
  - kind: oss-project
    url: https://github.com/JJJollyjim/catprinter
    title: catprinter
    note: Independent documentation of the command set.
  - kind: oss-project
    url: https://github.com/rbaron/catprinter
    title: rbaron/catprinter
    note: Corroborates 384 dots and the ~100-byte write chunking.
  - kind: oss-project
    url: https://github.com/Dejniel/TiMini-Print
    licence: Apache-2.0
    note: Ships golden protocol vectors for this family.

documentation:
  - url: https://github.com/JJJollyjim/catprinter
    title: catprinter
    covers: [protocol]
---

The reference entry for the [tiny family](tiny.html), which is what most
open-source tooling for these printers is written against.

## Protocol notes

- Packet layout: `51 78`, one command byte, little-endian length, payload,
  CRC-8 over the payload only — polynomial `0x07`, init 0, no reflection, no
  final XOR.
- Rows pack **LSB-first**, the opposite of most thermal printers and a common
  cause of mirrored output.
- Writes must be split to roughly 100 bytes. The smallest units in the family
  negotiate no higher, and oversized writes are dropped without complaint.
- No packet is acknowledged and no fault is reported.
- A flow-control sequence arrives on the notify characteristic when the receive
  buffer fills. Ignoring it produces bands of missing rows on long jobs.
- Some models prefix every packet with an extra `12` byte; see
  [LY10](generic_ly10.html).

## Not yet recorded

Whether it has a cutter or a tear bar. Media widths, print speed and paper DRM.

`GB02` to `GB05` share this profile in the driver tables that catalogue them,
but whether they are the same hardware under different model numbers is
unconfirmed, so they are listed as separate entries rather than as aliases.
