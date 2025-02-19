import { describe, expect, it } from 'vitest';
import { splitBySideEffectImports } from '../split-by-side-effect-imports';

const createSideEffectImportItem = (from: string) => {
	return {
		from,
		hasSideEffectImport: true,
		hasNamespaceImport: false,
		hasDefaultImport: false,
		hasNamedImports: false,
		text: '',
	};
};

const createDefaultImportItem = (from: string) => {
	return {
		from,
		hasSideEffectImport: false,
		hasNamespaceImport: false,
		hasDefaultImport: true,
		hasNamedImports: false,
		text: '',
	};
};

describe('splitBySideEffectImports', () => {
	it('should split the imports by side effect imports', () => {
		const imports = [createSideEffectImportItem('react')];

		const result = splitBySideEffectImports([imports], {
			enabled: true,
		});

		expect(result).toEqual([imports]);
	});

	it('should split the imports by side effect imports', () => {
		const import1 = createSideEffectImportItem('react1');
		const import2 = createSideEffectImportItem('react2');

		const result = splitBySideEffectImports([[import1, import2]], {
			enabled: true,
		});

		expect(result).toEqual([[import1, import2]]);
	});

	it('should split common imports by side effect imports', () => {
		const import1 = createSideEffectImportItem('test1');
		const import2 = createDefaultImportItem('a');
		const import3 = createDefaultImportItem('b');
		const import4 = createDefaultImportItem('c');

		const imports = [import2, import3, import1, import4];

		const result = splitBySideEffectImports([imports], {
			enabled: true,
		});

		expect(result).toEqual([[import2, import3], [import1], [import4]]);
	});

	it('should group side effect imports with other imports', () => {
		const firstImport = createSideEffectImportItem('react');
		const secondImport = createDefaultImportItem('react-dom');

		const thirdImport = createDefaultImportItem('react-router-dom');
		const fourthImport = createSideEffectImportItem('react-router-dom');

		const result = splitBySideEffectImports(
			[
				[firstImport, secondImport],
				[thirdImport, fourthImport],
			],
			{
				enabled: true,
			},
		);

		expect(result).toEqual([
			[firstImport],
			[secondImport],
			[thirdImport],
			[fourthImport],
		]);
	});
});
