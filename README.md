# OpenTLP — Open Thermal Label Printers

A community database of thermal label printers: what they are, how to talk to
them, and which software already supports them.

Modelled on [OpenWrt's Table of Hardware][toh]. One file per device, aggregated
into a searchable table and a machine-readable export.

[toh]: https://openwrt.org/toh/start

**[Browse the table →](https://josb25.github.io/opentlp/)** ·
**[devices.json →](https://josb25.github.io/opentlp/devices.json)** ·
**[families.json →](https://josb25.github.io/opentlp/families.json)**

---

## Find your printer

Search the table by brand, model or the name the printer advertises over
Bluetooth. Each entry tells you:

- what protocol it speaks, and which other printers speak the same one
- print width, resolution and media handling
- the mechanism: cutter, head-to-cutter distance, pullback, accepted media,
  and whether it refuses third-party consumables
- what it reports back about itself — battery, media, faults
- BLE service and characteristic UUIDs and the name it advertises, or USB
  vendor and product ids
- which free and open source projects support it, and how well
- an illustration of the machine, in the colours it is sold in
- where every one of those claims came from

If your printer is missing, [add it](CONTRIBUTING.md) — a partial entry is
useful.

## Write a driver

Device pages describe printers. **Protocol family pages describe how to talk to
them** — packet framing, checksum parameters, bit order, compression settings,
flow control, the command table, and where to find golden vectors that prove an
implementation correct without owning the hardware.

Device and family pages answer different questions. A device page tells you what
a printer is and whether your software supports it; a family page tells you how
to implement that support. Both are recorded here, and neither substitutes for
the other.

```bash
curl -sO https://josb25.github.io/opentlp/families.json
```

## Use the data

The database is published as two JSON files: `devices.json` and `families.json`.
They are the integration contract, versioned and safe to depend on.

```bash
curl -sO https://josb25.github.io/opentlp/devices.json
```

```bash
jq '.devices[] | select(.protocol.family == "tiny") | .model' devices.json
```

Key on `id`. Ids are permanent and never reused. Every other field may be
corrected as better information arrives.

The data is CC0 — public domain. Ship it in your app, no attribution required.

### Importing into an application

`scripts/export.mjs` turns `devices.json` into a driver table for a consuming
project. It is deliberately small; copy it and change the output shape.

Going the other way, `scripts/import-catalogue.mjs` seeds entries from a project
that already knows things. Imported entries arrive as `status: unverified` with
the project as their source.

## Contribute

Each printer has a page under `devices/`, and each protocol a page under
`families/`: YAML front matter for the structured record, Markdown prose for
everything else. Edit by hand, open a pull request.

```bash
npm install
npm run validate
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for the fields and the evidence rules. The
short version: **every field is a claim someone can check.** If you do not know
a value, leave it out — a blank cell reads as "unknown", which is true, and a
guessed one reads as fact, which may not be.

## Scope

This catalogues **thermal label printers** — the Bluetooth and USB units sold for
labelling, from 15 mm pocket printers to 80 mm desktop machines.

It records structured, tabular facts. It is not a wiki, and it does not try to
replace the deep per-brand documentation projects; where one exists, entries link
to it. For NIIMBOT hardware in particular — teardowns, firmware, PCB photos — see
the [NIIMBOT Community Wiki](https://printers.niim.blue/).

## Licence

| | |
|---|---|
| Data (`devices/`) | [CC0-1.0](LICENSES/CC0-1.0.txt) — public domain |
| Code (`scripts/`) | [MIT](LICENSES/MIT.txt) |

Sources keep their own terms. Linking to a document does not relicense it, and
content from a share-alike wiki cannot be copied in — record the facts, cite the
page.
