import { ImportItem } from '../types';

export const isNamespaceImport = (importItem: ImportItem) => {
	return importItem.hasNamespaceImport;
};
