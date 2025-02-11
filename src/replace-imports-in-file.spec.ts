import { describe, expect, test } from 'vitest';
import { replaceSourceImports } from './replace-source-imports';

describe('replace-imports-in-file', () => {
	test('replaces imports in a file', () => {
		const source = `import { ImportItem } from "./type";`;
		const replacedSource = replaceSourceImports(
			source,
			[
				{
					defaultImport: 'b',
					from: 'a',
					namedImports: [],
					namespaceImport: undefined,
				},
			],
			0,
			36,
		);

		expect(replacedSource).toEqual(`import b from "a"`);
	});

	test('replaces imports in a file with multiple imports', () => {
		const source = `import { ImportItem } from "./type";`;
		const replacedSource = replaceSourceImports(
			source,
			[
				{
					defaultImport: 'b',
					from: 'a',
					namedImports: [],
					namespaceImport: undefined,
				},
				{
					defaultImport: 'd',
					from: 'c',
					namedImports: [],
					namespaceImport: undefined,
				},
			],
			0,
			36,
		);

		expect(replacedSource).toEqual(`import b from "a"
import d from "c"`);
	});

	test('replace import with directive and other code', () => {
		const source = `"use client"
import { ImportItem } from "./type";
import { stringifyImports } from "./stringify-imports";

const x = 1;
`;
		const replacedSource = replaceSourceImports(
			source,
			[
				{
					defaultImport: 'b',
					from: 'a',
					namedImports: [],
					namespaceImport: undefined,
				},
			],
			13,
			105,
		);

		expect(replacedSource).toEqual(`"use client"
import b from "a"

const x = 1;
`);
	});
});
