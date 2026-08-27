/**
 * Sanitising contributed SVG artwork.
 *
 * Device illustrations arrive from strangers through pull requests and are
 * inlined into pages, which makes them executable content unless something
 * stops them. An `<svg>` may carry `<script>`, `on*` handlers, `javascript:`
 * URLs, `<foreignObject>` with arbitrary HTML, and external references that
 * phone home when the page loads.
 *
 * Review is not a sufficient defence — the payload can be one attribute in a
 * two-thousand-line path file. So every SVG is stripped at build time, on an
 * allowlist, and what survives is inert markup.
 *
 * Deliberately a whole-string transform with no DOM: the build has no parser
 * dependency, and a regex allowlist that occasionally removes something
 * harmless is the right trade against a parser that occasionally admits
 * something harmful.
 */

/** Elements that draw, and nothing else. Anything unlisted is removed entirely. */
const ALLOWED_ELEMENTS = new Set([
    'svg', 'g', 'defs', 'symbol', 'use', 'title', 'desc', 'style',
    'path', 'rect', 'circle', 'ellipse', 'line', 'polyline', 'polygon',
    'text', 'tspan',
    'linearGradient', 'radialGradient', 'stop', 'clipPath', 'mask', 'pattern'
]);

/** Attributes that are safe on any allowed element. */
const ALLOWED_ATTRIBUTES = new Set([
    'id', 'class', 'd', 'x', 'y', 'x1', 'y1', 'x2', 'y2', 'cx', 'cy', 'r', 'rx', 'ry',
    'width', 'height', 'viewBox', 'preserveAspectRatio', 'points', 'transform',
    'fill', 'fill-opacity', 'fill-rule', 'clip-rule', 'clip-path', 'mask',
    'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'stroke-dasharray',
    'stroke-dashoffset', 'stroke-opacity', 'stroke-miterlimit',
    'opacity', 'offset', 'stop-color', 'stop-opacity', 'gradientUnits',
    'gradientTransform', 'patternUnits', 'clipPathUnits', 'maskUnits', 'maskContentUnits',
    'font-family', 'font-size', 'font-weight', 'text-anchor', 'dominant-baseline',
    'xmlns', 'xmlns:xlink', 'version', 'role', 'aria-label', 'aria-hidden'
]);

/**
 * @param {string} raw
 * @returns {{ svg: string, removed: string[] }} the cleaned markup, and a note
 *   of every construct dropped so the build can report it rather than silently
 *   changing what a contributor submitted.
 */
export function sanitiseSvg(raw) {
    const removed = [];
    let svg = raw;

    // Comments first: they can hide markup from the passes below, and an SVG
    // exported from a drawing tool carries kilobytes of editor metadata anyway.
    svg = svg.replace(/<!--[\s\S]*?-->/g, '');
    svg = svg.replace(/<\?xml[\s\S]*?\?>/g, '');
    svg = svg.replace(/<!DOCTYPE[\s\S]*?>/gi, '');

    // Whole elements whose *content* is the danger, so the content goes too.
    svg = replaceAndCount(svg, /<script\b[\s\S]*?<\/script\s*>/gi, 'script', removed);
    svg = replaceAndCount(svg, /<foreignObject\b[\s\S]*?<\/foreignObject\s*>/gi, 'foreignObject', removed);
    svg = replaceAndCount(svg, /<(animate|animateTransform|animateMotion|set)\b[^>]*\/?>/gi, 'animation', removed);
    svg = replaceAndCount(svg, /<(image|iframe|embed|object|audio|video|link|meta)\b[^>]*\/?>/gi, 'external content', removed);

    // Then every remaining tag, filtered on the allowlist.
    svg = svg.replace(/<(\/?)([A-Za-z][\w:.-]*)((?:[^>"']|"[^"]*"|'[^']*')*)>/g,
        (match, slash, name, attributes) => {
            if (!ALLOWED_ELEMENTS.has(name)) {
                note(removed, `<${name}>`);
                return '';
            }
            if (slash) return `</${name}>`;

            // Self-closing must survive. Inlined into HTML these are parsed as
            // foreign content, where `<rect …>` without the slash stays open and
            // swallows every sibling that follows it.
            const selfClosing = /\/\s*$/.test(attributes);
            return `<${name}${cleanAttributes(attributes, removed)}${selfClosing ? '/' : ''}>`;
        });

    // A `<` inside a `<style>` block silently kills every rule that follows it,
    // so an injected stylesheet must not contain one. Cheaper to drop the
    // element than to reason about what a partially-parsed stylesheet does.
    svg = svg.replace(/<style\b[^>]*>([\s\S]*?)<\/style\s*>/gi, (match, css) => {
        if (/[<]/.test(css) || /@import|url\s*\(|expression\s*\(/i.test(css)) {
            note(removed, '<style> with unsafe content');
            return '';
        }
        return match;
    });

    return { svg: svg.trim(), removed };
}

function cleanAttributes(attributes, removed) {
    let out = '';
    const pattern = /([A-Za-z_:][\w:.-]*)\s*=\s*("([^"]*)"|'([^']*)'|([^\s"'>]+))/g;

    for (const [, name, , doubleQuoted, singleQuoted, bare] of attributes.matchAll(pattern)) {
        const value = doubleQuoted ?? singleQuoted ?? bare ?? '';
        const lower = name.toLowerCase();

        if (lower.startsWith('on')) { note(removed, `${name}= handler`); continue; }

        // `data-*` is inert and load-bearing: artwork that scopes its own
        // `<style>` block with `[data-printer="…"]` depends on it, and without
        // that scoping one drawing's rules would restyle every other drawing on
        // the page. Stripping it would leave the markup valid and the picture
        // wrong, which is the worst failure mode available here.
        if (!ALLOWED_ATTRIBUTES.has(name) && !lower.startsWith('data-')) {
            note(removed, `${name}=`);
            continue;
        }

        // Even allowed attributes can carry a URL. Only same-document
        // references survive; anything that would reach the network does not.
        if (/^(javascript|data|vbscript):/i.test(value.trim()) ||
            (/url\s*\(/i.test(value) && !/url\s*\(\s*['"]?#/i.test(value))) {
            note(removed, `${name}= external reference`);
            continue;
        }

        out += ` ${name}="${value.replace(/"/g, '&quot;')}"`;
    }
    return out;
}

function replaceAndCount(text, pattern, label, removed) {
    const result = text.replace(pattern, () => { note(removed, label); return ''; });
    return result;
}

function note(removed, what) {
    if (!removed.includes(what)) removed.push(what);
}
