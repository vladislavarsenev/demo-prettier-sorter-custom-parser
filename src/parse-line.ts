import nearley from "nearley";
import grammar from "./grammar";

export const parseLine = (line: string) => {
  try {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
    parser.feed(line);
    parser.finish();

    return parser.results[0];
  } catch (e) {
    return undefined;
  }
};
