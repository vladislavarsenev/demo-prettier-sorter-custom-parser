import { describe, expect, test } from "vitest";
import { stringifyImports } from "./stringify-imports";

describe("stringify-imports", () => {
  test("stringify default imports", () => {
    expect(
      stringifyImports([
        {
          defaultImport: "A",
          from: "aFile",
          namedImports: [],
          namespaceImport: undefined,
        },
      ])
    ).toEqual(`import A from "aFile";`);
  });

  test("stringify namespace imports", () => {
    expect(
      stringifyImports([
        {
          defaultImport: "",
          from: "aFile",
          namedImports: [],
          namespaceImport: "A",
        },
      ])
    ).toEqual(`import * as A from "aFile";`);
  });

  test("stringify named imports", () => {
    expect(
      stringifyImports([
        {
          defaultImport: "",
          from: "aFile",
          namedImports: [
            {
              alias: "A",
              name: "B",
            },
          ],
          namespaceImport: undefined,
        },
      ])
    ).toEqual(`import { B as A } from "aFile";`);
  });

  test("stringify many named imports", () => {
    expect(
      stringifyImports([
        {
          defaultImport: "",
          from: "aFile",
          namedImports: [
            {
              alias: "A",
              name: "B",
            },
            {
              alias: "",
              name: "C",
            },
          ],
          namespaceImport: undefined,
        },
      ])
    ).toEqual(`import { B as A, C } from "aFile";`);
  });

  test("stringify all imports", () => {
    expect(
      stringifyImports([
        {
          defaultImport: "A",
          from: "aFile",
          namedImports: [
            {
              alias: "B",
              name: "C",
            },
            {
              alias: "",
              name: "D",
            },
          ],
        },
      ])
    ).toEqual(`import A, { C as B, D } from "aFile";`);
  });
});
