/**
 * Compare an application's device tables against this database.
 *
 *   node scripts/drift.mjs their-catalogue.json
 *
 * Neither side is authoritative. This reports where they disagree, which is the
 * only useful thing to say while both are maintained by hand — a mismatch means
 * one of them is wrong and somebody should find out which.
 *
 * Reads a dumped file rather than importing anything, so this repository never
 * builds anybody else's project. See INTEGRATION.md step 1.
 *
 * Exit code is 1 when anything disagrees, so it can gate CI on both sides.
 */

import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { SITE_DIR } from './lib/load.mjs';

const args = process.argv.slice(2);
const file = args.find(a => !a.startsWith('--'));
const quiet = args.includes('--quiet');

if (!file) {
    console.error('usage: drift.mjs <their-catalogue.json> [--quiet]');
    console.error('\nThe catalogue is a JSON array of entries shaped roughly like');
    console.error('  { id?, brand, model, family?, widthPx?, dpmm?, namePrefixes?, services? }');
    process.exit(2);
}

const ours = JSON.parse(await readFile(join(SITE_DIR, 'devices.json'), 'utf8')).devices;
const raw = JSON.parse(await readFile(file, 'utf8'));
const theirs = Array.isArray(raw) ? raw : raw.models ?? raw.devices ?? [];

/**
 * Three ways to match, in descending confidence.
 *
 * Ids agree only where both sides happen to have picked the same slug, and
 * brands are worded differently on either side — this database says "Generic Cat
 * Printer" where an application says "Generic". Model plus protocol family is
 * the fallback that survives both, and stays collision-safe: `D110` exists under
 * two brands, but not within one family.
 */
const byId = new Map(ours.map(d => [d.id, d]));
const byName = new Map(ours.map(d => [key(d.brand, d.model), d]));
const byModelFamily = new Map(ours.map(d => [key(d.protocol?.family ?? '', d.model), d]));

const disagreements = [];
const missing = [];
let compared = 0;

for (const entry of theirs) {
    const model = String(entry.model ?? '').trim();
    if (!model) continue;

    const mine = byId.get(entry.id)
        ?? byName.get(key(entry.brand ?? 'Generic', model))
        ?? byModelFamily.get(key(familyOf(entry), model));
    if (!mine) {
        missing.push(`${entry.brand ?? 'Generic'} ${model}`);
        continue;
    }
    compared++;

    // Only fields both sides genuinely claim. Comparing something one side
    // stores as policy would produce noise that trains people to ignore this.
    check(mine, 'print.width_dots', mine.print?.width_dots,
        entry.widthPx ?? entry.canvasHeightPx ?? entry.width_dots);

    const theirDpi = entry.dpi ?? (entry.dpmm ? Math.round(entry.dpmm * 25.4) : undefined);
    // Resolution is compared with a tolerance. An application that stores dots
    // per millimetre as a round 12 means the same 300 dpi head this database
    // names 300; reporting 305-vs-300 every run would bury the real findings.
    if (mine.print?.dpi && theirDpi && Math.abs(mine.print.dpi - theirDpi) / mine.print.dpi > 0.02) {
        disagreements.push(`${mine.id}: print.dpi — here ${mine.print.dpi}, application ${theirDpi}`);
    }

    // `protocol.family` is deliberately not compared. An application's family
    // is usually a display name for a product line — "Marklife 15mm Series" —
    // and this database's is a protocol slug. Different concepts that happen to
    // share a word, and comparing them produces a page of noise per run.
    check(mine, 'print.max_density', mine.print?.max_density, entry.maxDensity);
    check(mine, 'mechanism.head_to_cutter_dots',
        mine.mechanism?.head_to_cutter_dots, entry.headToCutterPx);

    // A service the application requests but this database has never recorded
    // is worth knowing about; the reverse is not, since an application may
    // legitimately request fewer.
    const service = mine.connectivity?.ble?.service_uuid;
    const services = entry.services ?? entry.connectionRequirements?.services;
    if (service && services?.length && !services.some(s => s.toLowerCase() === service.toLowerCase())) {
        disagreements.push(
            `${mine.id}: connectivity.ble.service_uuid ${service} is not among the services ` +
            `the application requests (${services.join(', ')})`
        );
    }
}

/** A declaration, not a const arrow: it is used above, while byName is built. */
function key(brand, model) {
    return `${brand} ${model}`.toLowerCase();
}

/**
 * An application's `family` is usually a display name for a product line, so the
 * protocol slug is recovered from its first word where that matches one.
 */
function familyOf(entry) {
    const stated = String(entry.family ?? '').toLowerCase();
    for (const device of ours) {
        const slug = device.protocol?.family;
        if (slug && stated.includes(slug.split('-')[0])) return slug;
    }
    return '';
}

function check(mine, field, ourValue, theirValue) {
    if (ourValue === undefined || theirValue === undefined) return;
    if (String(ourValue) === String(theirValue)) return;
    disagreements.push(`${mine.id}: ${field} — here ${ourValue}, application ${theirValue}`);
}


if (!quiet) {
    for (const line of disagreements) console.error(`drift ${line}`);
    if (missing.length) {
        console.warn(`\n${missing.length} model(s) the application ships that are not catalogued here:`);
        console.warn(`  ${missing.join(', ')}`);
    }
}

console.log(
    `\nCompared ${compared} of ${theirs.length} application model(s) against ${ours.length} entries: ` +
    `${disagreements.length} disagreement(s), ${missing.length} uncatalogued.`
);

process.exit(disagreements.length || missing.length ? 1 : 0);
