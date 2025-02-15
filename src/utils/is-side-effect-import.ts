import { ImportItem } from '../type';

export const isSideEffectImport = (importItem: ImportItem | undefined) => {
	if (!importItem) return false;

	return (
		importItem.from &&
		importItem.defaultImport == null &&
		importItem.namespaceImport == null &&
		importItem.namedImports == null
	);
};
