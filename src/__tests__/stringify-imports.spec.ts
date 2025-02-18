import { describe, expect, it, test } from 'vitest';
import { stringifyImports } from '../stringify-imports';

describe('stringify-imports', () => {
	test('stringify default imports', () => {
		expect(
			stringifyImports([
				[
					{
						hasDefaultImport: true,
						from: 'aFile',
						hasNamedImports: false,
						hasNamespaceImport: false,
						hasSideEffectImport: false,
						text: 'import A from "aFile"',
					},
				],
			]),
		).toEqual(`import A from "aFile"`);
	});

	test('stringify namespace imports', () => {
		expect(
			stringifyImports([
				[
					{
						hasDefaultImport: false,
						from: 'aFile',
						hasNamedImports: false,
						hasNamespaceImport: true,
						hasSideEffectImport: false,
						text: 'import * as A from "aFile"',
					},
				],
			]),
		).toEqual(`import * as A from "aFile"`);
	});

	test('stringify named imports', () => {
		expect(
			stringifyImports([
				[
					{
						hasDefaultImport: false,
						from: 'aFile',
						hasNamedImports: true,
						hasNamespaceImport: false,
						hasSideEffectImport: false,
						text: 'import { B as A } from "aFile"',
					},
				],
			]),
		).toEqual(`import { B as A } from "aFile"`);
	});

	test('stringify many named imports', () => {
		expect(
			stringifyImports([
				[
					{
						hasDefaultImport: false,
						from: 'aFile',
						hasNamedImports: true,
						hasNamespaceImport: false,
						hasSideEffectImport: false,
						text: 'import { <NAMED_IMPORT_PLACEHOLDER> } from "aFile"',
						namedImports: [
							{
								alias: 'A',
								name: 'B',
								text: 'B as A',
							},
							{
								alias: '',
								name: 'C',
								text: 'C',
							},
						],
					},
				],
			]),
		).toEqual(`import { B as A, C } from "aFile"`);
	});

	test('stringify all imports', () => {
		expect(
			stringifyImports([
				[
					{
						hasDefaultImport: true,
						from: 'aFile',
						hasNamedImports: true,
						hasNamespaceImport: false,
						hasSideEffectImport: false,
						text: 'import A, { <NAMED_IMPORT_PLACEHOLDER> } from "aFile"',
						namedImports: [
							{
								alias: 'B',
								name: 'C',
								text: 'C as B',
							},
							{
								name: 'D',
								text: 'D',
							},
						],
					},
				],
			]),
		).toEqual(`import A, { C as B, D } from "aFile"`);
	});

	it('stringifies side effect import', () => {
		expect(
			stringifyImports([
				[
					{
						hasDefaultImport: false,
						from: 'aFile',
						hasNamedImports: false,
						hasNamespaceImport: false,
						hasSideEffectImport: true,
						text: 'import "aFile"',
					},
				],
			]),
		).toEqual(`import "aFile"`);
	});

	it('stringify import with leading comment', () => {
		expect(
			stringifyImports([
				[
					{
						hasDefaultImport: false,
						from: 'aFile',
						hasNamedImports: false,
						hasNamespaceImport: false,
						hasSideEffectImport: true,
						text: 'import "aFile"',
						prefaceText:
							'/* leading comment */\n//second comment\n',
					},
				],
			]),
		).toEqual(`/* leading comment */
//second comment
import "aFile"`);
	});

	it('stringify groups with import order separation', () => {
		expect(
			stringifyImports(
				[
					[
						{
							hasDefaultImport: false,
							from: 'aFile',
							hasNamedImports: false,
							hasNamespaceImport: false,
							hasSideEffectImport: true,
							text: 'import "aFile"',
							prefaceText: '',
						},
					],
					[
						{
							hasDefaultImport: false,
							from: 'bFile',
							hasNamedImports: false,
							hasNamespaceImport: false,
							hasSideEffectImport: true,
							text: 'import "bFile"',
							prefaceText: '',
						},
					],
				],
				{
					importOrderSeparation: true,
				},
			),
		).toEqual(`import "aFile"
import "bFile"`);
	});

	it('stringifies import attributes', () => {
		expect(
			stringifyImports([
				[
					{
						hasDefaultImport: false,
						from: 'aFile',
						hasNamedImports: false,
						hasNamespaceImport: false,
						hasSideEffectImport: true,
						text: 'import "aFile" with { name: "test" }',
					},
				],
			]),
		).toEqual(`import "aFile" with { name: "test" }`);
	});

	it('stringifies glued imports', () => {
		expect(
			stringifyImports([
				[
					{
						hasDefaultImport: false,
						from: 'aFile',
						hasNamedImports: false,
						hasNamespaceImport: false,
						hasSideEffectImport: true,
						text: 'import "aFile"',
						prefaceText: '',
					},
					{
						hasDefaultImport: false,
						from: 'bFile',
						hasNamedImports: false,
						hasNamespaceImport: false,
						hasSideEffectImport: true,
						text: 'import "bFile"',
						prefaceText: '',
					},
				],
			]),
		).toEqual(`import "aFile";import "bFile"`);
	});

	it('should not separate imports with semicolon', () => {
		expect(
			stringifyImports([
				[
					{
						hasDefaultImport: false,
						from: 'aFile',
						hasNamedImports: false,
						hasNamespaceImport: false,
						hasSideEffectImport: true,
						text: 'import "aFile";',
					},
					{
						hasDefaultImport: false,
						from: 'bFile',
						hasNamedImports: false,
						hasNamespaceImport: false,
						hasSideEffectImport: true,
						text: 'import "bFile";',
					},
				],
			]),
		).toEqual(`import "aFile";import "bFile";`);
	});
});
