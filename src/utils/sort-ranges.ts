export const sortRanges = (ranges: { startLoc: number; endLoc: number }[]) => {
	return ranges.sort((a, b) => a.startLoc - b.startLoc);
};
