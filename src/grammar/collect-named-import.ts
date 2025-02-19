import { NameImportItem, NearleyData } from '../types';
import { isToken } from '../utils/is-token';
import { joinData } from './join-data';

export function collectNamedImport(data: NearleyData) {
	const rawString = joinData(data);
	const output: NameImportItem = {
		text: rawString,
		name: isToken(data[1]) ? data[1].text : '',
	};

	if (isToken(data[5])) {
		output.alias = data[5].text;
	}

	return output;
}
