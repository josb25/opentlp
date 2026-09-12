---
id: yk-astra-p1
name: YK Astra P1
summary: Sequence-numbered 64..9b frames carrying setup, feed and four-row raster commands.
also_known_as: [Snap & Tag protocol, S001 protocol]
transports: [serial]

raster:
  bit_order: msb-first
  polarity: 1-is-black
  row_padding: byte
  width_unit: bytes
  compression:
    algorithm: none
  note: S001 uses a 96-dot row with six leading blank dots and four rows per raster frame.

flow:
  max_write_bytes: 58
  control: none
  note: S001 frames are paced by 20 ms in the public implementation.

commands:
  - opcode: "64"
    name: Frame prefix
    payload: command, sequence modulo 64, payload length u16le, payload, zero integrity field, 9b suffix
  - opcode: "00"
    name: Raster slice
    payload: up to four 12-byte MSB-first rows
  - opcode: "02"
    name: Feed forward
    payload: distance in dots as u16le
  - opcode: "03"
    name: Special media feed
    payload: mode followed by distance in dots as u16le
  - opcode: "04"
    name: Feed backward
    payload: distance in dots as u16le
  - opcode: "09"
    name: Set density
    payload: u8 density
  - opcode: "0a"
    name: Set speed
    payload: u8 speed
  - opcode: "28"
    name: Set paper type
    payload: 01 followed by 00 plain, 01 tag or 02 black-tag

conformance:
  vectors_url: https://github.com/josb25/BleWebler2/tree/85f2680/packages/core/src/drivers/yk
  licence: MIT
  covers: [framing, row-packing, job-structure, media-feed]

implementations:
  - project: timini-print
    url: https://github.com/Dejniel/TiMini-Print/tree/a9a456c4243132bad52c500e39bdec221fe98db9/timiniprint/protocol/families/yk_astra_p1
  - project: blewebler2
    url: https://github.com/josb25/BleWebler2/commit/85f2680

status: reported

sources:
  - kind: oss-project
    url: https://github.com/Dejniel/TiMini-Print/tree/a9a456c4243132bad52c500e39bdec221fe98db9/timiniprint/protocol/families/yk_astra_p1
    licence: Apache-2.0
    note: S001 frame construction, commands, raster geometry, density and media-feed recipes.
  - kind: oss-project
    url: https://github.com/josb25/BleWebler2/commit/85f2680
    licence: MIT
    note: Independent TypeScript implementation with packet and complete job-sequence tests.
  - kind: protocol-capture
    url: https://fr.linkedin.com/posts/james-lecocq-17927533b_github-thaoliatp6-thermalprinter-an-activity-7490849213455585281-jQio
    note: Hardware-tested TP6-S report independently corroborating the YK 64..9b frame shape and warning that GATT UUIDs vary.
---

Each frame begins with `64`, followed by a command byte, a sequence number modulo
64 and a little-endian payload length. Four zero integrity bytes and `9B` end the
frame. The zero field is accepted by the captured S001 recipe.

## S001 job

A tag job sets speed 25, maps the five UI density levels to wire values 5, 7, 9,
11 and 13, selects paper type 1, performs the special lead-in feed, and advances
two dots before raster data. The raster is sent as 48-byte slices. A final
special-feed command uses mode 1 and distance 800.

Plain media instead uses paper type 0, reverses 12 dots before the image, then
advances 52 and 12 dots. Black-mark media uses the tag recipe with paper type 2.

## Transport boundary

The S001 profile is recorded as Bluetooth Classic/RFCOMM (SPP), represented here
as a serial byte stream. No S001 GATT UUID pair has been verified. Similar
YK-framed printers have been observed with different services, so importing a
UUID from another model would be unsafe and misleading.
