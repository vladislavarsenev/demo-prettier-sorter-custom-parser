import { ImportItem, NearleyData } from '../types';
import { isObject } from '../utils/is-object';
import { isString } from '../utils/is-string';
import { joinData } from './join-data';

export function collectSideEffectImport(data: NearleyData) {
	const from =
		isObject(data[3]) && 'processed' in data[3] ? data[3].processed : '';
	const output: ImportItem = {
		from: from as string,
		hasSideEffectImport: true,
		hasDefaultImport: false,
		hasNamedImports: false,
		hasNamespaceImport: false,
		text: joinData(data.slice(1)),
	};

	const preface = data[0] ?? '';

	if (preface) {
		output.prefaceText = isString(preface) ? preface : '';
	}

	return output;
}
