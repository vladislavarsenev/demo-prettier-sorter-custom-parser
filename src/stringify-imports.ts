import { ImportItem } from "./type";

export const stringifyImports = (imports: ImportItem[]) => {
  return imports
    .map((importItem) => {
      let importString = `import `;
      if (importItem.defaultImport) {
        importString += `${importItem.defaultImport}`;
      }
      if (importItem.defaultImport && importItem.namedImports?.length) {
        importString += `, `;
      }
      if (importItem.namespaceImport) {
        importString += `* as ${importItem.namespaceImport}`;
      }
      if (importItem.namedImports?.length) {
        importString += `{ ${importItem.namedImports
          .map((namedImport) => {
            if (namedImport.alias) {
              return `${namedImport.name} as ${namedImport.alias}`;
            }
            return namedImport.name;
          })
          .join(", ")} }`;
      }
      importString += ` from "${importItem.from}";`;
      return importString;
    })
    .join("\n");
};
