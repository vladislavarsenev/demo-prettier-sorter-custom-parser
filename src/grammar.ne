
@{%
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

%}
@lexer lexer

main -> directive importLine:* {% (data) => data[1] %} 
  | importLine:* {% id %}

importLine -> _ml "import" _ml importPart _ml %from _ml filePart EOF:* {%
  (el) => {
    return {
      type: 'import',
      importName: el[3].moduleDefaultName,
      fileName: el[7].value
    }
  }
%}

directive -> %quote "use" %wschar %string %quote {% () => null %}

importPart -> defaultImport {%(data) => {
  return {
    moduleDefaultName: data[0].moduleDefaultName
  }
}%}

defaultImport -> %string {% (el) => ({ moduleDefaultName: el[0].text }) %}

filePart -> %quote _ml %string _ml %quote {% 
  (el) => {
    return {
      type: 'fileName',
      value: el[2].text
    }
  }
%}

_ml -> multi_line_ws_char:* {% () => ([])%}


multi_line_ws_char -> %wschar
  | "\n"
  | %comment
  | %ml_comment

EOF -> multi_line_ws_char
  | %semicolon