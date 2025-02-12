import { describe, expect, test } from 'vitest';
import { sortImports } from '../sort-imports';

const AImport = {
    defaultImport: 'A',
    namespaceImport: undefined,
    namedImports: [],
    from: 'a',
    leadingComments: [],
};

const BImport = {
    defaultImport: 'B',
    namespaceImport: undefined,
    namedImports: [],
    from: 'b',
    leadingComments: [],
};

describe('sort-imports', () => {
    test('sort import alphabetically', () => {
        expect(sortImports([BImport, AImport])).toEqual([AImport, BImport]);
    });
});
