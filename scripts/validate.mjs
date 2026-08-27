/**
 * The gate on the database.
 *
 * The schema catches malformed entries. This adds the checks a schema cannot
 * express — the ones about the collection as a whole, and the ones that keep
 * entries honest rather than merely well-formed.
 *
 * Run on every change: `npm run validate`.
 */

import { readFile } from 'node:fs/promises';
import { join, basename, dirname } from 'node:path';
// The 2020-12 build, not Ajv's default draft-07 one — the schema declares
// $schema: draft/2020-12 and the default build rejects it outright.
import Ajv from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import { loadDevices, loadFamilies, ROOT } from './lib/load.mjs';
import { PROJECTS } from './lib/projects.mjs';
import { sanitiseSvg } from './lib/svg.mjs';

const schema = JSON.parse(await readFile(join(ROOT, 'schema/device.schema.json'), 'utf8'));
const ajv = addFormats(new Ajv({ allErrors: true, strict: false }));
const validateSchema = ajv.compile(schema);

const familySchema = JSON.parse(await readFile(join(ROOT, 'schema/family.schema.json'), 'utf8'));
const validateFamily = ajv.compile(familySchema);

const { devices, errors } = await loadDevices();
const { devices: families, errors: familyErrors } = await loadFamilies();
const problems = [...errors, ...familyErrors];
/** Not fatal: things a reviewer should look at, not things that block a merge. */
const warnings = [];

const byId = new Map();

for (const { path, device, body } of devices) {
    for (const error of validateSchema(device) ? [] : validateSchema.errors) {
        const at = error.instancePath || '/';
        problems.push(`${path}: ${at} ${error.message}`);
    }

    // The page title is generated from brand and model, so a hand-written one
    // would render twice and could drift from the front matter.
    if (/^#[^#]/.test(body)) {
        problems.push(`${path}: page body starts with an H1 — the title is generated, start at "## "`);
    }

    if (typeof device.id !== 'string') continue;

    const seen = byId.get(device.id);
    if (seen) problems.push(`${path}: id "${device.id}" is already used by ${seen}`);
    else byId.set(device.id, path);

    // The filename carries the id so a reviewer can find a page without
    // grepping, and so a rename is visible in the diff rather than silent.
    const expected = `${device.id}.md`;
    if (basename(path) !== expected) {
        problems.push(`${path}: should be named ${expected} to match its id`);
    }
}

const familyIds = new Set();
for (const { path, device: family, body } of families) {
    for (const error of validateFamily(family) ? [] : validateFamily.errors) {
        problems.push(`${path}: ${error.instancePath || '/'} ${error.message}`);
    }
    if (/^#[^#]/.test(body)) {
        problems.push(`${path}: page body starts with an H1 — the title is generated, start at "## "`);
    }
    if (typeof family.id !== 'string') continue;
    if (familyIds.has(family.id)) problems.push(`${path}: family id "${family.id}" is used twice`);
    familyIds.add(family.id);
    if (basename(path) !== `${family.id}.md`) {
        problems.push(`${path}: should be named ${family.id}.md to match its id`);
    }
    for (const entry of family.implementations ?? []) {
        if (!PROJECTS.has(entry.project)) {
            problems.push(`${path}: implementation project "${entry.project}" is not in data/projects.json`);
        }
    }
}

// Every page renders flat into site/, so an internal link is <id>.html and its
// target is either a device or a family. A wiki's cross-references rot quietly
// otherwise — a renamed page leaves working-looking links that 404.
//
// Any local link, not only .html. A repo-relative one such as CONTRIBUTING.md
// resolves against the site root, where no such file was ever built; that is a
// 404 nobody notices until a reader hits it.
const pageIds = new Set([...devices.map(d => d.device.id), ...familyIds].filter(Boolean));

for (const { path, body } of [...devices, ...families]) {
    for (const [, target] of body.matchAll(/\]\((?!https?:|mailto:|#)([^)\s]+)\)/g)) {
        const [file] = target.split('#');
        if (!file) continue;

        if (!file.endsWith('.html')) {
            problems.push(
                `${path}: links to ${target} — pages are built flat as <id>.html, ` +
                `so a repository path does not resolve on the site`
            );
            continue;
        }
        if (!pageIds.has(basename(file, '.html'))) {
            problems.push(`${path}: links to ${target}, which is not a page in this wiki`);
        }
    }
}

// Cross-entry checks, once every id is known.
for (const { path, device } of devices) {
    if (device.rebadge_of) {
        if (!byId.has(device.rebadge_of)) {
            problems.push(`${path}: rebadge_of "${device.rebadge_of}" is not a device in this database`);
        } else if (device.rebadge_of === device.id) {
            problems.push(`${path}: rebadge_of points at itself`);
        }
    }

    // "Verified" is the only claim in the database that asserts a person did
    // something. A catalogue transcription cannot support it, so require at
    // least one source that could.
    if (device.status === 'verified') {
        const kinds = (device.sources ?? []).map(s => s.kind);
        const strong = kinds.some(k => k === 'protocol-capture' || k === 'user-report' || k === 'vendor-doc');
        if (!strong) {
            problems.push(
                `${path}: status "verified" needs a source of kind protocol-capture, user-report or vendor-doc — ` +
                `has only ${kinds.join(', ') || 'none'}`
            );
        }
    }

    const sourceIds = new Set();
    for (const source of device.sources ?? []) {
        if (source.id) {
            if (sourceIds.has(source.id)) {
                problems.push(`${path}: duplicate source id "${source.id}"`);
            }
            sourceIds.add(source.id);
        }
        for (const claim of source.covers ?? []) {
            if (!hasClaim(device, claim)) {
                problems.push(`${path}: source${source.id ? ` "${source.id}"` : ''} covers missing field "${claim}"`);
            }
        }
    }

    for (const [slug, entry] of Object.entries(device.support ?? {})) {
        // A closed list, so a typo cannot silently split one project into two
        // half-populated columns of a matrix whose whole value is comparability.
        if (!PROJECTS.has(slug)) {
            problems.push(
                `${path}: support key "${slug}" is not a known project — ` +
                `add it to data/projects.json, or use one of: ${[...PROJECTS.keys()].join(', ')}`
            );
        }

        // A project's support level and this entry's status are different
        // axes: a library can genuinely drive a printer whose specifications
        // nobody here has confirmed. Warn only when nothing evidences the
        // claim at all.
        const kinds = (device.sources ?? []).map(source => source.kind);
        if (entry.level === 'listed' && !kinds.includes('oss-project')) {
            problems.push(`${path}: ${slug} is marked "listed" without an OSS-project source`);
        }
        if ((entry.level === 'works' || entry.level === 'partial')
            && !kinds.some(kind => kind === 'user-report' || kind === 'protocol-capture')) {
            problems.push(
                `${path}: ${slug} is marked "${entry.level}" without a user report or protocol capture ` +
                `recording successful output`
            );
        }
    }

    // A regex nobody tested is worse than a prefix list: it silently matches
    // nothing. The examples are what make it checkable, so check them.
    const ble = device.connectivity?.ble;
    if (ble?.name_pattern) {
        let pattern;
        try {
            pattern = new RegExp(ble.name_pattern);
        } catch (error) {
            problems.push(`${path}: connectivity.ble.name_pattern is not a valid regex — ${error.message}`);
        }
        for (const example of pattern ? ble.name_examples ?? [] : []) {
            if (!pattern.test(example)) {
                problems.push(
                    `${path}: name_examples entry "${example}" does not match ` +
                    `name_pattern /${ble.name_pattern}/`
                );
            }
        }
        if (!ble.name_examples?.length && /[\^$]/.test(ble.name_pattern)) {
            warnings.push(
                `${path}: name_pattern /${ble.name_pattern}/ is anchored but has no name_examples — ` +
                `anchoring claims the exact advertised form, which needs an observed name behind it`
            );
        }
    }

    // `artwork.lamps` says what colour to draw; `indicators` says what each
    // colour means. They are joined by name, and a name on one side with no
    // partner on the other is a join that silently produces nothing.
    for (const lamp of device.artwork?.lamps ?? []) {
        if (!device.artwork.hooks?.[lamp.hook]) {
            problems.push(`${path}: artwork.lamps hook "${lamp.hook}" is not in artwork.hooks`);
        }
        const meanings = new Set((device.indicators ?? [])
            .flatMap(indicator => indicator.states.map(state => state.colour))
            .filter(Boolean));
        for (const state of Object.keys(lamp.states)) {
            if (meanings.size && !meanings.has(state)) {
                warnings.push(`${path}: artwork lamp state "${state}" has no matching colour under indicators, so nothing documents what it means`);
            }
        }
    }

    for (const animation of device.artwork?.animations ?? []) {
        if (!device.artwork.hooks?.[animation.part]) {
            problems.push(`${path}: animation "${animation.id}" drives part "${animation.part}", which is not in artwork.hooks`);
        }
    }

    if (device.artwork) {
        const from = join(ROOT, dirname(path), device.artwork.file);
        try {
            const { svg, removed } = sanitiseSvg(await readFile(from, 'utf8'));
            // A file that loses its root element was never usable artwork.
            if (!/<svg[\s>]/i.test(svg)) {
                problems.push(`${path}: artwork ${device.artwork.file} has no usable <svg> after sanitising`);
            }
            // Not fatal — the build strips it either way — but a contributor
            // should be told their file is not going to render as submitted.
            if (removed.length) {
                warnings.push(`${path}: artwork ${device.artwork.file} contains ${removed.join(', ')}, which will be stripped`);
            }
        } catch {
            problems.push(`${path}: artwork file ${device.artwork.file} is missing`);
        }
    }

    // Dots and millimetres have to agree with the head resolution, within a
    // rounding tolerance. A mismatch usually means one of the three was copied
    // from a different model.
    const p = device.print;
    if (p?.width_dots && p?.width_mm && p?.dpi) {
        const implied = (p.width_dots / p.dpi) * 25.4;
        if (Math.abs(implied - p.width_mm) > 1.5) {
            problems.push(
                `${path}: print.width_dots ${p.width_dots} at ${p.dpi} dpi is ${implied.toFixed(1)} mm, ` +
                `but width_mm says ${p.width_mm}`
            );
        }
    }
    if (p?.width_mm && p?.media_width_mm && p.width_mm > p.media_width_mm) {
        problems.push(`${path}: printable width ${p.width_mm} mm exceeds media width ${p.media_width_mm} mm`);
    }
}

/** A source cannot support a claim the entry does not actually make. */
function hasClaim(record, dottedPath) {
    let value = record;
    for (const part of dottedPath.split('.')) {
        if (value === null || typeof value !== 'object' || !(part in value)) return false;
        value = value[part];
    }
    return value !== undefined && value !== null;
}

for (const warning of warnings) console.warn(`warn  ${warning}`);
for (const problem of problems) console.error(`error ${problem}`);

if (problems.length) {
    console.error(`\n${problems.length} problem(s) in ${devices.length} device(s).`);
    process.exit(1);
}
console.log(
    `${devices.length} device(s) and ${families.length} family page(s) valid` +
    `${warnings.length ? `, ${warnings.length} warning(s)` : ''}.`
);
