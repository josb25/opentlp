---
id: tiny
name: Tiny (cat printer)
summary: The 58 mm pocket printers sold under a hundred badges on one write-only protocol.
also_known_as: [cat printer, GB01 protocol]
transports: [ble]
acknowledges: false

framing:
  prefix: "51 78"
  layout: prefix, command (u8), 0x00, length (u16le), payload, crc8, 0xff
  length:
    bytes: 2
    endian: little
    covers: payload
  checksum:
    algorithm: crc8
    polynomial: "0x07"
    init: "0x00"
    reflect_in: false
    reflect_out: false
    xor_out: "0x00"
    covers: payload

raster:
  bit_order: lsb-first
  polarity: 1-is-black
  row_padding: byte
  compression:
    algorithm: none

flow:
  max_write_bytes: 100
  control: notify-pause

commands:
  - opcode: a1
    name: Feed paper
    payload: u16le distance in dots
  - opcode: a2
    name: Set energy
    payload: u16le
  - opcode: a3
    name: Retract paper
    payload: u16le distance in dots
  - opcode: a4
    name: Set drawing mode
  - opcode: a6
    name: Set quality
  - opcode: af
    name: Set device state
  - opcode: bd
    name: Set speed
  - opcode: be
    name: Set paper type
  - opcode: bf
    name: Print row
    payload: packed 1-bpp row, 48 bytes at 384 dots

conformance:
  vectors_url: https://github.com/Dejniel/TiMini-Print
  licence: Apache-2.0
  covers: [framing, checksum, row packing, job structure]

implementations:
  - project: cat-printer
  - project: catprinter
    url: https://github.com/rbaron/catprinter
  - project: timini-print

status: reported

sources:
  - kind: vendor-doc
    url: https://play.google.com/store/apps/details?id=com.frogtosea.tinyPrint
    title: Tiny Print, published by Shenzhen 100cow Technology Co., Ltd
    note: >-
      The vendor application for this family. Its publisher is a software
      company; no source connects it to manufacturing.
  - kind: oss-project
    url: https://github.com/JJJollyjim/catprinter
    title: catprinter — COMMANDS.md
    note: Independent documentation of the command set.
  - kind: oss-project
    url: https://github.com/rbaron/catprinter
    note: Corroborates 384 dots and the ~100-byte write chunking.
  - kind: oss-project
    url: https://github.com/Dejniel/TiMini-Print
    licence: Apache-2.0
    note: Golden protocol vectors.
---

## Who makes these

Not established.

What is on record:

| | |
|---|---|
| Vendor application | Tiny Print (`com.frogtosea.tinyPrint`), and iPrint (`com.frogtosea.iprint`) |
| Application publisher | Shenzhen 100cow Technology Co., Ltd |
| Certification | No FCC grant for `GB01` as a thermal printer |
| Named resellers | Cubinote, at 125–150% of the unbranded price |

The application publisher is a software company. No source examined connects it
to a factory, and no manufacturer appears on the packaging, in the certification
databases, or in any of the projects that have reverse-engineered the protocol.

The model prefixes — `GB`, `GT`, `YT`, `MX`, `LY`, `LP`, `JXM` — are seller
designations. No prefix has been traced to a company.

## Dialects

Two, differing by one byte:

| Dialect | Prefix |
|---|---|
| Standard | `51 78` |
| Prefixed | `12 51 78` |

Everything after the prefix is identical. A driver written for one dialect
connects to the other, writes without error, and does not print.
[LY10](generic_ly10.html) is in the prefixed group.

Model numbers are no guide: `LY01`–`LY05` are standard, `LY10`–`LY11` are
prefixed. Where an advertised name is unrecognised, the standard dialect is the
more common of the two.

## Writing a driver

1. Connect on service `0000ae30`; write to `0000ae01`, subscribe to `0000ae02`.
   Some units use `0000ff00` instead.
2. Pack the image one bit per pixel, **LSB-first**, each row padded to a whole
   byte — 48 bytes at 384 dots.
3. Frame each row as a `BF` packet and append the CRC-8 over the payload only.
4. Split writes at 100 bytes.
5. Watch the notify characteristic. On the pause sequence, stop writing until
   the resume sequence arrives.
6. End with feed, paper, paper, feed, state.

## Error reporting

There is none. No packet is acknowledged and no fault is reported, so a rejected
job is indistinguishable from a successful one except by inspecting the paper.

The conformance vectors above pin framing, checksum, bit order and job structure
simultaneously, and are the practical substitute for hardware feedback.

## Not yet recorded

The pause and resume byte sequences. Payloads for `A4`, `A6`, `AF` and `BE`,
which are inferred from capture context rather than confirmed on hardware.
