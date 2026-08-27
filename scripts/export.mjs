/**
 * Turn `devices.json` into a driver table for a consuming application.
 *
 *   node scripts/export.mjs --project blewebler2 > printers.json
 *
 * Small on purpose. An application's driver layer has its own field names and
 * its own idea of what a printer is, so nothing here will fit unchanged — copy
 * this file, change {@link shape}, and leave the rest alone.
 *
 * Reads the built export rather than the source pages, so it works against a
 * downloaded `devices.json` from a published site just as well as a local build:
 *
 *   curl -sO https://josb25.github.io/opentlp/devices.json
 *   node scripts/export.mjs --from devices.json --project niimblue
 */

import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { SITE_DIR } from './lib/load.mjs';
import { PROJECTS } from './lib/projects.mjs';

const args = process.argv.slice(2);
const project = valueOf('--project');
const from = valueOf('--from') ?? join(SITE_DIR, 'devices.json');

if (project && !PROJECTS.has(project)) {
    console.error(`Unknown project "${project}". Known: ${[...PROJECTS.keys()].join(', ')}`);
    process.exit(2);
}

let source;
try {
    source = JSON.parse(await readFile(from, 'utf8'));
} catch (error) {
    console.error(`Cannot read ${from}: ${error.message}`);
    console.error('Run `npm run build` first, or pass --from with a downloaded devices.json.');
    process.exit(1);
}

const devices = source.devices
    // With --project, only what that project can currently drive. Without it,
    // everything — a project adding support wants the ones it cannot drive yet.
    .filter(device => !project || ['listed', 'works', 'partial'].includes(device.support?.[project]?.level))
    .map(shape);

process.stdout.write(JSON.stringify({
    source: 'opentlp',
    schema_version: source.version,
    generated: source.generated,
    licence: source.licence,
    devices
}, null, 2) + '\n');

/**
 * One device, flattened.
 *
 * Deliberately lossy: it keeps what a driver needs at runtime and drops what
 * only a reader needs — sources, certification, dimensions. Change this to suit
 * the consumer.
 */
function shape(device) {
    return dropEmpty({
        id: device.id,
        brand: device.brand,
        model: device.model,
        family: device.protocol?.family,
        variant: device.protocol?.variant,
        widthDots: device.print?.width_dots,
        dpi: device.print?.dpi,
        media: device.print?.media,
        namePattern: device.connectivity?.ble?.name_pattern,
        serviceUuid: device.connectivity?.ble?.service_uuid,
        writeUuid: device.connectivity?.ble?.write_uuid,
        notifyUuid: device.connectivity?.ble?.notify_uuid,
        usb: device.connectivity?.usb,
        cutter: device.mechanism?.cutter,
        headToCutterDots: device.mechanism?.head_to_cutter_dots,
        backfeed: device.mechanism?.backfeed,
        cutterTravelMm: device.mechanism?.cutter_travel,
        actions: device.mechanism?.actions,
        indicators: device.indicators,
        paperDrm: device.mechanism?.paper_drm,
        reports: device.reports,
        // Carried through so a consumer can show the same caveat the table
        // does, rather than presenting a catalogue transcription as certain.
        status: device.status ?? 'unverified'
    });
}

function valueOf(flag) {
    const index = args.indexOf(flag);
    return index === -1 ? undefined : args[index + 1];
}

// A declaration, not a `const` arrow: `shape` runs during the top-level map
// above, which is before a `const` down here would be initialised.
function dropEmpty(object) {
    return Object.fromEntries(
        Object.entries(object).filter(([, value]) =>
            value !== undefined && value !== null && !(Array.isArray(value) && !value.length)));
}
