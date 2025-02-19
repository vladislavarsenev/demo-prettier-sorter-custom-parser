import { NearleyData } from '../types';
import { isToken } from '../utils/is-token';
import { joinData } from './join-data';

export const collectFrom = (data: NearleyData) => {
	return {
		text: joinData(data),
		processed: data[1],
	};
};
