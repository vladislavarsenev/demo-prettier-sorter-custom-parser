import { GROUP_SEPARATOR } from './constants';
import { stringifyImports } from './stringify-imports';
import { ExtractedImports, GroupedImportItem, PrettierOptions } from './types';
import { getMiddleLines } from './utils/get-middle-lines';

export const replaceSourceImports = (
	source: string,
	groupedImports: GroupedImportItem[],
	positionRanges: ExtractedImports['positionRanges'],
	options?: Partial<PrettierOptions>,
) => {
	const importLists = stringifyImports(groupedImports, options ?? {});

	const middleLines = getMiddleLines(positionRanges);

	// Get the content of the middle lines
	const middleLinesContent = middleLines
		.map(({ startLoc, endLoc }) => {
			return source.slice(startLoc, endLoc).trim();
		})
		.join(GROUP_SEPARATOR);

	if (positionRanges.length > 0) {
		const { startLoc } = positionRanges[0];
		const endLoc = positionRanges.at(-1)?.endLoc;
		const left = source.slice(0, startLoc);

		const right = source.slice(endLoc);

		return [left, importLists, middleLinesContent, right]
			.map((el) => el.trim())
			.filter((el) => el.length > 0)
			.join(GROUP_SEPARATOR);
	}

	return source;
};
