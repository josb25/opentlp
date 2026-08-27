/**
 * The Table of Hardware.
 *
 * Every device, one row each, fully rendered server-side. The filter box is an
 * enhancement over a table that already works without it — someone arriving with
 * scripts blocked, or from a search engine, still gets the whole database.
 */

import { escapeHtml, humanise, page } from './html.mjs';
import { projectName } from './projects.mjs';

/** @param {{ devices: any[] }} input */
export function renderTablePage({ devices, families = [] }) {
    const documented = new Set(families.map(family => family.id));

    // What a family is colloquially called, so a search for "cat printer" finds
    // the devices that are one. The name is not on any of them — it belongs to
    // the protocol family, not to a brand — but it is what people type.
    const familyTerms = new Map(families.map(family =>
        [family.id, [family.name, ...(family.also_known_as ?? [])].join(' ')]));
    const rows = devices.map(device => {
        const projects = Object.entries(device.support ?? {})
            .filter(([, entry]) => ['listed', 'works', 'partial'].includes(entry.level))
            .map(([slug, entry]) =>
                `<span class="level level-${escapeHtml(entry.level)}" title="${escapeHtml(humanise(entry.level))}">${escapeHtml(projectName(slug))}</span>`)
            .join(' ');

        const width = device.print?.width_dots
            ? `${device.print.width_dots}<span class="unit">dots</span>`
            : device.print?.width_mm ? `${device.print.width_mm}<span class="unit">mm</span>` : '';

        // Everything the filter box searches, in one attribute, so filtering is
        // a substring test rather than a walk over cells.
        const haystack = [
            device.brand, device.model, device.id,
            ...(device.aliases ?? []),
            ...(device.connectivity?.ble?.name_examples ?? []),
            device.protocol?.family, device.protocol?.variant, device.protocol?.vendor_app,
            familyTerms.get(device.protocol?.family)
        ].filter(Boolean).join(' ').toLowerCase();

        return `<tr data-search="${escapeHtml(haystack)}" data-family="${escapeHtml(device.protocol?.family ?? '')}" data-status="${escapeHtml(device.status ?? 'unverified')}">
<td class="brand">${escapeHtml(device.brand)}</td>
<td class="art">${device.artwork
            ? `<img src="${escapeHtml(device.artwork.file)}" alt="" width="40" height="40" loading="lazy">`
            : ''}</td>
<td class="model"><a href="${escapeHtml(device.id)}.html">${escapeHtml(device.model)}</a>${
            device.rebadge_of ? ' <span class="rebadge" title="Rebadge of another device">rebadge</span>' : ''}</td>
<td class="family">${!device.protocol?.family ? '<span class="muted">unknown</span>'
            : documented.has(device.protocol.family)
                ? `<a href="${escapeHtml(device.protocol.family)}.html"><code>${escapeHtml(device.protocol.family)}</code></a>`
                : `<code>${escapeHtml(device.protocol.family)}</code>`}</td>
<td class="num">${width}</td>
<td class="num">${device.print?.dpi ? `${device.print.dpi}<span class="unit">dpi</span>` : ''}</td>
<td class="support">${projects || '<span class="muted">none recorded</span>'}</td>
<td class="status"><span class="dot dot-${escapeHtml(device.status ?? 'unverified')}" title="${escapeHtml(humanise(device.status ?? 'unverified'))}"></span></td>
</tr>`;
    }).join('\n');

    // Every family present in the data, documented or not — a device whose
    // family has no page still deserves a filter chip.
    const familySlugs = [...new Set(devices.map(d => d.protocol?.family).filter(Boolean))].sort();

    const body = `<div class="hero">
<h1>Table of Hardware</h1>
<p class="lede">Thermal label printers: protocols, specifications, and free and open source
software support. ${devices.length} device${devices.length === 1 ? '' : 's'} catalogued.
<a href="contributing.html">How to add one.</a></p>
</div>

<div class="controls">
<label class="search">
  <span class="visually-hidden">Search printers</span>
  <input type="search" id="filter" placeholder="Search brand, model, protocol, or the name it advertises…" autocomplete="off">
</label>
<div class="chips" id="families">
  <button type="button" class="chip is-on" data-family="">All</button>
  ${familySlugs.map(f => `<button type="button" class="chip" data-family="${escapeHtml(f)}"><code>${escapeHtml(f)}</code></button>`).join('\n  ')}
</div>
</div>

<table class="toh" id="toh">
<thead>
<tr>
<th scope="col">Brand</th>
<th scope="col"><span class="visually-hidden">Artwork</span></th>
<th scope="col">Model</th>
<th scope="col">Protocol</th>
<th scope="col">Width</th>
<th scope="col">Res.</th>
<th scope="col">Supported by</th>
<th scope="col"><span class="visually-hidden">Confidence</span></th>
</tr>
</thead>
<tbody>
${rows}
</tbody>
</table>

<p class="count" id="count" hidden></p>

<aside class="legend">
<h2>Reading this table</h2>
<dl>
<dt><span class="dot dot-verified"></span> Verified</dt><dd>Someone printed from it, or captured its traffic.</dd>
<dt><span class="dot dot-reported"></span> Reported</dt><dd>Credible second-hand account.</dd>
<dt><span class="dot dot-unverified"></span> Unverified</dt><dd>Transcribed from a catalogue, or inferred.</dd>
</dl>
<p>Devices sharing a <strong>protocol</strong> are driven by the same code. Linked protocols
have a page documenting the wire format. A row marked <span class="rebadge">rebadge</span>
is the same hardware as another entry under a different name.</p>
</aside>

<script>
${FILTER_SCRIPT}
</script>`;

    return page({
        title: 'Table of Hardware — OpenTLP',
        description: 'A community database of thermal label printers: protocols, specifications, and free and open source software support.',
        body,
        active: 'table'
    });
}

/**
 * Filtering, kept small and dependency-free.
 *
 * The family filter also reads from the URL fragment so a device page can link
 * to "everything else that speaks this protocol".
 */
const FILTER_SCRIPT = `
(function () {
  var rows = Array.prototype.slice.call(document.querySelectorAll('#toh tbody tr'));
  var search = document.getElementById('filter');
  var chips = document.getElementById('families');
  var count = document.getElementById('count');
  var family = '';

  function apply() {
    var term = search.value.trim().toLowerCase();
    var shown = 0;
    rows.forEach(function (row) {
      var ok = (!term || row.dataset.search.indexOf(term) !== -1) &&
               (!family || row.dataset.family === family);
      row.hidden = !ok;
      if (ok) shown++;
    });
    count.hidden = shown === rows.length;
    count.textContent = shown + ' of ' + rows.length + ' devices';
  }

  search.addEventListener('input', apply);

  chips.addEventListener('click', function (event) {
    var chip = event.target.closest('.chip');
    if (!chip) return;
    family = chip.dataset.family;
    Array.prototype.forEach.call(chips.children, function (c) {
      c.classList.toggle('is-on', c === chip);
    });
    apply();
  });

  var match = /family=([^&]+)/.exec(location.hash);
  if (match) {
    var wanted = decodeURIComponent(match[1]);
    var chip = chips.querySelector('[data-family="' + wanted.replace(/"/g, '') + '"]');
    if (chip) chip.click();
  }
})();
`;
