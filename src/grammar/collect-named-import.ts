import { NameImportItem, NearleyData } from '../types';
import { isToken } from '../utils/is-token';
import { joinData } from './join-data';

export function collectNamedImport(data: NearleyData) {
	const rawString = joinData(data);
	const output: NameImportItem = {
		text: rawString,
		name: isToken(data[0]) ? data[0].text : '',
	};

	if (isToken(data[4])) {
		output.alias = data[4].text;
	}

	return output;
}
