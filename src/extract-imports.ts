import nearley from 'nearley';
import grammar from './grammar/grammar';
import { ExtractedImports } from './types';

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
	const lines = source
		.split('\n')
		.map(
			(line, index, splitedSource) =>
				line + (index < splitedSource.length - 1 ? '\n' : ''),
		);

	const state: State = {
		parser: createNewParser(),
		accumulator: 0,
		tempPositionRange: null,
	};

	const output: ExtractedImports = {
		positionRanges: [],
		imports: [],
	};

	lines.forEach((line) => {
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

		if (isParsedWithError) {
			addLineLengthToAccumulator(state, line.length);
			updateParser(state);
			state.tempPositionRange = null;

			return;
		}

		if (isParsedWithObject) {
			if (tempPositionRange) {
				tempPositionRange.endLoc += line.length;
				output.positionRanges.push(tempPositionRange);
				state.tempPositionRange = null;
			} else {
				output.positionRanges.push({
					startLoc: accumulator,
					endLoc: accumulator + line.length,
				});
			}

			addLineLengthToAccumulator(state, line.length);
			updateParser(state);

			output.imports.push(...importItems);

			return;
		}

		if (isParsedWithoutObject) {
			if (tempPositionRange) {
				tempPositionRange.endLoc += line.length;
			} else {
				state.tempPositionRange = {
					startLoc: accumulator,
					endLoc: accumulator + line.length,
				};
			}

			addLineLengthToAccumulator(state, line.length);

			return;
		}
	});

	return output;
};
