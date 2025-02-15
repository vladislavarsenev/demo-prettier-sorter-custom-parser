import { sortSpecifiers } from './sort-specifiers';
import { ImportItem } from './type';

type Options = {
	importOrderCaseInsensitive?: boolean;
	importOrderSortSpecifiers?: boolean;
};

export const sortImports = (imports: ImportItem[], options: Options = {}) => {
	const importOrderCaseInsensitive =
		options.importOrderCaseInsensitive ?? false;

	const collator = new Intl.Collator(undefined, {
		numeric: true,
		sensitivity: 'accent',
		caseFirst: importOrderCaseInsensitive ? 'upper' : 'false',
	});

	if (options.importOrderSortSpecifiers) {
		imports.forEach(sortSpecifiers);
	}

	return imports.sort((a, b) => {
		return collator.compare(a.from, b.from);
	});
};
