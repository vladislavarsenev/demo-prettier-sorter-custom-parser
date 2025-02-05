import { describe, expect, test } from "vitest";
import { parseLine } from "./parse-line";

describe("parse-line.ts", () => {
  test("should parse default import", () => {
    expect(parseLine("import module from 'file'")).toEqual({
      defaultImport: "module",
      from: "file",
    });
  });

  test("should parse named import", () => {
    expect(parseLine("import { module } from 'file'")).toEqual({
      namedImports: [{ alias: undefined, name: "module" }],
      from: "file",
    });
  });

  test("should parse multiple named imports", () => {
    expect(parseLine("import { module, another } from 'file'")).toEqual({
      namedImports: [
        { alias: undefined, name: "module" },
        { alias: undefined, name: "another" },
      ],
      from: "file",
    });
  });

  test("should parse aliased named import", () => {
    expect(parseLine("import { module as alias } from 'file'")).toEqual({
      namedImports: [{ alias: "alias", name: "module" }],
      from: "file",
    });
  });

  test("should parse multiple aliased named imports", () => {
    expect(
      parseLine(
        "import { module as alias, another as anotherAlias } from 'file'"
      )
    ).toEqual({
      namedImports: [
        { alias: "alias", name: "module" },
        { alias: "anotherAlias", name: "another" },
      ],
      from: "file",
    });
  });

  test("should parse default and named imports", () => {
    expect(parseLine("import module, { another } from 'file'")).toEqual({
      defaultImport: "module",
      namedImports: [{ alias: undefined, name: "another" }],
      from: "file",
    });
  });

  test("should parse default and aliased named imports", () => {
    expect(
      parseLine("import module, { another as alias } from 'file'")
    ).toEqual({
      defaultImport: "module",
      namedImports: [{ alias: "alias", name: "another" }],
      from: "file",
    });
  });

  test("should return undefined when there is no import in line", () => {
    expect(parseLine("const a = 1")).toBeUndefined();
  });
});
