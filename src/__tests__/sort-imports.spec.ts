import { describe, expect, test } from 'vitest';
import { sortImports } from '../sort-imports';

const createImport = (args: { defaultImport?: string; from: string }) => ({
    defaultImport: args.defaultImport ?? 'specifier',
    from: args.from,
    namespaceImport: undefined,
    namedImports: [],
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
});
