import { NearleyData } from '../types';
import { joinData } from './join-data';

export function collectDefaultImport(data: NearleyData) {
	return joinData(data);
}
