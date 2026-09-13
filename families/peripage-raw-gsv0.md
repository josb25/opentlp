---
id: peripage-raw-gsv0
name: PeriPage raw GS v 0
summary: PeriPage's uncompressed 384/576-dot raster family, using an ESC/POS GS v 0 image header and model-specific setup commands.
also_known_as: [PeriPage A6 protocol, PeriPage raw raster]
transports: [ble, serial]

raster:
  bit_order: msb-first
  polarity: 1-is-black
  row_padding: byte
  width_unit: bytes
  compression:
    algorithm: none

flow:
  note: The hardware-reported A6+ BLE path writes the GS v 0 header separately, then writes each 72-byte raster row separately. Other profiles remain unverified.

commands:
  - opcode: 10 ff fe 01
    name: Enable printing
  - opcode: 10 ff 10 00
    name: Set density
    payload: u8 density 0-2 follows the opcode
  - opcode: 1d 0c
    name: Set print position
  - opcode: 1d 76 30 00
    name: Begin uncompressed raster image
    payload: width in bytes (u16le), height in rows (u16le), then packed raster rows
  - opcode: 1b 4a
    name: Feed paper
    payload: u8 feed distance follows the opcode
  - opcode: 10 ff fe 45
    name: Stop printing

implementations:
  - project: peripage-python
    url: https://github.com/bitrate16/peripage-python/tree/692c3cd7c500dc12933a944f4f29dfece5f2cb91
  - project: blewebler2
    module: packages/core/src/drivers/peripage
    url: https://github.com/josb25/BleWebler2/tree/2c81a764cf04dc1a90bad77897c62115f07dd936/packages/core/src/drivers/peripage

status: reported

sources:
  - kind: vendor-doc
    url: https://apkpure.net/peripage/com.ileadtek.peripage
    retrieved: 2026-09-12
    note: >-
      PeriPage Android app 6.10.11, package com.ileadtek.peripage, version code
      323, SHA-256 a842d10c92dfd05bfe4100ff55538d4d5647c7741573a9174e8d70c9f3753495.
      Clean-room inspection established raw/compressed routing, model-name groups,
      geometry, raster packing, command order and write boundaries. No app code or
      assets are redistributed.
  - kind: oss-project
    url: https://github.com/ouor/my-bt-printers/blob/9c65351c457ac8d60300aba20f4c48d609aafd4a/docs/devices/Peripage.md
    note: Hardware-observed A6+ BLE name, FF00/FF02/FF01 path, 576-dot width, raster layout, commands and row write boundaries. The repository declares no licence, so only protocol facts were used.
  - kind: oss-project
    url: https://github.com/bitrate16/peripage-python/tree/692c3cd7c500dc12933a944f4f29dfece5f2cb91
    licence: GPL-3.0
    note: Independent A6/A6+ implementation documenting 384/576-dot raw raster and Classic Bluetooth transport. Protocol facts only; no GPL code was copied.
---

This family covers the uncompressed raster route used for PeriPage A6, A6+,
C6, C6+ and the non-Plus P21 resolution variants in app version 6.10.11. It is
one protocol family with multiple geometries, not one driver per retail model.

The P21+ is deliberately excluded. The vendor app sends it through a different
compressed encoder, so treating the shared brand or model stem as compatibility
evidence would select the wrong wire protocol.

## Identification and rebadges

The short model strings A6, C6 and P21 occur under unrelated brands. They are
not sufficient identifiers on their own. Firmware-qualified PeriPage/PPG names
can select a geometry profile; otherwise software should let the user choose a
family and model profile explicitly. No rebadge is recorded until a source ties
the hardware, firmware name or captured bytes to this family.
