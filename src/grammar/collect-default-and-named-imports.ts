import { NearleyData } from '../types';
import { isObject } from '../utils/is-object';
import { isToken } from '../utils/is-token';

export const collectDefaultAndNamedImports = (data: NearleyData) => {
	const comma = isToken(data[1]) ? data[1].text : '';
	const namedImportText = isToken(data[4]) ? data[4].text : '';
	const namedImports =
		isObject(data[4]) && 'namedImports' in data[4]
			? data[4].namedImports
			: [];

	return {
		text: `${data[0]}${comma}${data[2]}${data[3]}${namedImportText}`,
		hasDefaultImport: true,
		hasNamedImports: true,
		namedImports,
	};
};
