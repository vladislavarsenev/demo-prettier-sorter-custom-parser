import { ImportItem } from './type';

export const sortImports = (imports: ImportItem[]) => {
	return imports.sort((a, b) => {
		return a.from.localeCompare(b.from);
	});
};
