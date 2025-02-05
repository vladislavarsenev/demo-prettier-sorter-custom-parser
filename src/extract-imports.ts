import nearley from "nearley";
import { ExtractedImports, ImportItem } from "./type";
import grammar from "./grammar";

const getNewParser = () =>
  new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

export const extractImports = (source: string) => {
  const lines = source.split("\n").flatMap((line) => line.split(";"));

  let parser = getNewParser();

  const output: ExtractedImports = {
    startLoc: 0,
    endLoc: 0,
    imports: [],
  };

  let finished = false;

  lines.forEach((line, index) => {
    if (finished) return;

    let importObj: ImportItem | undefined;

    try {
      parser.feed(line);

      importObj = parser.results[0];
    } catch (e) {
      parser = getNewParser();

      if (!output.imports.length) {
        output.startLoc += line.length + 1;
        output.endLoc += line.length + 1;

        return;
      }

      // import block is finished
      if (output.imports.length) {
        finished = true;
        output.endLoc -= 1;
        return;
      }
    }

    // import clase is not finished
    if (!importObj && index < lines.length - 1) {
      output.endLoc += line.length + 1;

      return;
    } else if (!importObj) {
      output.endLoc += line.length;
      return;
    }

    parser = getNewParser();
    output.imports.push(importObj);

    if (index < lines.length - 1) {
      output.endLoc += line.length + 1;
    } else {
      output.endLoc += line.length;
    }
  });

  return output;
};
