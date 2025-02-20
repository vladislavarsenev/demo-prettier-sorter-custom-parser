import { lstatSync, readFileSync, readdirSync } from 'node:fs';
import { extname } from 'node:path';
import prettier from 'prettier';
import { expect, test } from 'vitest';

import Plugin from '../src';
import { PrettierOptions } from '../src/types';

const format = (code: string, options: PrettierOptions) =>
	prettier.format(code, options);

export const runSnapshotTests = (
	dirname: string,
	options?: Partial<PrettierOptions>,
) => {
	const externalPlugins = options?.plugins ?? [];
	const parser = options?.parser ?? 'typescript';

	const baseOptions = {
		parser,
		importOrderSeparation: true,
		tabWidth: 4,
		singleQuote: false,
		importOrder: ['^@core/(.*)$', '^@server/(.*)', '^@ui/(.*)$', '^[./]'],
		...(options ?? {}),
		plugins: [...externalPlugins, Plugin],
	} as PrettierOptions;

	readdirSync(dirname).forEach((filename) => {
		const path = dirname + '/' + filename;
		const isTargetFile =
			extname(filename) !== '.snap' &&
			lstatSync(path).isFile() &&
			filename[0] !== '.' &&
			filename !== 'ppsi.spec.ts';

		if (!isTargetFile) return;
		const source = readFileSync(path, 'utf8').replace(/\r\n/g, '\n');

		test(filename, async () => {
			const output = await format(source, baseOptions);

			expect(source + '~'.repeat(80) + '\n' + output).toMatchSnapshot();
		});
	});
};
