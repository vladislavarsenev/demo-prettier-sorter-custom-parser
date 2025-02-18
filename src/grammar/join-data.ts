import { Token } from 'moo';
import { NearleyData } from '../types';
import { isToken } from '../utils/is-token';

export const joinData = (data: NearleyData): string => {
	return data.reduce<string>((acc, el) => {
		if (el == null) return acc;
		if (Array.isArray(el) && el.length === 0) return acc;
		if (Array.isArray(el)) {
			return acc + joinData(el);
		}

		if (isToken(el)) {
			return acc + el.text;
		}

		return acc + el;
	}, '');
};
