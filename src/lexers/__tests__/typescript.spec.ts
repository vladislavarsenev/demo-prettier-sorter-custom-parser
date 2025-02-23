import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

import { getLexer } from '../typescript';

describe('Typescript Lexer', () => {
	it('should lex a simple import', async () => {
		const fileSample = await readFile(
			join(__dirname, 'sample.ts'),
			'utf-8',
		);

		const lexer = getLexer();
		lexer.reset(fileSample);

		const tokens = [...lexer].map((el) => ({
			value: el.value,
			type: el.type,
			line: el.line,
			col: el.col,
		}));

		expect(tokens).toMatchSnapshot();
	});
});
