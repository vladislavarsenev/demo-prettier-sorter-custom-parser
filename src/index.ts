import nearley from "nearley";
import grammar from "./grammar.cjs";

const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
parser.feed(`import test4, { test2 as OP, test3, poke } from "./test_sdads"`);

parser.finish();

console.log("length", parser.results.length);
console.log(JSON.stringify(parser.results));
