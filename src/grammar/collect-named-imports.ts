import { NAMED_IMPORT_PLACEHOLDER_SPECIAL_WORD } from '../constants';
import { NearleyData } from '../types';
import { isToken } from '../utils/is-token';

export const collectNamedImports = (data: NearleyData) => {
	const leftBracket = isToken(data[0]) ? data[0].text : '';
	const rightBracket = isToken(data[4]) ? data[4].text : '';

	return {
		text: `${leftBracket}${data[1]}${NAMED_IMPORT_PLACEHOLDER_SPECIAL_WORD}${data[3]}${rightBracket}`,
		namedImports: data[2],
	};
};
