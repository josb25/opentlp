---
id: phomemo_m110
brand: Phomemo
model: M110
summary: 48 mm label printer on Phomemo's ESC/POS-derived command set.

protocol:
  family: phomemo

print:
  dpi: 203
  media: [gap, continuous]
  colour: monochrome

connectivity:
  ble:
    name_pattern: "M110"
    name_examples: [M110]

support:
  phomemo-tools:
    level: listed
    notes: Named in the project's supported-model list.

status: reported

sources:
  - kind: oss-project
    url: https://github.com/vivier/phomemo-tools
    licence: GPL-3.0
    note: Documents the command set and per-model line widths.
  - kind: oss-project
    url: https://github.com/transcriptionstream/phomymo
    note: >-
      Lists supported models and widths. Its README states MIT but the
      repository carries no licence file, so only factual claims are taken
      from it.
  - kind: catalogue
    note: >-
      Transcribed from a driver's model table; specifications not confirmed against hardware.

documentation:
  - url: https://github.com/vivier/phomemo-tools
    title: phomemo-tools — protocol documentation
    licence: GPL-3.0
    covers: [protocol]
---

## Protocol notes

The command set is documented on the [phomemo family page](phomemo.html). This
model supports the density command, which not all members of the family do.

## Not yet recorded

Media widths. Cutter, backfeed and paper DRM. What the printer reports back.
The name pattern is unanchored at the end, pending a confirmed scan.

## Printable width is contested

Three sources disagree, and none of them is a measurement:

| Source | Claim |
|---|---|
| phomymo | 384 dots, 48 mm |
| phomemo-tools | 344 dots (43 bytes per line) |
| a driver model table | 384 dots |

No width is recorded until this is resolved against hardware.
