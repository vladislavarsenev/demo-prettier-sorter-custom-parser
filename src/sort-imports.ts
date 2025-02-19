import { sortSpecifiers } from './sort-specifiers';
import { ImportItem } from './types';
import { isSideEffectImport } from './utils/is-side-effect-import';

type Options = {
	importOrderCaseInsensitive?: boolean;
	importOrderSortSpecifiers?: boolean;
	importOrderSideEffectImports?: boolean;
};

export const sortImports = (imports: ImportItem[], options: Options = {}) => {
	const importOrderCaseInsensitive =
		options.importOrderCaseInsensitive ?? false;
	const importOrderSideEffectImports =
		options.importOrderSideEffectImports ?? true;

	const collator = new Intl.Collator(undefined, {
		numeric: true,
		sensitivity: 'accent',
		caseFirst: importOrderCaseInsensitive ? 'upper' : 'false',
	});

	if (options.importOrderSortSpecifiers) {
		imports.forEach(sortSpecifiers);
	}

	if (importOrderSideEffectImports) {
		const isSideEffectGroup = imports.every(isSideEffectImport);

		if (isSideEffectGroup) {
			return imports;
		}
	}

	return imports.sort((a, b) => {
		return collator.compare(a.from, b.from);
	});
};
