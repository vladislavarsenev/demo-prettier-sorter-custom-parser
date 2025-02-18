import { NearleyData } from '../types';

export const collectNamespaceImportClause = (data: NearleyData) => {
	return {
		text: data[0],
		hasNamespaceImport: true,
	};
};
