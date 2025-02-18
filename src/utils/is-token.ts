import { Token } from 'moo';

export const isToken = (data: unknown): data is Token => {
	return typeof data === 'object' && data !== null && 'text' in data;
};
