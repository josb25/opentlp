# Adopting OpenTLP as your source of device facts

A project can go further than reading `devices.json` occasionally: it can delete
its own device tables and generate them from here instead. This describes how,
and — more importantly — what should **not** move.

## What belongs here, and what does not

The split that makes this work:

| | Owner |
|---|---|
| Facts about the machine — width, resolution, protocol family, UUIDs, cutter, consumable lock, what it reports | **OpenTLP** |
| Driver behaviour — framing, packing, chunking, handshakes, error handling | **The application** |
| Policy — default feed distances, UI ranges, per-job options, which driver to prefer | **The application** |

The middle row is code and must stay code. No declarative format survives
contact with a protocol that has session state and flow control.

The third row is the one that gets confused for data. A default feed distance is
a judgement about what usually looks right; a *maximum* feed distance is a fact
about the mechanism. The first belongs to the application, the second here. When
in doubt, ask whether two reasonable people with the same printer could disagree.
If they could, it is policy.

## Prerequisite: break the citation loop

If an application seeds OpenTLP from its own tables, and then regenerates those
tables from OpenTLP, the provenance is circular. Every entry cites a source that
cites the entry, and `sources` becomes decoration.

**Before inverting the dependency, entries sourced `kind: catalogue` from the
adopting project must be re-sourced** — to a capture, a vendor document, a user
report, or another project. An entry that cannot be re-sourced is not wrong; it
simply must not be treated as authoritative by the project it came from.

This is the step most likely to be skipped and the one that decides whether any
of this means anything.

## Steps

**1. Agree, before you depend.** Run a check in CI on both sides comparing the
application's device tables against `devices.json`, and report disagreements on
width, resolution, family and UUIDs. Neither side is authoritative yet; they
just have to match. This catches drift while it is still cheap.

**2. Close the schema gap.** List every field the application needs per model
and classify it against the table above. Add the missing *facts* to the OpenTLP
schema; leave the policy where it is. Expect this list to be shorter than it
looks — most of what an application stores per model is already a fact somebody
has recorded.

**3. Reach parity, and gate on it.** OpenTLP must cover every model the
application ships, with no field it currently relies on missing. Until then,
adopting means regressing. A parity script that fails loudly is worth more than
a plan.

**4. Vendor a snapshot — do not fetch at runtime.** Commit a pinned
`devices.json` into the application and generate the tables from it at build
time. Updating device data becomes an ordinary reviewable pull request
("bump device data to 2026-09-01"), revertible like any other change.

**Never put a community-editable database in the print path.** A merged pull
request here should not be able to change what a user's printer does tonight.

**5. Delete the original tables.** This is the moment of adoption, and it should
be a single commit that removes them and points the generator at the snapshot.
If step 3 was done honestly, nothing changes behaviourally and the diff is
boring. If it was not, this is where that shows.

**6. Raise review standards here.** Once a project ships from this data, a
careless merge has consequences beyond a wiki page. That is an argument for the
snapshot in step 4, and for treating `status: verified` as something that
requires evidence rather than confidence.

## Licensing

Data here is CC0, so it can be embedded in a project under any licence without
obligation. Artwork carries its own `licence` field and is the one thing that
may not be — check it before shipping a drawing.

## When this is not worth doing

If the application is the only source of the data, adopting OpenTLP buys nothing
and costs a build step. The value appears when the database knows things the
application's author could not have known: printers they do not own, advertised
names somebody else observed, and support status for other projects.

Until that is true, the useful direction is the other one — contribute what you
know, and keep your own tables.
