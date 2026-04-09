#!/usr/bin/env node

import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sortby from '@does/sortby';
import { aliases } from '../aliases.js';

const TITLE = '## aliases';
const __dirname = dirname(fileURLToPath(import.meta.url));

(async () => {
	const file = join(__dirname, '../README.md');
	const readme = (await readFile(file)).toString();
	const content = readme.split(TITLE).shift();

	await writeFile(
		file,
		[
			content.trim(),
			'',
			TITLE,
			'',
			'| alias | Description',
			'| - | -',
			...sortby(aliases({ base: '<BASE_BRANCH>' }), 'key').map(({key, desc}) => `| ${key} | ${desc}`),
			'',
		].join('\n'),
	);
})();
