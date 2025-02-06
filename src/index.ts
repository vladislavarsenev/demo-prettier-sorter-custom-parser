import { parsers as typescriptParsers } from "prettier/plugins/typescript";
import { sortImportsFromSource } from "./sort-imports-from-source";

const plugin = {
  parsers: {
    typescript: {
      ...typescriptParsers.typescript,
      preprocess: sortImportsFromSource,
    },
  },
};

export default plugin;
