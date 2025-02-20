import { ExtractedImports } from '../types';

export const getMiddleLines = (
	positionRanges: ExtractedImports['positionRanges'],
) => {
	return positionRanges.reduce<ExtractedImports['positionRanges']>(
		(acc, cur, index) => {
			const nextRange = positionRanges[index + 1];

			if (nextRange && cur.endLoc < nextRange.startLoc) {
				return [
					...acc,
					{
						startLoc: cur.endLoc,
						endLoc: nextRange.startLoc,
					},
				];
			}

			return acc;
		},
		[],
	);
};
