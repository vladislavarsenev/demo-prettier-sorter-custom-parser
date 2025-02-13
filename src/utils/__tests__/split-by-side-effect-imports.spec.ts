import { describe, expect, it } from 'vitest';
import { splitBySideEffectImports } from '../split-by-side-effect-imports';

describe('splitBySideEffectImports', () => {
	it('should split the imports by side effect imports', () => {
		const imports = [{ from: 'react', leadingComments: [] }];

		const result = splitBySideEffectImports(imports);

		expect(result).toEqual([imports]);
	});

	it('should split the imports by side effect imports', () => {
		const imports = [
			{ from: 'react1', leadingComments: [] },
			{ from: 'react2', leadingComments: [] },
		];

		const result = splitBySideEffectImports(imports);

		expect(result).toEqual([
			[{ from: 'react1', leadingComments: [] }],
			[{ from: 'react2', leadingComments: [] }],
		]);
	});

	it('should split common imports by side effect imports', () => {
		const import1 = { from: 'test1', leadingComments: [] };
		const import2 = {
			from: 'a',
			defaultImport: 'module1',
			leadingComments: [],
		};
		const import3 = {
			from: 'b',
			defaultImport: 'module2',
			leadingComments: [],
		};
		const import4 = {
			from: 'c',
			defaultImport: 'module3',
			leadingComments: [],
		};

		const imports = [import2, import3, import1, import4];

		const result = splitBySideEffectImports(imports);

		expect(result).toEqual([
			[
				{ from: 'a', defaultImport: 'module1', leadingComments: [] },
				{ from: 'b', defaultImport: 'module2', leadingComments: [] },
			],
			[{ from: 'test1', leadingComments: [] }],
			[{ from: 'c', defaultImport: 'module3', leadingComments: [] }],
		]);
	});
});
