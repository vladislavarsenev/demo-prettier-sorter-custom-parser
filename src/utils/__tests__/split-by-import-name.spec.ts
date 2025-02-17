import { describe, expect, it } from 'vitest';
import { splitByImportName } from '../split-by-import-name';

describe('splitByImportName', () => {
	it('should split imports by import name', () => {
		const import1 = { from: './Btest' };
		const import2 = { from: 'Btest' };
		const import3 = { from: 'Atest2' };
		const import4 = { from: './Ctest' };

		const result = splitByImportName(
			[[import1, import2, import3, import4]],
			{
				sortOrder: [],
				enabled: true,
			},
		);

		expect(result).toEqual([
			[import2, import3],
			[import1, import4],
		]);
	});

	it('should sort with predefined order', () => {
		const import1 = { from: './Btest' };
		const import2 = { from: '@a/Btest' };
		const import3 = { from: '@b/Atest2' };
		const import4 = { from: './Ctest' };

		const result = splitByImportName(
			[[import1, import2, import3, import4]],
			{
				sortOrder: ['@b', '@a'],
				enabled: true,
			},
		);

		expect(result).toEqual([[import3], [import2], [import1, import4]]);
	});
});
