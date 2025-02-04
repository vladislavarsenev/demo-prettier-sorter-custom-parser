import nearley from "nearley";
import grammar from "./grammar.cjs";

const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
parser.feed(`import B from "test";`);

parser.finish();

console.log("length", parser.results.length);
console.log(JSON.stringify(parser.results[0]));
