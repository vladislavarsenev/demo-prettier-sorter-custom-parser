import { NearleyData } from '../types';
import { isToken } from '../utils/is-token';
import { joinData } from './join-data';

export const collectFrom = (data: NearleyData) => {
	return {
		text: joinData(data),
		processed: isToken(data[1]) ? data[1].text : '',
	};
};
