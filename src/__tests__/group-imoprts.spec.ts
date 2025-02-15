import { describe, expect, it } from 'vitest';
import { groupImports } from '../group-imports';

describe('groupImports', () => {
	it('should group imports by group', () => {
		const import1 = {
			from: '@app/test',
		};

		const import2 = {
			from: '@server/test2',
		};

		const import3 = {
			from: '@app/test2',
		};

		expect(
			groupImports([import1, import2, import3], {
				importOrder: ['^@app', '^@server'],
				importOrderSideEffects: true,
			}),
		).toEqual([[import1, import3], [import2]]);
	});

	it('should group with not matched import', () => {
		const import1 = {
			from: '@app/test',
		};

		const import2 = {
			from: 'react',
		};

		const import3 = {
			from: '@server/test2',
		};

		const import4 = {
			from: 'react2',
		};

		const import5 = {
			from: './local-module',
		};

		expect(
			groupImports([import1, import2, import3, import4, import5], {
				importOrder: ['^@app', '^@server'],
				importOrderSideEffects: true,
			}),
		).toEqual([[import2, import4], [import1], [import3], [import5]]);
	});

	it('should place third party libraries at custom place', () => {
		const import1 = {
			from: 'react',
		};

		const import2 = {
			from: '@app/test',
		};

		const import3 = {
			from: 'react2',
		};

		const import4 = {
			from: '../test',
		};

		expect(
			groupImports([import1, import2, import3, import4], {
				importOrder: ['^@app', '<THIRD_PARTY_MODULES>'],
				importOrderSideEffects: true,
			}),
		).toEqual([[import2], [import1, import3], [import4]]);
	});
});
