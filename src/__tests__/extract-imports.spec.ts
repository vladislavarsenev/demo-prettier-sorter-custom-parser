import { describe, expect, it } from 'vitest';
import { extractImports } from '../extract-imports';

describe('extract-imports.ts', () => {
	it('should extract default import', () => {
		expect(extractImports("import module from 'file'")).toEqual({
			positionRanges: [{ startLoc: 0, endLoc: 25 }],
			imports: [
				{
					text: "import module from 'file'",
					hasDefaultImport: true,
					hasNamedImports: false,
					hasNamespaceImport: false,
					hasSideEffectImport: false,
					from: 'file',
				},
			],
		});
	});

	it('should extract namespace import', () => {
		expect(extractImports("import * as module from 'file'")).toEqual({
			positionRanges: [{ startLoc: 0, endLoc: 30 }],
			imports: [
				{
					text: "import * as module from 'file'",
					hasDefaultImport: false,
					hasNamedImports: false,
					hasNamespaceImport: true,
					hasSideEffectImport: false,
					from: 'file',
				},
			],
		});
	});

	it('should extract named imports', () => {
		const source = `import { module } from 'file'

const x = 5
    `;

		expect(extractImports(source)).toEqual({
			positionRanges: [{ startLoc: 0, endLoc: 30 }],
			imports: [
				{
					text: "import { <NAMED_IMPORT_PLACEHOLDER> } from 'file'\n",
					hasDefaultImport: false,
					hasNamedImports: true,
					hasNamespaceImport: false,
					hasSideEffectImport: false,
					namedImports: [{ name: 'module', text: 'module' }],
					from: 'file',
				},
			],
		});
	});

	it('should extract multiline named imports', () => {
		const source = `import {\n\tmodule,\n\tanother\n} from 'file'`;

		expect(extractImports(source)).toEqual({
			positionRanges: [{ startLoc: 0, endLoc: 40 }],
			imports: [
				{
					text: "import {\n\t<NAMED_IMPORT_PLACEHOLDER>\n} from 'file'",
					hasDefaultImport: false,
					hasNamedImports: true,
					hasNamespaceImport: false,
					hasSideEffectImport: false,
					namedImports: [
						{ name: 'module', text: 'module' },
						{ name: 'another', text: '\n\tanother' },
					],
					from: 'file',
				},
			],
		});
	});

	it('should extract one line multiple imports', () => {
		const source = `import { module } from 'file';;;;;; import { another } from 'another'`;

		expect(extractImports(source)).toEqual({
			positionRanges: [{ startLoc: 0, endLoc: 69 }],
			imports: [
				{
					text: "import { <NAMED_IMPORT_PLACEHOLDER> } from 'file';;;;;;",
					hasDefaultImport: false,
					hasNamedImports: true,
					hasNamespaceImport: false,
					hasSideEffectImport: false,
					namedImports: [{ name: 'module', text: 'module' }],
					from: 'file',
				},
				{
					prefaceText: ' ',
					text: "import { <NAMED_IMPORT_PLACEHOLDER> } from 'another'",
					hasDefaultImport: false,
					hasNamedImports: true,
					hasNamespaceImport: false,
					hasSideEffectImport: false,
					namedImports: [{ name: 'another', text: 'another' }],
					from: 'another',
				},
			],
		});
	});

	it('should extract multiple with reduntant semicolons', () => {
		const source = `    import { module } from 'file';;;;`;

		expect(extractImports(source)).toEqual({
			positionRanges: [{ startLoc: 0, endLoc: 37 }],
			imports: [
				{
					prefaceText: '    ',
					text: "import { <NAMED_IMPORT_PLACEHOLDER> } from 'file';;;;",
					hasDefaultImport: false,
					hasNamedImports: true,
					hasNamespaceImport: false,
					hasSideEffectImport: false,
					namedImports: [{ name: 'module', text: 'module' }],
					from: 'file',
				},
			],
		});
	});

	it('should extract multiple imports with directive in the beggining', () => {
		const source = `"use client"
import { module } from 'file'`;

		expect(extractImports(source)).toEqual({
			positionRanges: [{ startLoc: 13, endLoc: 42 }],
			imports: [
				{
					text: "import { <NAMED_IMPORT_PLACEHOLDER> } from 'file'",
					hasDefaultImport: false,
					hasNamedImports: true,
					hasNamespaceImport: false,
					hasSideEffectImport: false,
					namedImports: [{ name: 'module', text: 'module' }],
					from: 'file',
				},
			],
		});
	});

	it('parses side-effect imports', () => {
		const source = `import 'file'`;

		expect(extractImports(source)).toEqual({
			positionRanges: [{ startLoc: 0, endLoc: 13 }],
			imports: [
				{
					text: "import 'file'",
					hasDefaultImport: false,
					hasNamedImports: false,
					hasNamespaceImport: false,
					hasSideEffectImport: true,
					from: 'file',
				},
			],
		});
	});

	it('should parse correctly multiple import lines devided by some code', () => {
		const source = `
const x = 5
import { module } from 'file';

const y = 10
import test  from 'moo'

`;

		expect(extractImports(source)).toEqual({
			positionRanges: [
				{ startLoc: 13, endLoc: 44 },
				{ startLoc: 58, endLoc: 82 },
			],
			imports: [
				{
					text: "import { <NAMED_IMPORT_PLACEHOLDER> } from 'file';\n",
					hasDefaultImport: false,
					hasNamedImports: true,
					hasNamespaceImport: false,
					hasSideEffectImport: false,
					namedImports: [{ name: 'module', text: 'module' }],
					from: 'file',
				},
				{
					text: "import test  from 'moo'\n",
					hasDefaultImport: true,
					hasNamedImports: false,
					hasNamespaceImport: false,
					hasSideEffectImport: false,
					from: 'moo',
				},
			],
		});
	});
});
