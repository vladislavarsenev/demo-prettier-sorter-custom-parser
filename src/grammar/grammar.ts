// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
// Bypasses TS6133. Allow declared but unused functions.
// @ts-ignore
function id(d: any[]): any { return d[0]; }
declare var importLit: any;
declare var from: any;
declare var semicolon: any;
declare var comma: any;
declare var string: any;
declare var lbrace: any;
declare var rbrace: any;
declare var as: any;
declare var asterix: any;
declare var single_quote: any;
declare var double_quote: any;
declare var comment: any;
declare var ml_comment: any;
declare var wschar: any;
declare var newline: any;

import { collectComments } from './collect-comments'
import { collectDefaultImportStatement } from './collect-default-import-statement'
import { collectSideEffectImport } from './collect-side-effect-import'
import { collectNamedImport } from './collect-named-import'
import { collectNamedImportList } from './collect-named-import-list'
import { collectDefaultImport } from './collect-default-import'
import { lexer } from './lexer'

interface NearleyToken {
  value: any;
  [key: string]: any;
};

interface NearleyLexer {
  reset: (chunk: string, info: any) => void;
  next: () => NearleyToken | undefined;
  save: () => any;
  formatError: (token: never) => string;
  has: (tokenType: string) => boolean;
};

interface NearleyRule {
  name: string;
  symbols: NearleySymbol[];
  postprocess?: (d: any[], loc?: number, reject?: {}) => any;
};

type NearleySymbol = string | { literal: any } | { test: (token: any) => boolean };

interface Grammar {
  Lexer: NearleyLexer | undefined;
  ParserRules: NearleyRule[];
  ParserStart: string;
};

const grammar: Grammar = {
  Lexer: lexer,
  ParserRules: [
    {"name": "program$ebnf$1", "symbols": []},
    {"name": "program$ebnf$1", "symbols": ["program$ebnf$1", "importStatement"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "program", "symbols": ["program$ebnf$1"], "postprocess": id},
    {"name": "importStatement", "symbols": ["sideEffectImportStatement"], "postprocess": id},
    {"name": "importStatement", "symbols": ["defaultImportStatement"], "postprocess": id},
    {"name": "defaultImportStatement$ebnf$1", "symbols": []},
    {"name": "defaultImportStatement$ebnf$1", "symbols": ["defaultImportStatement$ebnf$1", (lexer.has("semicolon") ? {type: "semicolon"} : semicolon)], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "defaultImportStatement", "symbols": ["_", (lexer.has("importLit") ? {type: "importLit"} : importLit), "_", "importClause", "_", (lexer.has("from") ? {type: "from"} : from), "_", "fromClause", "_", "defaultImportStatement$ebnf$1"], "postprocess": collectDefaultImportStatement},
    {"name": "sideEffectImportStatement$ebnf$1", "symbols": []},
    {"name": "sideEffectImportStatement$ebnf$1", "symbols": ["sideEffectImportStatement$ebnf$1", (lexer.has("semicolon") ? {type: "semicolon"} : semicolon)], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "sideEffectImportStatement", "symbols": ["_", (lexer.has("importLit") ? {type: "importLit"} : importLit), "_", "fromClause", "_", "sideEffectImportStatement$ebnf$1"], "postprocess": collectSideEffectImport},
    {"name": "importClause", "symbols": ["defaultImport", "_", (lexer.has("comma") ? {type: "comma"} : comma), "_", "namedImports"], "postprocess": (data) => ({ defaultImport: data[0], namedImports: data[4] })},
    {"name": "importClause", "symbols": ["defaultImport"], "postprocess": (data) => ({ defaultImport: data[0] })},
    {"name": "importClause", "symbols": ["namedImports"], "postprocess": (data) => ({ namedImports: data[0] })},
    {"name": "importClause", "symbols": ["namespaceImport"], "postprocess": (data) => ({namespaceImport: data[0]})},
    {"name": "defaultImport", "symbols": [(lexer.has("string") ? {type: "string"} : string)], "postprocess": collectDefaultImport},
    {"name": "namedImports", "symbols": [(lexer.has("lbrace") ? {type: "lbrace"} : lbrace), "_", "namedImportList", "_", (lexer.has("rbrace") ? {type: "rbrace"} : rbrace)], "postprocess": (data) => data[2]},
    {"name": "namedImportList$ebnf$1", "symbols": []},
    {"name": "namedImportList$ebnf$1$subexpression$1", "symbols": ["_", (lexer.has("comma") ? {type: "comma"} : comma), "_", "namedImport"]},
    {"name": "namedImportList$ebnf$1", "symbols": ["namedImportList$ebnf$1", "namedImportList$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "namedImportList", "symbols": ["namedImport", "namedImportList$ebnf$1"], "postprocess": collectNamedImportList},
    {"name": "namedImport", "symbols": [(lexer.has("string") ? {type: "string"} : string), "_", (lexer.has("as") ? {type: "as"} : as), "_", (lexer.has("string") ? {type: "string"} : string)], "postprocess": collectNamedImport},
    {"name": "namedImport", "symbols": [(lexer.has("string") ? {type: "string"} : string)], "postprocess": collectNamedImport},
    {"name": "namespaceImport", "symbols": [(lexer.has("asterix") ? {type: "asterix"} : asterix), "_", (lexer.has("as") ? {type: "as"} : as), "_", (lexer.has("string") ? {type: "string"} : string)], "postprocess": data => data[4].text},
    {"name": "fromClause", "symbols": ["variativeQuoate", (lexer.has("string") ? {type: "string"} : string), "variativeQuoate"], "postprocess": (data) => data[1].text},
    {"name": "variativeQuoate", "symbols": [(lexer.has("single_quote") ? {type: "single_quote"} : single_quote)]},
    {"name": "variativeQuoate", "symbols": [(lexer.has("double_quote") ? {type: "double_quote"} : double_quote)], "postprocess": (data) => null},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1$subexpression$1", "symbols": ["ws"]},
    {"name": "_$ebnf$1$subexpression$1", "symbols": [(lexer.has("comment") ? {type: "comment"} : comment)]},
    {"name": "_$ebnf$1$subexpression$1", "symbols": [(lexer.has("ml_comment") ? {type: "ml_comment"} : ml_comment)]},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", "_$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": collectComments},
    {"name": "ws$subexpression$1", "symbols": [(lexer.has("wschar") ? {type: "wschar"} : wschar)]},
    {"name": "ws$subexpression$1", "symbols": [(lexer.has("newline") ? {type: "newline"} : newline)]},
    {"name": "ws", "symbols": ["ws$subexpression$1"], "postprocess": () => null}
  ],
  ParserStart: "program",
};

export default grammar;
