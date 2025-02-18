import { describe, expect, test } from 'vitest';
import { sortImports } from '../sort-imports';

const createImport = (args: { from: string }) => ({
	from: args.from,
	hasNamespaceImport: false,
	hasDefaultImport: true,
	hasNamedImports: false,
	hasSideEffectImport: false,
	text: '',
});

const createNamedImport = (
	namedImports: { name: string; alias?: string }[],
	from: string,
) => ({
	from,
	hasNamespaceImport: false,
	hasDefaultImport: false,
	hasNamedImports: true,
	hasSideEffectImport: false,
	text: '',
	namedImports: namedImports.map(({ name, alias }) => ({
		name,
		alias,
		text: '',
	})),
});

describe('sort-imports', () => {
	test('sort import alphabetically', () => {
		const AImport = createImport({ from: 'a' });
		const BImport = createImport({ from: 'b' });

		expect(sortImports([BImport, AImport])).toEqual([AImport, BImport]);
	});

	test('sort imports case sensitive', () => {
		const first = createImport({ from: 'a' });
		const second = createImport({ from: 'A' });

		expect(
			sortImports([second, first], {
				importOrderCaseInsensitive: false,
			}),
		).toEqual([second, first]);
	});

	test('sort imports with natural sorting', () => {
		const first = createImport({ from: '10' });
		const second = createImport({ from: '2' });
		const third = createImport({ from: '11' });
		const fourth = createImport({ from: '1' });

		expect(sortImports([first, second, third, fourth])).toEqual([
			fourth,
			second,
			first,
			third,
		]);
	});

	test('sort specifiers alphabetically', () => {
		const import1 = createNamedImport(
			[
				{ name: 'a', alias: 'z' },
				{ name: 'b' },
				{ name: 'c', alias: 'x' },
			],
			'test',
		);
		const import2 = createNamedImport(
			[{ name: 'c' }, { name: 'a' }, { name: 'b' }],
			'test2',
		);

		expect(
			sortImports([import2, import1], {
				importOrderSortSpecifiers: true,
			}),
		).toEqual([
			{
				from: 'test',
				hasNamespaceImport: false,
				hasDefaultImport: false,
				hasNamedImports: true,
				hasSideEffectImport: false,
				text: '',
				namedImports: [
					{ name: 'b', alias: undefined, text: '' },
					{ name: 'c', alias: 'x', text: '' },
					{ name: 'a', alias: 'z', text: '' },
				],
			},
			{
				from: 'test2',
				hasNamespaceImport: false,
				hasDefaultImport: false,
				hasNamedImports: true,
				hasSideEffectImport: false,
				text: '',
				namedImports: [
					{ name: 'a', alias: undefined, text: '' },
					{ name: 'b', alias: undefined, text: '' },
					{ name: 'c', alias: undefined, text: '' },
				],
			},
		]);
	});
});
