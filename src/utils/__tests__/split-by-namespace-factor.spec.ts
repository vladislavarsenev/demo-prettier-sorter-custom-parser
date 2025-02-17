import { describe, expect, it } from 'vitest';
import { splitByNamespaceFactor } from '../split-by-namespace-factor';

describe('splitByNamespaceFactor', () => {
	it('should split imports by namespace factor', () => {
		const firstModule = {
			from: './aModule',
			defaultImport: 'A',
		};

		const secondModule = {
			from: './zModule',
			namespaceImport: '* as B',
		};

		const thirdModule = {
			from: 'aModule',
			defaultImport: 'C',
		};

		const result = splitByNamespaceFactor(
			[[firstModule, secondModule], [thirdModule]],
			{
				enabled: true,
			},
		);

		expect(result).toEqual([[secondModule], [firstModule], [thirdModule]]);
	});
});
