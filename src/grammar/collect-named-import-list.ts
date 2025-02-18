import { ImportItem, NameImportItem, NearleyData } from '../types';
import { isNamedImport } from '../utils/is-named-import';
import { isObject } from '../utils/is-object';
import { joinData } from './join-data';

export function collectNamedImportList(data: NearleyData) {
	const restImports = data[1];
	const output: NameImportItem[] = [];

	if (isNamedImport(data[0])) {
		output.push(data[0]);
	}

	if (Array.isArray(restImports) && restImports.length) {
		restImports.forEach((el) => {
			if (!Array.isArray(el)) return;

			const rawImport = joinData(el);

			const importEl = el.find((item) => {
				return isObject(item) && 'name' in item;
			});

			if (!isNamedImport(importEl)) return;

			const namedImport: NameImportItem = {
				name: importEl.name,
				text: rawImport.replace(',', ''), //trim leading comma
			};

			if (importEl.alias) {
				namedImport.alias = importEl.alias;
			}

			output.push(namedImport);
		});
	}

	return output;
}
