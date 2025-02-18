import { Grammar, Parser } from 'nearley';
import { afterEach, describe, expect, it } from 'vitest';
import myGrammar from '../grammar/grammar';

const getNewParser = () => new Parser(Grammar.fromCompiled(myGrammar));

describe('nearley grammar', () => {
	let parser = getNewParser();

	afterEach(() => {
		parser = getNewParser();
	});

	it('should parse leading comment with default import', () => {
		const source = `// preface comment
		import/** comment */test, { test2 as test3, test4 } from 'module';`;

		const result = parser.feed(source);

		expect(result.results[0]).toEqual([
			{
				prefaceText: '// preface comment\n\t\t',
				text: `import/** comment */test, { <NAMED_IMPORT_PLACEHOLDER> } from 'module';`,
				hasNamespaceImport: false,
				hasDefaultImport: true,
				hasNamedImports: true,
				hasSideEffectImport: false,
				namedImports: [
					{
						text: 'test2 as test3',
						name: 'test2',
						alias: 'test3',
					},
					{
						text: ' test4',
						name: 'test4',
					},
				],
				from: 'module',
			},
		]);
	});

	it('should parse trailing comment with default import', () => {
		const source = `import test /** comment */ from 'module'`;
		const result = parser.feed(source);

		expect(result.results[0]).toEqual([
			{
				text: `import test /** comment */ from 'module'`,
				hasNamespaceImport: false,
				hasDefaultImport: true,
				hasNamedImports: false,
				hasSideEffectImport: false,
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
				prefaceText: '/**\ntest comment\n*/\n',
				text: `import test from 'module'`,
				hasNamespaceImport: false,
				hasDefaultImport: true,
				hasNamedImports: false,
				hasSideEffectImport: false,
				from: 'module',
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
				prefaceText: '// test comment\n/**\ntest comment\n*/\n',
				text: `import test from 'module'`,
				hasNamespaceImport: false,
				hasDefaultImport: true,
				hasNamedImports: false,
				hasSideEffectImport: false,
				from: 'module',
			},
		]);
	});

	it('should parse leading comment with side effect import', () => {
		const source = `/**leading comment*/
import 'module'`;
		const result = parser.feed(source);

		expect(result.results[0]).toEqual([
			{
				prefaceText: '/**leading comment*/\n',
				text: `import 'module'`,
				hasNamespaceImport: false,
				hasDefaultImport: false,
				hasNamedImports: false,
				hasSideEffectImport: true,
				from: 'module',
			},
		]);
	});

	it('should parse with attribute', () => {
		const source = `import test from 'module' with { name: 'test', name2: 'test2' }`;
		const result = parser.feed(source);

		expect(result.results[0]).toEqual([
			{
				text: `import test from 'module' with { name: 'test', name2: 'test2' }`,
				hasNamespaceImport: false,
				hasDefaultImport: true,
				hasNamedImports: false,
				hasSideEffectImport: false,
				from: 'module',
			},
		]);
	});

	it('should parse import attributes with assert keyword', () => {
		const source = `import test from 'module' assert { name: 'test' }`;
		const result = parser.feed(source);

		expect(result.results[0]).toEqual([
			{
				text: `import test from 'module' assert { name: 'test' }`,
				hasNamespaceImport: false,
				hasDefaultImport: true,
				hasNamedImports: false,
				hasSideEffectImport: false,
				from: 'module',
			},
		]);
	});

	it('should parse named imports without default import', () => {
		const source = `import { test, test2 } from 'module'`;
		const result = parser.feed(source);

		expect(result.results[0]).toEqual([
			{
				text: `import { <NAMED_IMPORT_PLACEHOLDER> } from 'module'`,
				hasNamespaceImport: false,
				hasDefaultImport: false,
				hasNamedImports: true,
				hasSideEffectImport: false,
				from: 'module',
				namedImports: [
					{
						text: 'test',
						name: 'test',
					},
					{
						text: ' test2',
						name: 'test2',
					},
				],
			},
		]);
	});

	it('should parse namespace import', () => {
		const source = `/** preface comment */import * as test from 'module'`;
		const result = parser.feed(source);

		expect(result.results[0]).toEqual([
			{
				prefaceText: '/** preface comment */',
				text: `import * as test from 'module'`,
				hasNamespaceImport: true,
				hasDefaultImport: false,
				hasNamedImports: false,
				hasSideEffectImport: false,
				from: 'module',
			},
		]);
	});

	it('should parse named import', () => {
		const source = `import { test } from 'module';\n`;
		const result = parser.feed(source);

		expect(result.results[0]).toEqual([
			{
				text: `import { <NAMED_IMPORT_PLACEHOLDER> } from 'module';\n`,
				hasNamespaceImport: false,
				hasDefaultImport: false,
				hasNamedImports: true,
				hasSideEffectImport: false,
				from: 'module',
				namedImports: [{ text: 'test', name: 'test' }],
			},
		]);
	});
});
