import { NameImportItem, NearleyData } from '../types';
import { isObject } from './is-object';

export const isNamedImport = (item: unknown): item is NameImportItem => {
	return isObject(item) && 'name' in item;
};
