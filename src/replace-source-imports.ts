import { stringifyImports } from './stringify-imports';
import { ExtractedImports, ImportItem } from './type';

export const replaceSourceImports = (
	source: string,
	imports: ImportItem[],
	positionRanges: ExtractedImports['positionRanges'],
) => {
	let newSource = source;
	const importLists = stringifyImports(imports);

	for (let i = positionRanges.length - 1; i >= 0; i--) {
		const { startLoc, endLoc } = positionRanges[i];

		newSource = newSource.slice(0, startLoc) + newSource.slice(endLoc);
	}

	if (positionRanges.length > 0) {
		const { startLoc } = positionRanges[0];
		newSource =
			newSource.slice(0, startLoc) +
			importLists +
			newSource.slice(startLoc);
	}

	return newSource;
};
