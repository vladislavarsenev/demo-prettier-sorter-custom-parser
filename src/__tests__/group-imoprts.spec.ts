import { groupImports } from '../group-imports';
import { describe, expect, it } from 'vitest';

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

		expect(
			groupImports([import1, import2, import3, import4], {
				importOrder: ['^@app', '^@server'],
				importOrderSideEffects: true,
			}),
		).toEqual([[import1], [import3], [import2, import4]]);
	});
});
