// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

const moo = require("moo");

const lexer = moo.compile({
  wschar: /[ \t]+/,
  lbrace: "{",
  rbrace: "}",
  semicolon: ";",
  from: "from",
  quote: "\"",
  newline: { match: /\n/, lineBreaks: true },
  comment: /\/\/.*?$/,
  ml_comment: /\/\*[\s\S]*?\*\//,
  string: /[\.\/a-zA-Z0-9]+/,
})

var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "main$ebnf$1", "symbols": []},
    {"name": "main$ebnf$1", "symbols": ["main$ebnf$1", "importLine"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "main", "symbols": ["directive", "main$ebnf$1"], "postprocess": (data) => data[1]},
    {"name": "main$ebnf$2", "symbols": []},
    {"name": "main$ebnf$2", "symbols": ["main$ebnf$2", "importLine"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "main", "symbols": ["main$ebnf$2"], "postprocess": id},
    {"name": "importLine$ebnf$1", "symbols": []},
    {"name": "importLine$ebnf$1", "symbols": ["importLine$ebnf$1", "EOF"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "importLine", "symbols": ["_ml", {"literal":"import"}, "_ml", "importPart", "_ml", (lexer.has("from") ? {type: "from"} : from), "_ml", "filePart", "importLine$ebnf$1"], "postprocess": 
        (el) => {
          return {
            type: 'import',
            importName: el[3].moduleDefaultName,
            fileName: el[7].value
          }
        }
        },
    {"name": "directive", "symbols": [(lexer.has("quote") ? {type: "quote"} : quote), {"literal":"use"}, (lexer.has("wschar") ? {type: "wschar"} : wschar), (lexer.has("string") ? {type: "string"} : string), (lexer.has("quote") ? {type: "quote"} : quote)], "postprocess": () => null},
    {"name": "importPart", "symbols": ["defaultImport"], "postprocess": (data) => {
          return {
            moduleDefaultName: data[0].moduleDefaultName
          }
        }},
    {"name": "defaultImport", "symbols": [(lexer.has("string") ? {type: "string"} : string)], "postprocess": (el) => ({ moduleDefaultName: el[0].text })},
    {"name": "filePart", "symbols": [(lexer.has("quote") ? {type: "quote"} : quote), "_ml", (lexer.has("string") ? {type: "string"} : string), "_ml", (lexer.has("quote") ? {type: "quote"} : quote)], "postprocess":  
        (el) => {
          return {
            type: 'fileName',
            value: el[2].text
          }
        }
        },
    {"name": "_ml$ebnf$1", "symbols": []},
    {"name": "_ml$ebnf$1", "symbols": ["_ml$ebnf$1", "multi_line_ws_char"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_ml", "symbols": ["_ml$ebnf$1"], "postprocess": () => ([])},
    {"name": "multi_line_ws_char", "symbols": [(lexer.has("wschar") ? {type: "wschar"} : wschar)]},
    {"name": "multi_line_ws_char", "symbols": [{"literal":"\n"}]},
    {"name": "multi_line_ws_char", "symbols": [(lexer.has("comment") ? {type: "comment"} : comment)]},
    {"name": "multi_line_ws_char", "symbols": [(lexer.has("ml_comment") ? {type: "ml_comment"} : ml_comment)]},
    {"name": "EOF", "symbols": ["multi_line_ws_char"]},
    {"name": "EOF", "symbols": [(lexer.has("semicolon") ? {type: "semicolon"} : semicolon)]}
]
  , ParserStart: "main"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
