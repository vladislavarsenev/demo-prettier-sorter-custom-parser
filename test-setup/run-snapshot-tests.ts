import { lstatSync, readFileSync, readdirSync } from 'node:fs';
import { extname } from 'node:path';
import prettier from 'prettier';
import { expect, test } from 'vitest';
import Plugin from '../src';

const format = (code: string) =>
	prettier.format(code, {
		parser: 'typescript',
		plugins: [Plugin],
		importOrderSeparation: true,
		importOrder: ['^@core/(.*)$', '^@server/(.*)', '^@ui/(.*)$', '^[./]'],
	});

export const runSnapshotTests = (dirname: string) => {
	readdirSync(dirname).forEach((filename) => {
		const path = dirname + '/' + filename;
		const isTargetFile =
			extname(filename) !== '.snap' &&
			lstatSync(path).isFile() &&
			filename[0] !== '.' &&
			filename !== 'ppsi.spec.ts';

		if (!isTargetFile) return;
		const source = readFileSync(path, 'utf8').replace(/\r\n/g, '\n');

		test.only(filename, async () => {
			const output = await format(source);

			expect(source + '~'.repeat(80) + '\n' + output).toMatchSnapshot();
		});
	});
};
