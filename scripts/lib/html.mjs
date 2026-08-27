/**
 * The page shell and the small formatting helpers the generator needs.
 *
 * Deliberately plain: no framework, no build step, no client-side routing. The
 * site is a table and some documents, and it should still work in ten years
 * with JavaScript switched off — the search box is the only scripted part, and
 * the table is fully rendered without it.
 */

const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

/** @param {unknown} value */
export const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, c => ESCAPES[c]);

/** Title case for a slug, for headings generated from keys. */
export const humanise = slug =>
    String(slug).replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

/**
 * Wrap body content in the site chrome.
 *
 * `depth` is how many directories deep the page sits, so the stylesheet link
 * resolves whether the site is served from a domain root or a subdirectory.
 */
export function page({ title, description = '', body, active = '' }) {
    return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
${description ? `<meta name="description" content="${escapeHtml(description)}">\n` : ''}<link rel="stylesheet" href="style.css">
</head>
<body>
<header class="site">
  <a class="wordmark" href="index.html">OpenTLP</a>
  <nav>
    <a href="index.html"${active === 'table' ? ' aria-current="page"' : ''}>Table of Hardware</a>
    <a href="devices.json">JSON</a>
    <a href="contributing.html"${active === 'contributing' ? ' aria-current="page"' : ''}>Contribute</a>
    <a href="about.html"${active === 'about' ? ' aria-current="page"' : ''}>About</a>
  </nav>
</header>
<main>
${body}
</main>
<footer class="site">
  <p>Device data is <a href="https://creativecommons.org/publicdomain/zero/1.0/">CC0-1.0</a> — public domain.
     Site code is MIT. Linked sources keep their own terms.</p>
</footer>
</body>
</html>
`;
}

/** A definition table, skipping rows whose value is empty. */
export function specTable(rows) {
    const present = rows.filter(([, value]) => value !== undefined && value !== null && value !== '');
    if (!present.length) return '';
    return `<table class="spec">
<tbody>
${present.map(([label, value]) => `<tr><th scope="row">${escapeHtml(label)}</th><td>${value}</td></tr>`).join('\n')}
</tbody>
</table>`;
}

/** `<code>` for machine values — UUIDs, hex, package names. */
export const mono = value => `<code>${escapeHtml(value)}</code>`;
