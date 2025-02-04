// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

const moo = require("moo");

function collectImportStatemenet(data) {
  return { 
    defaultImport: data[2].defaultImport,
    namespaceImport: data[2].namespaceImport,
    namedImports: data[2].namedImports,
    from: data[6],
  }; 
}

function collectNamedImport(data) {
  return { name: data[0].text, alias: data[4]?.text } 
}

function collectNamedImportList(data) {
  return data.flatMap((item) => {
    if(!Array.isArray(item) && !('alias' in (item ?? {}))) return []

    return Array.isArray(item) ? collectNamedImportList(item) : item
  })
}

const lexer = moo.compile({
  wschar: /[ \t\r]+/,
  lbrace: "{",
  rbrace: "}",
  semicolon: ";",
  comma: ",",
  from: "from",
  single_quote: "'",
  double_quote: '"',
  asterix: "*",
  as: "as",
  newline: { match: /\n/, lineBreaks: true },
  comment: /\/\/.*?$/,
  ml_comment: /\/\*[\s\S]*?\*\//,
  string: /[\.\/a-zA-Z0-9_]+/,
})

var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "program$ebnf$1", "symbols": []},
    {"name": "program$ebnf$1", "symbols": ["program$ebnf$1", "importStatement"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "program", "symbols": ["program$ebnf$1"], "postprocess": data => data[0][0]},
    {"name": "importStatement$ebnf$1", "symbols": [{"literal":";"}], "postprocess": id},
    {"name": "importStatement$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "importStatement", "symbols": [{"literal":"import"}, "_", "importClause", "_", (lexer.has("from") ? {type: "from"} : from), "_", "fromClause", "_", "importStatement$ebnf$1"], "postprocess": collectImportStatemenet},
    {"name": "importClause", "symbols": ["defaultImport", "_", (lexer.has("comma") ? {type: "comma"} : comma), "_", "namedImports"], "postprocess": (data) => ({ defaultImport: data[0], namedImports: data[4] })},
    {"name": "importClause", "symbols": ["defaultImport"], "postprocess": (data) => ({ defaultImport: data[0] })},
    {"name": "importClause", "symbols": ["namedImports"], "postprocess": (data) => ({ namedImports: data[0] })},
    {"name": "importClause", "symbols": ["namespaceImport"], "postprocess": (data) => ({namespaceImport: data[0]})},
    {"name": "defaultImport", "symbols": [(lexer.has("string") ? {type: "string"} : string)], "postprocess": (data) => data[0].text},
    {"name": "namedImports", "symbols": [(lexer.has("lbrace") ? {type: "lbrace"} : lbrace), "_", "namedImportList", "_", (lexer.has("rbrace") ? {type: "rbrace"} : rbrace)], "postprocess": (data) => data[2]},
    {"name": "namedImportList$ebnf$1", "symbols": []},
    {"name": "namedImportList$ebnf$1$subexpression$1", "symbols": ["_", (lexer.has("comma") ? {type: "comma"} : comma), "_", "namedImport"]},
    {"name": "namedImportList$ebnf$1", "symbols": ["namedImportList$ebnf$1", "namedImportList$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "namedImportList", "symbols": ["namedImport", "namedImportList$ebnf$1"], "postprocess": collectNamedImportList},
    {"name": "namedImport", "symbols": [(lexer.has("string") ? {type: "string"} : string), "_", (lexer.has("as") ? {type: "as"} : as), "_", (lexer.has("string") ? {type: "string"} : string)], "postprocess": collectNamedImport},
    {"name": "namedImport", "symbols": [(lexer.has("string") ? {type: "string"} : string)], "postprocess": collectNamedImport},
    {"name": "namespaceImport", "symbols": [(lexer.has("asterix") ? {type: "asterix"} : asterix), "_", (lexer.has("as") ? {type: "as"} : as), "_", (lexer.has("string") ? {type: "string"} : string)], "postprocess": data => data[4].text},
    {"name": "fromClause", "symbols": ["fromQuote", (lexer.has("string") ? {type: "string"} : string), "fromQuote"], "postprocess": (data) => data[1].text},
    {"name": "fromQuote", "symbols": [(lexer.has("single_quote") ? {type: "single_quote"} : single_quote)]},
    {"name": "fromQuote", "symbols": [(lexer.has("double_quote") ? {type: "double_quote"} : double_quote)], "postprocess": (data) => null},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1$subexpression$1", "symbols": [(lexer.has("wschar") ? {type: "wschar"} : wschar)]},
    {"name": "_$ebnf$1$subexpression$1", "symbols": [(lexer.has("newline") ? {type: "newline"} : newline)]},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", "_$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": () => null}
]
  , ParserStart: "program"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
