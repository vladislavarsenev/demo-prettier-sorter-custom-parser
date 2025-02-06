import { describe, expect, test } from "vitest";
import { sortImports } from "./sort-imports";

const AImport = {
  defaultImport: "A",
  namespaceImport: undefined,
  namedImports: [],
  from: "a",
};

const BImport = {
  defaultImport: "B",
  namespaceImport: undefined,
  namedImports: [],
  from: "b",
};

describe("sort-imports", () => {
  test("sort import alphabetically", () => {
    expect(sortImports([BImport, AImport])).toEqual([AImport, BImport]);
  });
});
