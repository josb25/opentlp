/**
 * One protocol family page.
 *
 * The audience is someone writing a driver, so the order is the order they need
 * things in: what it is, whether it talks back, how a packet is framed, how a
 * bitmap becomes bytes, how fast it may be pushed, what the opcodes are, and how
 * to prove the result correct.
 */

import { marked } from 'marked';
import { escapeHtml, humanise, mono, page, specTable } from './html.mjs';
import { PROJECTS, projectName } from './projects.mjs';
import { editFile } from './site.mjs';

/** @param {{ family: any, body: string, devices: any[] }} input */
export function renderFamilyPage({ family, body, devices }) {
    const sections = [
        `<article class="device family">`,
        `<h1>${escapeHtml(family.name)}</h1>`,
        family.summary ? `<p class="summary">${escapeHtml(family.summary)}</p>` : '',
        acknowledgement(family),
        identity(family),
        framing(family.framing),
        raster(family.raster),
        flow(family.flow),
        commands(family.commands),
        conformance(family.conformance),
        body ? `<div class="prose">\n${marked.parse(body)}\n</div>` : '',
        implementations(family.implementations),
        deviceList(devices),
        sources(family.sources),
        `<p class="edit"><a href="${escapeHtml(editFile(family._path))}">Improve this page</a></p>`,
        `</article>`
    ];

    return page({
        title: `${family.name} — OpenTLP`,
        description: family.summary ?? `${family.name}: wire format, commands and implementations.`,
        body: sections.filter(Boolean).join('\n')
    });
}

/**
 * Leads the page, because it changes how everything below is used.
 *
 * On a family that does not acknowledge, every other field has to be right
 * first time — there is no error to read when one is not.
 */
function acknowledgement(family) {
    if (family.acknowledges === undefined) return '';
    return family.acknowledges
        ? `<p class="status status-verified"><strong>Acknowledged.</strong> The printer confirms received
packets and reports faults.</p>`
        : `<p class="status status-warn"><strong>Write-only.</strong> No packet is acknowledged and no
fault is reported.</p>`;
}

function identity(family) {
    return section('Family', specTable([
        ['Slug', mono(family.id)],
        ['Based on', family.based_on ? escapeHtml(family.based_on) : ''],
        ['Also called', family.also_known_as?.map(escapeHtml).join(', ')],
        ['Transports', family.transports?.map(t => escapeHtml(t.toUpperCase())).join(', ')]
    ]));
}

function framing(framing) {
    if (!framing) return '';
    const rows = [
        ['Prefix', framing.prefix ? mono(framing.prefix) : ''],
        ['Layout', framing.layout ? escapeHtml(framing.layout) : '']
    ];

    if (framing.length) {
        rows.push(['Length field', escapeHtml([
            framing.length.bytes && `${framing.length.bytes} byte${framing.length.bytes === 1 ? '' : 's'}`,
            framing.length.endian && `${framing.length.endian}-endian`,
            framing.length.covers && `counts the ${framing.length.covers}`
        ].filter(Boolean).join(', '))]);
    }

    const check = framing.checksum;
    if (check) {
        // Every parameter, always. A CRC named only by its width is not
        // reproducible, and a wrong one produces plausible-looking bytes.
        rows.push(['Checksum', escapeHtml(humanise(check.algorithm ?? 'unknown').toUpperCase())]);
        rows.push(['Polynomial', check.polynomial ? mono(check.polynomial) : '']);
        rows.push(['Initial value', check.init ? mono(check.init) : '']);
        rows.push(['Reflection', check.reflect_in === undefined && check.reflect_out === undefined ? ''
            : escapeHtml(`in: ${yesNo(check.reflect_in)}, out: ${yesNo(check.reflect_out)}`)]);
        rows.push(['Final XOR', check.xor_out ? mono(check.xor_out) : '']);
        rows.push(['Covers', check.covers ? escapeHtml(`the ${check.covers}`) : '']);
        rows.push(['', check.note ? `<span class="muted">${escapeHtml(check.note)}</span>` : '']);
    }

    return section('Packet framing', specTable(rows));
}

function raster(raster) {
    if (!raster) return '';
    const c = raster.compression;
    const rows = [
        ['Bit order', raster.bit_order === 'msb-first' ? 'MSB first; leftmost pixel in the high bit'
            : raster.bit_order === 'lsb-first' ? 'LSB first; leftmost pixel in the low bit' : ''],
        ['Polarity', raster.polarity === '1-is-black' ? 'Set bit is ink'
            : raster.polarity === '0-is-black' ? 'Clear bit is ink' : ''],
        ['Row padding', raster.row_padding === 'byte' ? 'Rows start on a byte boundary'
            : raster.row_padding === 'none' ? 'None' : ''],
        ['Header width unit', raster.width_unit ? escapeHtml(raster.width_unit) : '']
    ];

    if (c) {
        rows.push(['Compression', escapeHtml(c.algorithm === 'none' ? 'None' : c.algorithm ?? '')]);
        rows.push(['Window bits', c.window_bits !== undefined ? String(c.window_bits) : '']);
        rows.push(['Stream header', c.header_bytes ? mono(c.header_bytes) : '']);
        rows.push(['', c.note ? `<span class="muted">${escapeHtml(c.note)}</span>` : '']);
    }
    if (raster.note) rows.push(['', `<span class="muted">${escapeHtml(raster.note)}</span>`]);

    return section('Raster format', specTable(rows));
}

const FLOW_LABEL = {
    none: 'None',
    'notify-pause': 'Pause and resume sequences on the notify characteristic',
    'ack-per-packet': 'Each packet is acknowledged before the next',
    credit: 'Credit based'
};

function flow(flow) {
    if (!flow) return '';
    return section('Flow control', specTable([
        ['Maximum write', flow.max_write_bytes ? `${flow.max_write_bytes} bytes` : ''],
        ['Control', flow.control ? escapeHtml(FLOW_LABEL[flow.control] ?? flow.control) : ''],
        ['Pause', flow.pause_bytes ? mono(flow.pause_bytes) : ''],
        ['Resume', flow.resume_bytes ? mono(flow.resume_bytes) : ''],
        ['', flow.note ? `<span class="muted">${escapeHtml(flow.note)}</span>` : '']
    ]));
}

function commands(commands) {
    if (!commands?.length) return '';
    const rows = commands.map(command => `<tr>
<td class="opcode">${mono(command.opcode)}</td>
<td>${escapeHtml(command.name)}${
        command.status === 'confirmed'
            ? ' <span class="level level-works" title="Effect observed on hardware">confirmed</span>'
            : ' <span class="level level-planned" title="Inferred from a capture, not confirmed">inferred</span>'}</td>
<td>${[command.payload && mono(command.payload), command.description && escapeHtml(command.description)]
        .filter(Boolean).join('<br>')}</td>
</tr>`).join('\n');

    return section('Commands', `<table class="matrix commands"><tbody>\n${rows}\n</tbody></table>`);
}

function conformance(conformance) {
    if (!conformance) return '';
    const link = conformance.vectors_url
        ? `<a href="${escapeHtml(conformance.vectors_url)}">${escapeHtml(conformance.vectors_url)}</a>`
        : '';
    return section('Conformance vectors', `<p class="lede">Known inputs and the exact output bytes, for verifying an implementation
without hardware.</p>
${specTable([
        ['Vectors', link],
        ['Licence', conformance.licence ? `<span class="licence">${escapeHtml(conformance.licence)}</span>` : ''],
        ['Covers', conformance.covers?.map(escapeHtml).join(', ')],
        ['', conformance.note ? `<span class="muted">${escapeHtml(conformance.note)}</span>` : '']
    ])}`);
}

function implementations(implementations) {
    if (!implementations?.length) return '';
    const items = implementations.map(entry => {
        const project = PROJECTS.get(entry.project);
        const url = entry.url ?? project?.url;
        const label = escapeHtml(projectName(entry.project));
        return `<li>${url ? `<a href="${escapeHtml(url)}">${label}</a>` : label}
${entry.module ? mono(entry.module) : ''}
${project?.licence ? `<span class="licence">${escapeHtml(project.licence)}</span>` : ''}
${entry.note ? `<p class="note">${escapeHtml(entry.note)}</p>` : ''}</li>`;
    }).join('\n');

    return section('Implementations', `<p class="lede">Licences apply to the code, not to the protocol facts documented above.</p>
<ul class="links">\n${items}\n</ul>`);
}

function deviceList(devices) {
    if (!devices.length) return '';
    const items = devices.map(device =>
        `<li><a href="${escapeHtml(device.id)}.html">${escapeHtml(`${device.brand} ${device.model}`)}</a></li>`).join('\n');
    return section(`Devices in this family (${devices.length})`, `<ul class="links">\n${items}\n</ul>`);
}

function sources(sources) {
    if (!sources?.length) return '';
    const items = sources.map(source => {
        const label = source.title ?? source.url;
        const link = !label ? ''
            : source.url ? `<a href="${escapeHtml(source.url)}">${escapeHtml(label)}</a>`
            : escapeHtml(label);
        return `<li>
<span class="kind kind-${escapeHtml(source.kind)}">${escapeHtml(humanise(source.kind))}</span>
${link}
${source.licence ? `<span class="licence">${escapeHtml(source.licence)}</span>` : ''}
${source.note ? `<p class="note">${escapeHtml(source.note)}</p>` : ''}
</li>`;
    }).join('\n');
    return section('Sources', `<ul class="sources">\n${items}\n</ul>`);
}

const yesNo = value => value === undefined ? 'unknown' : value ? 'yes' : 'no';

const section = (heading, content) =>
    content ? `<section><h2>${escapeHtml(heading)}</h2>\n${content}\n</section>` : '';
