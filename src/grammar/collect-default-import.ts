import { NearleyData } from '../types';
import { isToken } from '../utils/is-token';

export function collectDefaultImport(data: NearleyData) {
	if (isToken(data[0])) {
		return data[0].text;
	}

	return '';
}
