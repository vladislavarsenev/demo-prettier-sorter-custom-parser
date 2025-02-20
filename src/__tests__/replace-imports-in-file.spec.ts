import { describe, expect, test } from 'vitest';

import { replaceSourceImports } from '../replace-source-imports';

describe('replace-imports-in-file', () => {
	test('replaces imports in a file', () => {
		const source = `import { ImportItem } from "./type";`;
		const replacedSource = replaceSourceImports(
			source,
			[
				[
					{
						hasDefaultImport: true,
						from: 'a',
						hasNamedImports: false,
						hasNamespaceImport: false,
						hasSideEffectImport: false,
						text: 'import b from "a"',
					},
				],
			],
			[{ startLoc: 0, endLoc: 36 }],
		);

		expect(replacedSource).toEqual(`import b from "a"`);
	});

	test('replaces imports in a file with multiple imports', () => {
		const source = `import { ImportItem } from "./type";`;
		const replacedSource = replaceSourceImports(
			source,
			[
				[
					{
						hasDefaultImport: true,
						from: 'a',
						hasNamedImports: false,
						hasNamespaceImport: false,
						hasSideEffectImport: false,
						text: 'import b from "a"\n',
					},
					{
						hasDefaultImport: true,
						from: 'c',
						hasNamedImports: false,
						hasNamespaceImport: false,
						hasSideEffectImport: false,
						text: 'import d from "c"',
					},
				],
			],
			[{ startLoc: 0, endLoc: 36 }],
		);

		expect(replacedSource).toEqual(`import b from "a"
import d from "c"`);
	});

	test('replace import with directive and other code', () => {
		const source = `"use client"
import { ImportItem } from "./type";
import { stringifyImports } from "./stringify-imports";

const x = 1;`;
		const replacedSource = replaceSourceImports(
			source,
			[
				[
					{
						hasDefaultImport: true,
						from: 'a',
						hasNamedImports: false,
						hasNamespaceImport: false,
						hasSideEffectImport: false,
						text: 'import b from "a"',
					},
				],
			],
			[{ startLoc: 13, endLoc: 106 }],
		);

		expect(replacedSource).toEqual(`"use client"

import b from "a"

const x = 1;`);
	});

	test('replace imports from different lines', () => {
		const source = `import { ImportItem } from "./type";
const x = 1;
import { stringifyImports } from "./stringify-imports";
`;

		const replacedSource = replaceSourceImports(
			source,
			[
				[
					{
						hasDefaultImport: true,
						from: 'a',
						hasNamedImports: false,
						hasNamespaceImport: false,
						hasSideEffectImport: false,
						text: 'import b from "a"',
					},
				],
			],
			[
				{ startLoc: 0, endLoc: 36 },
				{ startLoc: 50, endLoc: 106 },
			],
		);

		expect(replacedSource).toEqual(`import b from "a"

const x = 1;`);
	});
});
