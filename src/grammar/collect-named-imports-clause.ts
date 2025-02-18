import { ImportItem, NearleyData } from '../types';
import { isObject } from '../utils/is-object';

export const collectNamedImportsClause = (
	data: NearleyData,
): Partial<ImportItem> => {
	const namedImport = isObject(data[0]) ? data[0] : {};

	return {
		...namedImport,
		hasNamedImports: true,
	};
};
