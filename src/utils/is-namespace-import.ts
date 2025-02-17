import { ImportItem } from '../type';

export const isNamespaceImport = (importItem: ImportItem) => {
	return importItem.namespaceImport !== undefined;
};
