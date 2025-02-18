import { ImportItem, NearleyData } from '../types';
import { isObject } from '../utils/is-object';
import { isString } from '../utils/is-string';
import { joinData } from './join-data';

export function collectDefaultImportStatement(data: NearleyData) {
	const imports = data[3] as unknown as ImportItem;
	const from =
		isObject(data[7]) && 'processed' in data[7] ? data[7].processed : '';

	const output: ImportItem = {
		text: joinData(data.slice(1)),
		hasDefaultImport: imports.hasDefaultImport ?? false,
		hasNamedImports: imports.hasNamedImports ?? false,
		hasNamespaceImport: imports.hasNamespaceImport ?? false,
		hasSideEffectImport: false,
		from: from as string,
	};

	if (imports.hasNamedImports) {
		output.namedImports = imports.namedImports;
	}

	if (data[0]) {
		output.prefaceText = isString(data[0]) ? data[0] : '';
	}

	return output;
}
