import { stringifyImports } from './stringify-imports';
import { ImportItem } from './type';

export const replaceSourceImports = (
	source: string,
	imports: ImportItem[],
	startLoc: number,
	endLoc: number,
) => {
	const importLists = stringifyImports(imports);

	return source.slice(0, startLoc) + importLists + source.slice(endLoc);
};
