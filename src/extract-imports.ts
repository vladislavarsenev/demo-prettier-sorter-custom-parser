import nearley from "nearley";
import { ExtractedImports, ImportItem } from "./type";
import grammar from "./grammar";

/**
1. no accumulator. parsed successfully with object.
  -> add parsed object
  -> add line length to endLoc
  -> create new parser
2. no accumulator. parsed successfully without object
  -> add line length to accumulator
3. no accumulator. error with parsing
  -> create new parser
  3.1 there is imports
    -> add line length to endLoc
  3.2 there is no imports
    -> add line length to startLoc
    -> make equal endLoc to startLoc
4. accumulator exists. parsed successfully with object
  4.1 there is no imports
    -> add accumulator lines to startLoc
    -> add accumulator lines to endLoc
    -> add line length  to endLoc
    -> add import object to collection
  4.2 there is imports
    -> add accumulator lines to endLoc
    -> add import object to collection
  -> create new parser
  -> reset accumulator
5. accumulator exists. parsed without object
  -> add string length to accumulator
6. accumulator exists. parsed with error
  6.1 there is no imports
    -> add accumulator to startLoc
    -> add line length to startLoc
    -> make equal endLoc to startLoc
  6.2 there is imports
    -> skip
  -> reset accumulator
  -> create new parser
 */
/**
 * actions:
 * 1. add line length to startLoc
 * 2. add line length to endLoc
 * 3. add import object to collection
 * 4. add line length to accumulator
 * 5. add accumulator lines to startLoc
 * 6. add accumulator lines to endLoc
 * 7. create new parser
 * 8. reset accumulator
 * 9. make equal endLoc to startLoc
 * 10. skip
 */

type State = {
  parser: nearley.Parser;
  accumulator: number;
};

const createNewParser = () =>
  new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

const addLineLengthToStartLoc = (output: ExtractedImports, line: string) => {
  output.startLoc += line.length;
};

const addLineLengthToEndLoc = (output: ExtractedImports, line: string) => {
  output.endLoc += line.length;
};

const addImportObjectToCollection = (
  output: ExtractedImports,
  importObject: ImportItem
) => {
  output.imports.push(importObject);
};

const addLineLengthToAccumulator = (state: State, line: string) => {
  state.accumulator += line.length;
};

const addAccumulatorLinesToEndLoc = (
  output: ExtractedImports,
  accumulator: number
) => {
  output.endLoc += accumulator;
};

const resetAccumulator = (state: State) => {
  state.accumulator = 0;
};

const updateNewParser = (state: State) => {
  state.parser = createNewParser();
};

const incrementEndLoc = (output: ExtractedImports) => {
  output.endLoc += 1;
};

export const extractImports = (source: string) => {
  const lines = source.split("\n").flatMap((line) => line.split(";"));

  const state = {
    parser: createNewParser(),
    accumulator: 0,
  };

  const output: ExtractedImports = {
    startLoc: 0,
    endLoc: 0,
    imports: [],
  };

  lines.forEach((line, index) => {
    let importItem;

    const { parser, accumulator } = state;

    try {
      importItem = parser.feed(line).results[0];
    } catch (e) {
      importItem = e;
    }

    const isAccumulatorEmpty = accumulator === 0;
    const isImportsExist = output.imports.length > 0;
    const isParsedWithError = importItem instanceof Error;
    const isParsedWithObject = !!importItem && !isParsedWithError;
    const isParsedWithoutObject = !importItem && !isParsedWithError;
    const isFirstLine = index === 0;

    if (isParsedWithObject && !isImportsExist && isAccumulatorEmpty) {
      addLineLengthToEndLoc(output, line);
      addImportObjectToCollection(output, importItem);
      updateNewParser(state);
    }

    if (isParsedWithObject && isImportsExist && isAccumulatorEmpty) {
      addLineLengthToEndLoc(output, line);
      addImportObjectToCollection(output, importItem);
      updateNewParser(state);
    }

    if (isParsedWithObject && isImportsExist && !isAccumulatorEmpty) {
      addLineLengthToEndLoc(output, line);
      addImportObjectToCollection(output, importItem);
      addAccumulatorLinesToEndLoc(output, accumulator);
      updateNewParser(state);
    }

    if (!isFirstLine && isParsedWithObject) {
      incrementEndLoc(output);
    }

    if (isParsedWithoutObject && isFirstLine) {
      addLineLengthToAccumulator(state, line);
    }

    if (isParsedWithoutObject && !isFirstLine) {
      addLineLengthToAccumulator(state, line + ";");
    }

    if (isParsedWithObject && !isAccumulatorEmpty && !isImportsExist) {
      addAccumulatorLinesToEndLoc(output, accumulator);
      addLineLengthToEndLoc(output, line);
      addImportObjectToCollection(output, importItem);
      updateNewParser(state);
      resetAccumulator(state);
    }

    if (isParsedWithError && !isImportsExist) {
      addLineLengthToStartLoc(output, line + ";;"); // +2 for the semicolon and correct slice
      addLineLengthToEndLoc(output, line);

      updateNewParser(state);
    }
  });

  return output;
};
