import { describe, expect, it, test } from 'vitest';
import { sortImportsFromSource } from '../sort-imports-from-source';

describe('sort-imports-from-source', () => {
	test('sort default imports', () => {
		const source = `import b from "b";
import a from "a";`;
		const sortedSource = sortImportsFromSource(source);

		expect(sortedSource).toEqual(`import a from "a"
import b from "b"`);
	});

	test('sort imports in small TS file', () => {
		const source = `import { b } from "b";
import { a } from "a";

const x = 6
const y = 7

function someFunction(z: number) {
    return z + x + y
}

someFunction(5)`;
		const sortedSource = sortImportsFromSource(source);

		expect(sortedSource).toEqual(`import { a } from "a"
import { b } from "b"
const x = 6
const y = 7

function someFunction(z: number) {
    return z + x + y
}

someFunction(5)`);
	});

	test('sort import file with directive comment', () => {
		const source = `"use client";
import { b } from "b";
import { a } from "a";`;
		const sortedSource = sortImportsFromSource(source);

		expect(sortedSource).toEqual(`"use client";
import { a } from "a"
import { b } from "b"`);
	});

	it('should preserve leading comment from first import to the top of the file', () => {
		const source = `
/* leading comment */
import module from "B"
// leading comment 2
import A from "a"

const x = 8;`;
		const sortedSource = sortImportsFromSource(source);

		expect(sortedSource).toEqual(`/* leading comment */
// leading comment 2
import A from "a"
import module from "B"
const x = 8;`);
	});
});
