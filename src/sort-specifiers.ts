import { ImportItem } from './types';

export const sortSpecifiers = (importItem: ImportItem) => {
	const collator = new Intl.Collator(undefined, {
		numeric: true,
		sensitivity: 'accent',
	});

	importItem.namedImports = importItem.namedImports?.sort((a, b) => {
		return collator.compare(a.alias ?? a.name, b.alias ?? b.name);
	});

	return importItem;
};
