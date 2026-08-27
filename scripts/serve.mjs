/**
 * Serve `site/` locally, so a contributor can see a page before opening a pull
 * request.
 *
 * Deliberately dependency-free and deliberately not a production server: no
 * caching, no compression, no directory listing.
 *
 * `npm start`
 */

import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, normalize, extname } from 'node:path';
import { SITE_DIR } from './lib/load.mjs';

const PORT = Number(process.env.PORT ?? 4173);

const TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.webp': 'image/webp'
};

createServer(async (request, response) => {
    const url = new URL(request.url, 'http://localhost');
    let path = decodeURIComponent(url.pathname);
    if (path.endsWith('/')) path += 'index.html';
    // Everything is flat, and a request must not escape the output directory.
    if (!extname(path)) path += '.html';

    const file = join(SITE_DIR, normalize(path).replace(/^([/\\]|\.\.)+/, ''));
    if (!file.startsWith(SITE_DIR)) {
        response.writeHead(403).end('Forbidden');
        return;
    }

    try {
        const body = await readFile(file);
        response.writeHead(200, {
            'content-type': TYPES[extname(file)] ?? 'application/octet-stream',
            'cache-control': 'no-store'
        }).end(body);
    } catch {
        response.writeHead(404, { 'content-type': 'text/plain' })
            .end(`Not found: ${path}\n\nHas the site been built? Run \`npm run build\`.`);
    }
}).listen(PORT, () => {
    console.log(`OpenTLP on http://localhost:${PORT}/`);
});
