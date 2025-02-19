import { NAMED_IMPORT_PLACEHOLDER_SPECIAL_WORD } from '../constants';
import { NearleyData } from '../types';
import { joinData } from './join-data';

export const collectNamedImports = (data: NearleyData) => {
	const copiedData = [...data];
	const imports = copiedData[3];
	copiedData[3] = NAMED_IMPORT_PLACEHOLDER_SPECIAL_WORD;

	return {
		text: joinData(copiedData),
		namedImports: imports,
	};
};
