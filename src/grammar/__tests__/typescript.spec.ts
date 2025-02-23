import { Grammar, Parser } from 'nearley';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

import typescriptGrammar from '../typescript';

describe('typescript grammar', () => {
	it('should parse a simple import', async () => {
		const source = await readFile(join(__dirname, 'sample.ts'), 'utf-8');
		const parser = new Parser(Grammar.fromCompiled(typescriptGrammar));
		const result = parser.feed(source);

		expect(result.results.length).toBe(1);
		expect(result.results[0]).toMatchSnapshot();
	});
});
