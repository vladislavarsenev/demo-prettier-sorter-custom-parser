// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
// Bypasses TS6133. Allow declared but unused functions.
// @ts-ignore
function id(d: any[]): any { return d[0]; }
declare var directive: any;
declare var ws: any;
declare var nl: any;
declare var multiLineComment: any;
declare var inlineComment: any;
declare var identifier: any;
declare var otherChars: any;
declare var number: any;
declare var semicolon: any;
declare var string: any;
declare var kwImport: any;
declare var colon: any;
declare var comma: any;
declare var lbrace: any;
declare var rbrace: any;
declare var kwFrom: any;
declare var kwWith: any;
declare var as: any;
declare var asterix: any;

  import { getLexer } from '../lexers/typescript'
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

  const lexer = getLexer()

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
    {"name": "program$ebnf$1", "symbols": ["shebang"], "postprocess": id},
    {"name": "program$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "program$ebnf$2", "symbols": []},
    {"name": "program$ebnf$2", "symbols": ["program$ebnf$2", "importBlock"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "program$ebnf$3", "symbols": []},
    {"name": "program$ebnf$3", "symbols": ["program$ebnf$3", "restCode"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "program", "symbols": ["program$ebnf$1", "program$ebnf$2", "program$ebnf$3"]},
    {"name": "shebang", "symbols": [(lexer.has("directive") ? {type: "directive"} : directive)]},
    {"name": "importBlock$ebnf$1", "symbols": []},
    {"name": "importBlock$ebnf$1", "symbols": ["importBlock$ebnf$1", "restCode"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "importBlock", "symbols": ["importBlock$ebnf$1", "importStatement"]},
    {"name": "restCode", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)]},
    {"name": "restCode", "symbols": [(lexer.has("nl") ? {type: "nl"} : nl)]},
    {"name": "restCode", "symbols": [(lexer.has("multiLineComment") ? {type: "multiLineComment"} : multiLineComment)]},
    {"name": "restCode", "symbols": [(lexer.has("inlineComment") ? {type: "inlineComment"} : inlineComment)]},
    {"name": "restCode", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier)]},
    {"name": "restCode", "symbols": [(lexer.has("otherChars") ? {type: "otherChars"} : otherChars)]},
    {"name": "restCode", "symbols": [(lexer.has("number") ? {type: "number"} : number)]},
    {"name": "restCode", "symbols": [(lexer.has("semicolon") ? {type: "semicolon"} : semicolon)]},
    {"name": "restCode", "symbols": [(lexer.has("string") ? {type: "string"} : string)]},
    {"name": "restCode", "symbols": [(lexer.has("kwImport") ? {type: "kwImport"} : kwImport)]},
    {"name": "restCode", "symbols": [(lexer.has("colon") ? {type: "colon"} : colon)]},
    {"name": "restCode", "symbols": [(lexer.has("comma") ? {type: "comma"} : comma)]},
    {"name": "restCode", "symbols": [(lexer.has("lbrace") ? {type: "lbrace"} : lbrace)]},
    {"name": "restCode", "symbols": [(lexer.has("rbrace") ? {type: "rbrace"} : rbrace)], "postprocess": joinData},
    {"name": "importStatement", "symbols": ["sideEffectImportStatement"], "postprocess": id},
    {"name": "importStatement", "symbols": ["defaultImportStatement"], "postprocess": id},
    {"name": "defaultImportStatement$ebnf$1", "symbols": ["importAttributes"], "postprocess": id},
    {"name": "defaultImportStatement$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "defaultImportStatement", "symbols": [(lexer.has("kwImport") ? {type: "kwImport"} : kwImport), "_", "importClause", "_", (lexer.has("kwFrom") ? {type: "kwFrom"} : kwFrom), "_", "fromClause", "_", "defaultImportStatement$ebnf$1"], "postprocess": collectDefaultImportStatement},
    {"name": "sideEffectImportStatement", "symbols": [(lexer.has("kwImport") ? {type: "kwImport"} : kwImport), "_", (lexer.has("string") ? {type: "string"} : string)], "postprocess": collectSideEffectImport},
    {"name": "importAttributes", "symbols": [(lexer.has("kwWith") ? {type: "kwWith"} : kwWith), "_", (lexer.has("lbrace") ? {type: "lbrace"} : lbrace), "_", "importAttributesList", "_", (lexer.has("rbrace") ? {type: "rbrace"} : rbrace), "_"], "postprocess": joinData},
    {"name": "importAttributes", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier), "_", (lexer.has("lbrace") ? {type: "lbrace"} : lbrace), "_", "importAttributesList", "_", (lexer.has("rbrace") ? {type: "rbrace"} : rbrace), "_"], "postprocess": joinData},
    {"name": "importAttributesList$ebnf$1", "symbols": []},
    {"name": "importAttributesList$ebnf$1$subexpression$1", "symbols": ["_", (lexer.has("comma") ? {type: "comma"} : comma), "_", "importAttribute"]},
    {"name": "importAttributesList$ebnf$1", "symbols": ["importAttributesList$ebnf$1", "importAttributesList$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "importAttributesList", "symbols": ["importAttribute", "importAttributesList$ebnf$1"], "postprocess": joinData},
    {"name": "importAttribute", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier), "_", (lexer.has("colon") ? {type: "colon"} : colon), "_", (lexer.has("string") ? {type: "string"} : string)], "postprocess": joinData},
    {"name": "importClause", "symbols": ["defaultImport", "_", (lexer.has("comma") ? {type: "comma"} : comma), "_", "namedImports"], "postprocess": collectDefaultAndNamedImports},
    {"name": "importClause", "symbols": ["defaultImport"], "postprocess": collectDefaultImportClause},
    {"name": "importClause", "symbols": ["namedImports"], "postprocess": collectNamedImportsClause},
    {"name": "importClause", "symbols": ["namespaceImport"], "postprocess": collectNamespaceImportClause},
    {"name": "defaultImport$ebnf$1", "symbols": ["typeSpecifier"], "postprocess": id},
    {"name": "defaultImport$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "defaultImport", "symbols": ["defaultImport$ebnf$1", (lexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": collectDefaultImport},
    {"name": "namedImports$ebnf$1", "symbols": ["typeSpecifier"], "postprocess": id},
    {"name": "namedImports$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "namedImports", "symbols": ["namedImports$ebnf$1", (lexer.has("lbrace") ? {type: "lbrace"} : lbrace), "_", "namedImportList", "_", (lexer.has("rbrace") ? {type: "rbrace"} : rbrace)], "postprocess": collectNamedImports},
    {"name": "namedImportList$ebnf$1", "symbols": []},
    {"name": "namedImportList$ebnf$1$subexpression$1", "symbols": ["_", (lexer.has("comma") ? {type: "comma"} : comma), "_", "namedImport"]},
    {"name": "namedImportList$ebnf$1", "symbols": ["namedImportList$ebnf$1", "namedImportList$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "namedImportList", "symbols": ["namedImport", "namedImportList$ebnf$1"], "postprocess": collectNamedImportList},
    {"name": "namedImport$ebnf$1", "symbols": ["typeSpecifier"], "postprocess": id},
    {"name": "namedImport$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "namedImport", "symbols": ["namedImport$ebnf$1", (lexer.has("identifier") ? {type: "identifier"} : identifier), "_", (lexer.has("as") ? {type: "as"} : as), "_", (lexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": collectNamedImport},
    {"name": "namedImport$ebnf$2", "symbols": ["typeSpecifier"], "postprocess": id},
    {"name": "namedImport$ebnf$2", "symbols": [], "postprocess": () => null},
    {"name": "namedImport", "symbols": ["namedImport$ebnf$2", (lexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": collectNamedImport},
    {"name": "namespaceImport", "symbols": [(lexer.has("asterix") ? {type: "asterix"} : asterix), "_", (lexer.has("as") ? {type: "as"} : as), "_", (lexer.has("string") ? {type: "string"} : string)], "postprocess": joinData},
    {"name": "fromClause", "symbols": [(lexer.has("string") ? {type: "string"} : string)], "postprocess": collectFrom},
    {"name": "typeSpecifier", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier), "_"], "postprocess": joinData},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1$subexpression$1", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)]},
    {"name": "_$ebnf$1$subexpression$1", "symbols": [(lexer.has("nl") ? {type: "nl"} : nl)]},
    {"name": "_$ebnf$1$subexpression$1", "symbols": [(lexer.has("multiLineComment") ? {type: "multiLineComment"} : multiLineComment)]},
    {"name": "_$ebnf$1$subexpression$1", "symbols": [(lexer.has("inlineComment") ? {type: "inlineComment"} : inlineComment)]},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", "_$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "_", "symbols": ["_$ebnf$1"]}
  ],
  ParserStart: "program",
};

export default grammar;
