import myGrammar from '../grammar/grammar';
import { Grammar, Parser } from 'nearley';
import { afterEach, describe, expect, it } from 'vitest';

const getNewParser = () => new Parser(Grammar.fromCompiled(myGrammar));

describe('nearley grammar', () => {
	let parser = getNewParser();

	afterEach(() => {
		parser = getNewParser();
	});

	it('should parse leading comment with default import', () => {
		const source = `import/** comment */test from 'module'`;

		const result = parser.feed(source);

		expect(result.results[0]).toEqual([
			{
				leadingComments: [],
				defaultImport: '/** comment */test',
				from: 'module',
				namedImports: undefined,
				namespaceImport: undefined,
			},
		]);
	});

	it('should parse trailing comment with default import', () => {
		const source = `import test /** comment */ from 'module'`;
		const result = parser.feed(source);

		expect(result.results[0]).toEqual([
			{
				leadingComments: [],
				defaultImport: 'test/** comment */',
				from: 'module',
			},
		]);
	});

	it('should parse leading comment with default import', () => {
		const source = `/**
test comment
*/
import test from 'module'`;
		const result = parser.feed(source);

		expect(result.results[0]).toEqual([
			{
				leadingComments: ['/**\ntest comment\n*/'],
				defaultImport: 'test',
				from: 'module',
				namedImports: undefined,
				namespaceImport: undefined,
			},
		]);
	});

	it('should parse multiple leading comments with default import', () => {
		const source = `// test comment
/**
test comment
*/
import test from 'module'`;
		const result = parser.feed(source);

		expect(result.results[0]).toEqual([
			{
				leadingComments: ['// test comment', '/**\ntest comment\n*/'],
				defaultImport: 'test',
				from: 'module',
				namedImports: undefined,
				namespaceImport: undefined,
			},
		]);
	});

	it('should parse leading comment with side effect import', () => {
		const source = `/**leading comment*/
import 'module'`;
		const result = parser.feed(source);

		expect(result.results[0]).toEqual([
			{
				leadingComments: ['/**leading comment*/'],
				from: 'module',
			},
		]);
	});
});
