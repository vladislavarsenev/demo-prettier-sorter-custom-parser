import { extractImports } from "./extract-imports";
import { replaceSourceImports } from "./replace-source-imports";
import { sortImports } from "./sort-imports";

export const sortImportsFromSource = (source: string) => {
  const importsInfo = extractImports(source);

  sortImports(importsInfo.imports);

  return replaceSourceImports(
    source,
    importsInfo.imports,
    importsInfo.startLoc,
    importsInfo.endLoc
  );
};
