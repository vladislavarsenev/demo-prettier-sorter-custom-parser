import {
	IMPORT_SEPARATOR,
	NAMED_IMPORT_PLACEHOLDER_SPECIAL_WORD,
} from './constants';
import { GroupedImportItem, ImportItem } from './types';

const renderPreface = (prefaceText?: string) => {
	const trimedPreface = prefaceText?.trim();
	const prefaceString = trimedPreface ? `${trimedPreface}\n` : '';
	return prefaceString;
};

const renderNamedImport = (importItem: ImportItem) => {
	return importItem.namedImports?.map((el) => el.text).join(', ') ?? '';
};

type Options = {
	importOrderSeparation?: boolean;
};

export const stringifyImports = (
	groupedImports: GroupedImportItem[],
	options?: Options,
) => {
	const { importOrderSeparation = false } = options ?? {};

	const groups = groupedImports.map((imports) => {
		return imports
			.map((importItem) => {
				const { prefaceText, text } = importItem;
				const namedImports = renderNamedImport(importItem);
				const textWithNamedImports = text
					.trim()
					.replace(
						NAMED_IMPORT_PLACEHOLDER_SPECIAL_WORD,
						namedImports,
					);
				return `${renderPreface(prefaceText)}${textWithNamedImports}`;
			})
			.join(IMPORT_SEPARATOR)
			.concat(IMPORT_SEPARATOR);
	});

	return groups.join(importOrderSeparation ? IMPORT_SEPARATOR : '');
};
