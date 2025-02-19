// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
// Bypasses TS6133. Allow declared but unused functions.
// @ts-ignore
function id(d: any[]): any { return d[0]; }
declare var importLit: any;
declare var from: any;
declare var semicolon: any;
declare var newline: any;
declare var withLiteral: any;
declare var lbrace: any;
declare var rbrace: any;
declare var assertLiteral: any;
declare var comma: any;
declare var colon: any;
declare var string: any;
declare var typeKeyword: any;
declare var as: any;
declare var asterix: any;
declare var dash: any;
declare var single_quote: any;
declare var double_quote: any;
declare var comment: any;
declare var ml_comment: any;
declare var wschar: any;

import { collectDefaultImportStatement } from './collect-default-import-statement'
import { collectSideEffectImport } from './collect-side-effect-import'
import { collectNamedImport } from './collect-named-import'
import { collectNamedImportList } from './collect-named-import-list'
import { collectDefaultImport } from './collect-default-import'
import { collectDefaultAndNamedImports } from './collect-default-and-named-imports'
import { collectNamedImports } from './collect-named-imports'
import { collectDefaultImportClause } from './collect-default-import-clause'
import { collectNamedImportsClause } from './collect-named-imports-clause'
import { collectNamespaceImportClause } from './collect-namespace-import-clause'
import { collectFrom } from './collect-from'
import { joinData } from './join-data'
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
    {"name": "defaultImportStatement$ebnf$1", "symbols": ["importAttributes"], "postprocess": id},
    {"name": "defaultImportStatement$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "defaultImportStatement$ebnf$2", "symbols": []},
    {"name": "defaultImportStatement$ebnf$2", "symbols": ["defaultImportStatement$ebnf$2", (lexer.has("semicolon") ? {type: "semicolon"} : semicolon)], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "defaultImportStatement$ebnf$3", "symbols": [(lexer.has("newline") ? {type: "newline"} : newline)], "postprocess": id},
    {"name": "defaultImportStatement$ebnf$3", "symbols": [], "postprocess": () => null},
    {"name": "defaultImportStatement", "symbols": ["_", (lexer.has("importLit") ? {type: "importLit"} : importLit), "_", "importClause", "_", (lexer.has("from") ? {type: "from"} : from), "_", "fromClause", "_", "defaultImportStatement$ebnf$1", "defaultImportStatement$ebnf$2", "defaultImportStatement$ebnf$3"], "postprocess": collectDefaultImportStatement},
    {"name": "sideEffectImportStatement$ebnf$1", "symbols": []},
    {"name": "sideEffectImportStatement$ebnf$1", "symbols": ["sideEffectImportStatement$ebnf$1", (lexer.has("semicolon") ? {type: "semicolon"} : semicolon)], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "sideEffectImportStatement$ebnf$2", "symbols": [(lexer.has("newline") ? {type: "newline"} : newline)], "postprocess": id},
    {"name": "sideEffectImportStatement$ebnf$2", "symbols": [], "postprocess": () => null},
    {"name": "sideEffectImportStatement", "symbols": ["_", (lexer.has("importLit") ? {type: "importLit"} : importLit), "_", "fromClause", "_", "sideEffectImportStatement$ebnf$1", "sideEffectImportStatement$ebnf$2"], "postprocess": collectSideEffectImport},
    {"name": "importAttributes", "symbols": [(lexer.has("withLiteral") ? {type: "withLiteral"} : withLiteral), "_", (lexer.has("lbrace") ? {type: "lbrace"} : lbrace), "_", "importAttributesList", "_", (lexer.has("rbrace") ? {type: "rbrace"} : rbrace), "_"], "postprocess": joinData},
    {"name": "importAttributes", "symbols": [(lexer.has("assertLiteral") ? {type: "assertLiteral"} : assertLiteral), "_", (lexer.has("lbrace") ? {type: "lbrace"} : lbrace), "_", "importAttributesList", "_", (lexer.has("rbrace") ? {type: "rbrace"} : rbrace), "_"], "postprocess": joinData},
    {"name": "importAttributesList$ebnf$1", "symbols": []},
    {"name": "importAttributesList$ebnf$1$subexpression$1", "symbols": ["_", (lexer.has("comma") ? {type: "comma"} : comma), "_", "importAttribute"]},
    {"name": "importAttributesList$ebnf$1", "symbols": ["importAttributesList$ebnf$1", "importAttributesList$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "importAttributesList", "symbols": ["importAttribute", "importAttributesList$ebnf$1"], "postprocess": joinData},
    {"name": "importAttribute", "symbols": ["importAttributeKey", "_", (lexer.has("colon") ? {type: "colon"} : colon), "_", "variativeQuote", (lexer.has("string") ? {type: "string"} : string), "variativeQuote"], "postprocess": joinData},
    {"name": "importAttributeKey$subexpression$1", "symbols": [(lexer.has("string") ? {type: "string"} : string)]},
    {"name": "importAttributeKey$subexpression$1", "symbols": [(lexer.has("typeKeyword") ? {type: "typeKeyword"} : typeKeyword)]},
    {"name": "importAttributeKey", "symbols": ["importAttributeKey$subexpression$1"], "postprocess": joinData},
    {"name": "importClause", "symbols": ["defaultImport", "_", (lexer.has("comma") ? {type: "comma"} : comma), "_", "namedImports"], "postprocess": collectDefaultAndNamedImports},
    {"name": "importClause", "symbols": ["defaultImport"], "postprocess": collectDefaultImportClause},
    {"name": "importClause", "symbols": ["namedImports"], "postprocess": collectNamedImportsClause},
    {"name": "importClause", "symbols": ["namespaceImport"], "postprocess": collectNamespaceImportClause},
    {"name": "defaultImport$ebnf$1", "symbols": ["typeSpecifier"], "postprocess": id},
    {"name": "defaultImport$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "defaultImport", "symbols": ["defaultImport$ebnf$1", (lexer.has("string") ? {type: "string"} : string)], "postprocess": collectDefaultImport},
    {"name": "namedImports$ebnf$1", "symbols": ["typeSpecifier"], "postprocess": id},
    {"name": "namedImports$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "namedImports", "symbols": ["namedImports$ebnf$1", (lexer.has("lbrace") ? {type: "lbrace"} : lbrace), "_", "namedImportList", "_", (lexer.has("rbrace") ? {type: "rbrace"} : rbrace)], "postprocess": collectNamedImports},
    {"name": "namedImportList$ebnf$1", "symbols": []},
    {"name": "namedImportList$ebnf$1$subexpression$1", "symbols": ["_", (lexer.has("comma") ? {type: "comma"} : comma), "_", "namedImport"]},
    {"name": "namedImportList$ebnf$1", "symbols": ["namedImportList$ebnf$1", "namedImportList$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "namedImportList", "symbols": ["namedImport", "namedImportList$ebnf$1"], "postprocess": collectNamedImportList},
    {"name": "namedImport$ebnf$1", "symbols": ["typeSpecifier"], "postprocess": id},
    {"name": "namedImport$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "namedImport", "symbols": ["namedImport$ebnf$1", (lexer.has("string") ? {type: "string"} : string), "_", (lexer.has("as") ? {type: "as"} : as), "_", (lexer.has("string") ? {type: "string"} : string)], "postprocess": collectNamedImport},
    {"name": "namedImport$ebnf$2", "symbols": ["typeSpecifier"], "postprocess": id},
    {"name": "namedImport$ebnf$2", "symbols": [], "postprocess": () => null},
    {"name": "namedImport", "symbols": ["namedImport$ebnf$2", (lexer.has("string") ? {type: "string"} : string)], "postprocess": collectNamedImport},
    {"name": "namespaceImport", "symbols": [(lexer.has("asterix") ? {type: "asterix"} : asterix), "_", (lexer.has("as") ? {type: "as"} : as), "_", (lexer.has("string") ? {type: "string"} : string)], "postprocess": joinData},
    {"name": "fromClause", "symbols": ["variativeQuote", "fromClauseModuleName", "variativeQuote"], "postprocess": collectFrom},
    {"name": "fromClauseModuleName$ebnf$1", "symbols": []},
    {"name": "fromClauseModuleName$ebnf$1$subexpression$1", "symbols": [(lexer.has("string") ? {type: "string"} : string)]},
    {"name": "fromClauseModuleName$ebnf$1$subexpression$1", "symbols": [(lexer.has("dash") ? {type: "dash"} : dash)]},
    {"name": "fromClauseModuleName$ebnf$1", "symbols": ["fromClauseModuleName$ebnf$1", "fromClauseModuleName$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "fromClauseModuleName", "symbols": ["fromClauseModuleName$ebnf$1"], "postprocess": joinData},
    {"name": "typeSpecifier", "symbols": [(lexer.has("typeKeyword") ? {type: "typeKeyword"} : typeKeyword), "_"], "postprocess": joinData},
    {"name": "variativeQuote", "symbols": [(lexer.has("single_quote") ? {type: "single_quote"} : single_quote)]},
    {"name": "variativeQuote", "symbols": [(lexer.has("double_quote") ? {type: "double_quote"} : double_quote)], "postprocess": joinData},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1$subexpression$1", "symbols": ["ws"]},
    {"name": "_$ebnf$1$subexpression$1", "symbols": [(lexer.has("comment") ? {type: "comment"} : comment)]},
    {"name": "_$ebnf$1$subexpression$1", "symbols": [(lexer.has("ml_comment") ? {type: "ml_comment"} : ml_comment)]},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", "_$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": joinData},
    {"name": "ws$subexpression$1", "symbols": [(lexer.has("wschar") ? {type: "wschar"} : wschar)]},
    {"name": "ws$subexpression$1", "symbols": [(lexer.has("newline") ? {type: "newline"} : newline)]},
    {"name": "ws", "symbols": ["ws$subexpression$1"], "postprocess": joinData}
  ],
  ParserStart: "program",
};

export default grammar;
