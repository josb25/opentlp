---
id: marklife-1f
name: Marklife 0x1F
summary: 15–72 mm label makers that answer questions — battery, media and faults.
transports: [ble]
acknowledges: true

framing:
  prefix: "1f"
  layout: 0x1f, command (u8), payload

raster:
  bit_order: msb-first
  polarity: 1-is-black
  row_padding: byte
  compression:
    algorithm: zlib
    window_bits: 10
    header_bytes: "28 91"
    note: >-
      A 1 KiB window, not the default 32 KiB. A stream compressed with
      windowBits 15 carries a 78 9c header, is perfectly valid zlib, and prints
      nothing at all.

commands:
  - opcode: 10 ff
    name: Query
    direction: both
    description: >-
      Information request. Replies are untagged, so only one query may be
      outstanding at a time — issuing two makes the answers unattributable.
    status: confirmed

status: reported

sources:
  - kind: protocol-capture
    note: BLE traffic captured against a P12 and an L13.
---

## Status reporting

The printer reports battery level, charging state, loaded media and fault
conditions.

## Compression

Firmware expects `windowBits: 10`; the zlib default is 15. A stream compressed
with the default window is valid and decompresses correctly, and does not print.
The two-byte stream header distinguishes them: `28 91` is correct, `78 9c` is
not.

## Queries

Replies carry no tag identifying which request they answer. Issue one query,
wait for its reply, then issue the next.

## Not yet recorded

The command table beyond the query opcode. Packet length and checksum fields, if
any. Whether the raster header counts width in dots or bytes. Whether the family
spans more than one dialect across its 15 mm, 48 mm and 72 mm members.
