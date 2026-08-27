/**
 * Seed device pages from a project that already knows about printers.
 *
 * Input is a JSON file of catalogue entries — the shape a driver layer already
 * keeps internally. A file, not an import, so this repo never has to build
 * anybody else's project to run:
 *
 *   node scripts/import-catalogue.mjs dump.json --project blewebler2
 *
 * Everything it writes lands as `status: unverified`, sourced to the project.
 * "A driver claims this model exists" is genuinely weaker evidence than
 * "somebody printed from it", and the database is worth nothing if that
 * distinction erodes — least of all when a few hundred rows arrive at once.
 *
 * Existing pages are never touched. Import fills gaps; it does not overwrite
 * what people have checked by hand.
 */

import { mkdir, writeFile, readFile, access } from 'node:fs/promises';
import { join } from 'node:path';
import { stringify } from 'yaml';
import { DEVICES_DIR } from './lib/load.mjs';
import { PROJECTS } from './lib/projects.mjs';

const args = process.argv.slice(2);
const file = args.find(a => !a.startsWith('--'));
const project = valueOf('--project');
const dryRun = args.includes('--dry-run');

if (!file || !project) {
    console.error('usage: import-catalogue.mjs <dump.json> --project <slug> [--dry-run]');
    process.exit(2);
}
if (!PROJECTS.has(project)) {
    console.error(`Unknown project "${project}". Known: ${[...PROJECTS.keys()].join(', ')}`);
    console.error('Add it to data/projects.json first.');
    process.exit(2);
}

/** The body of an imported page: an honest placeholder, not fabricated prose. */
const STUB = `Imported from a driver catalogue. Nobody has checked it against hardware, so the
specifications below are what that project believes rather than what anyone has
measured — and the mechanism, protocol details and internals are missing entirely.

If you own this printer, please [improve this page](https://github.com/opentlp/opentlp).
`;

const slug = value => String(value).toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
const round1 = value => Math.round(value * 10) / 10;

/**
 * Accepted input, kept deliberately loose:
 *
 *   { id?, brand, model, family?, widthPx?|width_dots?, dpi?|dpmm?,
 *     namePrefixes?, ... }
 *
 * A consuming project will have its own field names; map them on the way out
 * rather than making anyone reshape their catalogue to match this tool.
 */
const raw = JSON.parse(await readFile(file, 'utf8'));
const entries = Array.isArray(raw) ? raw : raw.models ?? raw.devices ?? [];
const source = PROJECTS.get(project);

let written = 0;
let skipped = 0;

for (const entry of entries) {
    const brand = (entry.brand ?? 'Generic').trim();
    const model = String(entry.model ?? '').trim();
    if (!model) { skipped++; continue; }

    const id = entry.id ?? slug(`${brand}_${model}`);
    const dir = join(DEVICES_DIR, slug(brand));
    const path = join(dir, `${id}.md`);

    if (await exists(path)) { skipped++; continue; }

    const dpi = entry.dpi ?? (entry.dpmm ? Math.round(entry.dpmm * 25.4) : undefined);
    const widthDots = entry.width_dots ?? entry.widthPx ?? entry.canvasHeightPx;

    const device = prune({
        id,
        brand,
        model,
        protocol: prune({ family: entry.family }),
        print: prune({
            width_dots: widthDots,
            // Derived, not asserted: given dots and resolution the millimetre
            // width follows, and the validator cross-checks the three agree.
            width_mm: widthDots && dpi ? round1((widthDots / dpi) * 25.4) : undefined,
            dpi: [203, 300, 600].includes(dpi) ? dpi : undefined
        }),
        connectivity: prune({
            ble: prune(bleNames(entry.namePrefixes ?? entry.name_prefixes ?? entry.name_examples))
        }),
        support: { [project]: { level: 'planned' } },
        status: 'unverified',
        sources: [{
            kind: 'oss-project',
            url: source.url,
            title: `${source.name} device catalogue`,
            licence: source.licence,
            note: 'Imported from the project\'s driver tables; not independently confirmed.',
            retrieved: new Date().toISOString().slice(0, 10)
        }]
    });

    // Without at least one way in, an entry cannot help anybody, and the schema
    // says so. Rather than invent connectivity, skip and let a person add it.
    if (!device.connectivity) { skipped++; continue; }

    if (dryRun) {
        console.log(`would write ${id}`);
    } else {
        await mkdir(dir, { recursive: true });
        await writeFile(path, `---\n${stringify(device, { lineWidth: 0 })}---\n\n${STUB}`, 'utf8');
    }
    written++;
}

console.log(
    `${dryRun ? 'Would import' : 'Imported'} ${written} device(s), skipped ${skipped} ` +
    `(already present, or too little to go on).`
);
console.log('Run `npm run validate` next, and read what was written before committing it.');

function valueOf(flag) {
    const index = args.indexOf(flag);
    return index === -1 ? undefined : args[index + 1];
}

/**
 * Turn a catalogue's list of advertised names into a pattern plus examples.
 *
 * Anchored, alternating over the names given. Someone who knows the hardware can
 * tighten it later — adding `$`, or collapsing `GB01|GB02|GB03` into a range.
 * Guessing tighter here would assert something the source catalogue never said.
 */
function bleNames(names) {
    if (!names?.length) return {};
    const unique = [...new Set(names)];
    const escaped = unique.map(name => name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    return {
        name_pattern: `^(${escaped.join('|')})`,
        name_examples: unique
    };
}

/** Drop empty branches, so an unknown field is absent rather than null. */
function prune(object) {
    const kept = Object.entries(object).filter(([, value]) =>
        value !== undefined && value !== null && value !== '' &&
        !(Array.isArray(value) && value.length === 0) &&
        !(typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === 0));
    return kept.length ? Object.fromEntries(kept) : undefined;
}

async function exists(path) {
    try { await access(path); return true; } catch { return false; }
}
