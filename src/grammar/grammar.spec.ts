import moo from 'moo';
import myGrammar from './grammar';
import { Grammar, Parser } from 'nearley';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

const getNewParser = () => new Parser(Grammar.fromCompiled(myGrammar));

describe('nearley grammar', () => {
    let parser = getNewParser();

    afterEach(() => {
        parser = getNewParser();
    });

    it('should parse leading comment with default import', () => {
        const source = `import/** comment */test from 'module'`;

        const result = parser.feed(source);

        expect(result.results[0]).toEqual({
            defaultImport: '/** comment */test',
            from: 'module',
        });
    });

    it('should parse trailing comment with default import', () => {
        const source = `import test /** comment */ from 'module'`;
        const result = parser.feed(source);

        expect(result.results[0]).toEqual({
            defaultImport: 'test/** comment */',
            from: 'module',
        });
    });
});
