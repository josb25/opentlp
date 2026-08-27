/**
 * Where this site lives, and where its source does.
 *
 * One place, because these strings otherwise scatter across the generator and
 * the first move breaks a link nobody notices. Read from `data/site.json` so
 * changing the host is a data edit rather than a code one.
 */

import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ROOT } from './load.mjs';

const config = JSON.parse(await readFile(join(ROOT, 'data/site.json'), 'utf8'));

/** Public base URL, without a trailing slash. */
export const SITE_URL = config.url.replace(/\/+$/, '');

const REPO = `https://github.com/${config.owner}/${config.repo}`;

/** A file in the repository, for reading. */
export const repoFile = path => `${REPO}/blob/${config.branch}/${path}`;

/** A file in the repository, opened in GitHub's editor. */
export const editFile = path => `${REPO}/edit/${config.branch}/${path}`;

/** The repository itself. */
export const REPO_URL = REPO;
