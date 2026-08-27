---
id: phomemo
name: Phomemo
summary: Phomemo's label and pocket printers; ESC/POS-derived commands with vendor additions.
based_on: ESC/POS
transports: [ble]

raster:
  bit_order: msb-first
  polarity: 1-is-black
  row_padding: byte
  width_unit: bytes
  compression:
    algorithm: none

commands:
  - opcode: 1b 40
    name: Initialise
    description: ESC/POS ESC @.
  - opcode: 1b 37
    name: Heat configuration
    payload: max dots, heat time, heat interval
    description: ESC/POS ESC 7.
  - opcode: 1d 76 30
    name: Raster bit image
    payload: 00, width u16le in bytes, height u16le, then packed rows
    description: ESC/POS GS v 0.
  - opcode: 1b 4a
    name: Feed
    payload: u8 dots
    description: ESC/POS ESC J.
  - opcode: 1b 64
    name: Print and feed
    payload: u8 lines
    description: ESC/POS ESC d.
  - opcode: 1b 4e 04
    name: Print density
    payload: u8, 1-15
    description: Phomemo addition. Not present on every model.
  - opcode: 1b 4e 0d
    name: Print speed
    payload: u8
    description: Phomemo addition.
  - opcode: 1f 11
    name: Media type
    payload: 0a for gapped labels, 0b for continuous paper
    description: Phomemo addition.
  - opcode: 1f f0 05 00
    name: End of job
    description: Phomemo addition. Sent together with 1f f0 03 00.

status: unverified

sources:
  - kind: oss-project
    url: https://github.com/vivier/phomemo-tools
    licence: GPL-3.0
    note: Documents the command set for part of this family.
---

## Relationship to ESC/POS

Several commands in the table above correspond to Epson's published ESC/POS
reference, and the remainder are Phomemo's own. The correspondence is recorded
because it is a useful orientation, **not** as a claim that a generic ESC/POS
implementation will drive these printers.

It will not, at minimum, set the media type — and a printer left in continuous
mode on gapped stock does not index to the label edge, so output walks down the
roll. Whether the ESC/POS-derived commands behave exactly as the standard
specifies has not been verified against hardware here.

This is why the family has its own slug rather than being catalogued under
`esc-pos`.

## Model differences

The density command is absent on some models. The 12 mm units print with the
head rotated relative to the 48 mm ones, which changes how a page is laid out
before it is packed.

## Not yet recorded

Packet framing, if any, beyond the bare command bytes. Whether the family
acknowledges anything or reports faults. Flow control and maximum write size.
GATT service and characteristic UUIDs. Conformance vectors.
