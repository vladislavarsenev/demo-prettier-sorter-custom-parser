import { ImportItem } from "./type";

const stringifyNamedImports = (namedImports: ImportItem["namedImports"]) =>
  namedImports
    ?.map((namedImport) => {
      if (namedImport.alias) {
        return `${namedImport.name} as ${namedImport.alias}`;
      }
      return namedImport.name;
    })
    .join(", ");

const stringifyImportItem = (importItem: ImportItem) => {
  if (
    !importItem.namedImports &&
    !importItem.defaultImport &&
    !importItem.namespaceImport
  ) {
    return `import "${importItem.from}"`;
  }

  const parts = [
    importItem.defaultImport,
    importItem.defaultImport && importItem.namedImports?.length ? ", " : "",
    importItem.namespaceImport && `* as ${importItem.namespaceImport}`,
    importItem.namedImports?.length &&
      `{ ${stringifyNamedImports(importItem.namedImports)} }`,
  ].filter(Boolean);

  return `import ${parts.join("")} from "${importItem.from}"`;
};

export const stringifyImports = (imports: ImportItem[]) =>
  imports.map(stringifyImportItem).join("\n");
