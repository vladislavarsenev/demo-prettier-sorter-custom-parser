import { describe, expect, it } from 'vitest';
import { splitByNamespaceFactor } from '../split-by-namespace-factor';

const createImportItem = (
	from: string,
	{
		hasNamespaceImport = false,
		hasDefaultImport = false,
		text = '',
	}: {
		hasNamespaceImport?: boolean;
		hasDefaultImport?: boolean;
		text?: string;
	},
) => {
	return {
		from,
		hasNamespaceImport,
		hasDefaultImport,
		hasNamedImports: false,
		hasSideEffectImport: false,
		text: '',
	};
};

describe('splitByNamespaceFactor', () => {
	it('should split imports by namespace factor', () => {
		const firstModule = createImportItem('./aModule', {
			hasDefaultImport: true,
		});

		const secondModule = createImportItem('./zModule', {
			hasNamespaceImport: true,
		});

		const thirdModule = createImportItem('./aModule', {
			hasDefaultImport: true,
		});

		const result = splitByNamespaceFactor(
			[[firstModule, secondModule], [thirdModule]],
			{
				enabled: true,
			},
		);

		expect(result).toEqual([[secondModule], [firstModule], [thirdModule]]);
	});
});
