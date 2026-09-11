---
id: funny-lx
name: Funny Print LX-D
summary: Authenticated 384-dot raster protocol with indexed image packets and retry notifications.
also_known_as: [BH-01 protocol, LX-D direct protocol]
transports: [ble]
acknowledges: true

raster:
  bit_order: msb-first
  polarity: 1-is-black
  row_padding: byte
  width_unit: bytes
  compression:
    algorithm: none
  note: Two 48-byte rows fill the 96-byte data area of each indexed image packet.

flow:
  max_write_bytes: 100
  control: none
  note: 5a 05 requests a packet retry, 5a 06 accepts the image transfer, 5a 07 changes the inter-packet delay, and 5a 08 is an intermediate pause signal.

commands:
  - opcode: "5a 01"
    name: Query status and MAC
    direction: both
  - opcode: "5a 0a"
    name: Send random challenge and receive low CRC bytes
    direction: both
  - opcode: "5a 0b"
    name: Send high CRC bytes and receive authentication result
    direction: both
  - opcode: "5a 0c"
    name: Set darkness
    payload: zero-based level 00..04
  - opcode: "5a 04"
    name: Begin or finish print transfer
    direction: both
    payload: packet count u16be followed by phase
  - opcode: "55"
    name: Send image packet
    payload: packet index u16be, 96 raster bytes, 00
  - opcode: "5a 05"
    name: Request image packet retry
    direction: from-printer
    payload: packet index u16be
  - opcode: "5a 06"
    name: Image transfer ready
    direction: from-printer
  - opcode: "5a 07"
    name: Set packet delay hint
    direction: from-printer
    payload: milliseconds (u8)
  - opcode: "5a 08"
    name: Pause notification
    direction: from-printer

conformance:
  vectors_url: https://github.com/josb25/BleWebler2/tree/b481ece/packages/core/src/drivers/catprinter
  licence: MIT
  covers: [checksum, row packing, job structure, authentication, flow-control]

implementations:
  - project: timini-print
    url: https://github.com/Dejniel/TiMini-Print/tree/a9a456c4243132bad52c500e39bdec221fe98db9/timiniprint/protocol/families/funny_lx
  - project: blewebler2
    url: https://github.com/josb25/BleWebler2/commit/b481ece

status: reported

sources:
  - kind: oss-project
    url: https://github.com/Dejniel/TiMini-Print/tree/a9a456c4243132bad52c500e39bdec221fe98db9/timiniprint/protocol/families/funny_lx
    licence: Apache-2.0
    note: Hardware-observed direct LX-D protocol, BLE handshake, CRC vectors, raster packets, transfer notifications and model association.
  - kind: oss-project
    url: https://github.com/josb25/BleWebler2/commit/b481ece
    licence: MIT
    note: Independent TypeScript implementation with authentication, raster and acknowledged-transfer tests.
---

The direct LX-D variant uses service `0000ffe6`, writes to `0000ffe1`, and
receives notifications on `0000ffe2`.

## Authentication

The host sends `5A 01 00`. A full status reply contains the six MAC bytes at
offset four. The host generates ten non-zero random bytes. For each byte it
calculates CRC-16/XMODEM over that byte followed by the MAC, sends the random
bytes with `5A 0A`, checks the returned low CRC bytes, then sends the high CRC
bytes with `5A 0B`. A `5A 0B 01` response completes authentication.

This permits authentication from Web Bluetooth when the status reply contains
the MAC even though the browser does not expose the operating system's device
address.

## Raster transfer

`5A 04`, a big-endian packet count and `00 00` open a transfer. Each 100-byte
image packet begins with `55`, carries a zero-based big-endian index, 96 packed
raster bytes and a zero terminator. A partial final block is zero padded.

The printer may request a resend with `5A 05` and an index. `5A 06` permits the
footer to be sent. The footer is `5A 04`, the original packet count and `01`;
some firmware echoes it and some remains silent.

## Scope

This page describes the hardware-observed `lx_d_direct` variant only. Similar
Funny Print names such as `LX-D002` and `DL-T1` are separate protocol types in
the source catalogue.

## Not yet recorded

Status fields, maximum print length and the meaning of the `5A 08` payload.
