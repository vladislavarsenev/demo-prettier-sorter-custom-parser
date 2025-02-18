import { ImportItem } from '../types';

export const isSideEffectImport = (importItem: ImportItem | undefined) => {
	if (!importItem) return false;

	return importItem.hasSideEffectImport;
};
