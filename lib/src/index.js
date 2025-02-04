"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nearley_1 = __importDefault(require("nearley"));
const grammar_cjs_1 = __importDefault(require("./grammar.cjs"));
const parser = new nearley_1.default.Parser(nearley_1.default.Grammar.fromCompiled(grammar_cjs_1.default));
parser.feed("foo\n");
console.log(JSON.stringify(parser.results));
