import { describe, expect, test } from 'vitest';
import { sortImports } from '../sort-imports';

const createImport = (args: { defaultImport?: string; from: string }) => ({
	defaultImport: args.defaultImport ?? 'specifier',
	from: args.from,
	namespaceImport: undefined,
	leadingComments: [],
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
		const import1 = {
			from: 'test',
			namedImports: [
				{ name: 'a', alias: 'z' },
				{ name: 'b', alias: undefined },
				{ name: 'c', alias: 'x' },
			],
		};
		const import2 = {
			from: 'test2',
			namedImports: [
				{ name: 'c', alias: undefined },
				{ name: 'a', alias: undefined },
				{ name: 'b', alias: undefined },
			],
		};

		expect(
			sortImports([import2, import1], {
				importOrderSortSpecifiers: true,
			}),
		).toEqual([
			{
				from: 'test',
				namedImports: [
					{ name: 'b', alias: undefined },
					{ name: 'c', alias: 'x' },
					{ name: 'a', alias: 'z' },
				],
			},
			{
				from: 'test2',
				namedImports: [
					{ name: 'a', alias: undefined },
					{ name: 'b', alias: undefined },
					{ name: 'c', alias: undefined },
				],
			},
		]);
	});
});
