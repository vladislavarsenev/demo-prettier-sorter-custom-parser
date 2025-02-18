import { describe, expect, it } from 'vitest';
import { groupImports } from '../group-imports';

const createDefaultImport = (from: string) => ({
	from,
	hasSideEffectImport: false,
	hasNamespaceImport: false,
	hasDefaultImport: true,
	hasNamedImports: false,
	text: '',
});

describe('groupImports', () => {
	it('should group imports by group', () => {
		const import1 = createDefaultImport('@app/test');

		const import2 = createDefaultImport('@server/test2');

		const import3 = createDefaultImport('@app/test2');

		expect(
			groupImports([import1, import2, import3], {
				importOrder: ['^@app', '^@server'],
			}),
		).toEqual([[import1, import3], [import2]]);
	});

	it('should group with not matched import', () => {
		const import1 = createDefaultImport('@app/test');

		const import2 = createDefaultImport('react');

		const import3 = createDefaultImport('@server/test2');

		const import4 = createDefaultImport('react2');

		const import5 = createDefaultImport('./local-module');

		expect(
			groupImports([import1, import2, import3, import4, import5], {
				importOrder: ['^@app', '^@server'],
			}),
		).toEqual([[import2, import4], [import1], [import3], [import5]]);
	});

	it('should place third party libraries at custom place', () => {
		const import1 = createDefaultImport('react');

		const import2 = createDefaultImport('@app/test');

		const import3 = createDefaultImport('react2');

		const import4 = createDefaultImport('../test');

		expect(
			groupImports([import1, import2, import3, import4], {
				importOrder: ['^@app', '<THIRD_PARTY_MODULES>'],
			}),
		).toEqual([[import2], [import1, import3], [import4]]);
	});
});
