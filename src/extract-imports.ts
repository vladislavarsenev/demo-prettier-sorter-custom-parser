import nearley from 'nearley';
import { ExtractedImports, ImportItem } from './type';
import grammar from './grammar/grammar';

type State = {
	parser: nearley.Parser;
	accumulator: number;
	tempPositionRange: {
		startLoc: number;
		endLoc: number;
	} | null;
};

const createNewParser = () =>
	new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

const updateParser = (state: State) => {
	state.parser = createNewParser();
};

const addLineLengthToAccumulator = (state: State, numOfNewLines: number) => {
	state.accumulator += numOfNewLines;
};

export const extractImports = (source: string) => {
	const lines = source.split('\n');

	const state: State = {
		parser: createNewParser(),
		accumulator: 0,
		tempPositionRange: null,
	};

	const output: ExtractedImports = {
		positionRanges: [],
		imports: [],
	};

	lines.forEach((line, index) => {
		let importItems;

		const { parser, accumulator, tempPositionRange } = state;

		try {
			importItems = parser.feed(line).results[0];
		} catch (e) {
			importItems = e;
		}

		const isParsedWithError = importItems instanceof Error;

		const isParsedWithObject =
			importItems?.length > 0 && !isParsedWithError;

		const isParsedWithoutObject = !isParsedWithObject && !isParsedWithError;
		const increment = index < lines.length - 1 ? 1 : 0;

		if (isParsedWithError) {
			addLineLengthToAccumulator(state, line.length + increment);
			updateParser(state);
			state.tempPositionRange = null;

			return;
		}

		if (isParsedWithObject) {
			if (tempPositionRange) {
				tempPositionRange.endLoc += line.length + increment;
				output.positionRanges.push(tempPositionRange);
				state.tempPositionRange = null;
			} else {
				output.positionRanges.push({
					startLoc: accumulator,
					endLoc: accumulator + line.length + increment,
				});
			}

			addLineLengthToAccumulator(state, line.length + increment);
			updateParser(state);

			output.imports.push(...importItems);

			return;
		}

		if (isParsedWithoutObject) {
			if (tempPositionRange) {
				tempPositionRange.endLoc += line.length + increment;
			} else {
				state.tempPositionRange = {
					startLoc: accumulator,
					endLoc: accumulator + line.length + increment,
				};
			}

			addLineLengthToAccumulator(state, line.length + increment);

			return;
		}
	});

	return output;
};
