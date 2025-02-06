import { describe, expect, test } from "vitest";
import { sortImportsFromSource } from "./sort-imports-from-source";

describe("sort-imports-from-source", () => {
  test("sort default imports", () => {
    const source = `import b from "b";
import a from "a";`;
    const sortedSource = sortImportsFromSource(source);

    expect(sortedSource).toEqual(`import a from "a";
import b from "b";`);
  });

  test("sort imports in small TS file", () => {
    const source = `import { b } from "b";
import { a } from "a";

const x = 6
const y = 7

function someFunction(z: number) {
    return z + x + y
}

someFunction(5)`;
    const sortedSource = sortImportsFromSource(source);

    expect(sortedSource).toEqual(`import { a } from "a";
import { b } from "b";
const x = 6
const y = 7

function someFunction(z: number) {
    return z + x + y
}

someFunction(5)`);
  });

  test("sort import file with directive comment", () => {
    const source = `"use client";
import { b } from "b";
import { a } from "a";`;
    const sortedSource = sortImportsFromSource(source);

    expect(sortedSource).toEqual(`"use client";import { a } from "a";
import { b } from "b";`);
  });
});
