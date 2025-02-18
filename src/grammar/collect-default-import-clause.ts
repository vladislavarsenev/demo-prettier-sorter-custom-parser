import { ImportItem, NearleyData } from '../types';
import { isString } from '../utils/is-string';

export const collectDefaultImportClause = (
	data: NearleyData,
): Partial<ImportItem> => {
	return {
		text: isString(data[0]) ? data[0] : '',
		hasDefaultImport: true,
		hasNamedImports: false,
		hasNamespaceImport: false,
	};
};
