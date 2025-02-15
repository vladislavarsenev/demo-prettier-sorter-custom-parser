import { describe, expect, it, test } from 'vitest';
import { stringifyImports } from '../stringify-imports';

describe('stringify-imports', () => {
	test('stringify default imports', () => {
		expect(
			stringifyImports([
				[
					{
						defaultImport: 'A',
						from: 'aFile',
						namedImports: [],
						namespaceImport: undefined,
						leadingComments: [],
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
						defaultImport: '',
						from: 'aFile',
						namedImports: [],
						namespaceImport: 'A',
						leadingComments: [],
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
						defaultImport: '',
						from: 'aFile',
						namedImports: [
							{
								alias: 'A',
								name: 'B',
							},
						],
						namespaceImport: undefined,
						leadingComments: [],
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
						defaultImport: '',
						from: 'aFile',
						namedImports: [
							{
								alias: 'A',
								name: 'B',
							},
							{
								alias: '',
								name: 'C',
							},
						],
						namespaceImport: undefined,
						leadingComments: [],
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
						defaultImport: 'A',
						from: 'aFile',
						namedImports: [
							{
								alias: 'B',
								name: 'C',
							},
							{
								alias: '',
								name: 'D',
							},
						],
						leadingComments: [],
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
						from: 'aFile',
						leadingComments: [],
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
						from: 'aFile',
						leadingComments: [
							'/* leading comment */',
							'//second comment',
						],
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
							from: 'aFile',
							leadingComments: [],
						},
					],
					[
						{
							from: 'bFile',
							leadingComments: [],
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
});
