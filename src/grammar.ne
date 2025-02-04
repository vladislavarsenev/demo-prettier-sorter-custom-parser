
@{%
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

%}
@lexer lexer

# main rule
program -> importStatement:* {% data => data[0][0] %}

# import rule
importStatement -> "import" _ importClause _  %from _ fromClause _ ";":? {% collectImportStatemenet %}

# importClause can handle default, named, and namespace imports
importClause -> defaultImport _ %comma _ namedImports {% (data) => ({ defaultImport: data[0], namedImports: data[4] }) %}
              | defaultImport {% (data) => ({ defaultImport: data[0] }) %}
              | namedImports {% (data) => ({ namedImports: data[0] }) %}
              | namespaceImport {% (data) => ({namespaceImport: data[0]}) %}

defaultImport -> %string {%(data) => data[0].text %}

namedImports -> %lbrace _ namedImportList _ %rbrace {% (data) => data[2] %}

namedImportList -> namedImport ( _ %comma _ namedImport ):* {%  collectNamedImportList %}

namedImport -> %string  _ %as _ %string {% collectNamedImport %}
  | %string {% collectNamedImport %}

namespaceImport -> %asterix _ %as _ %string {% data => data[4].text %}

# String literals for 'from' modules
fromClause -> fromQuote %string fromQuote {%  (data) => data[1].text %}

fromQuote -> %single_quote | %double_quote {% (data) => null %}
# Ignore anything else (whitespace)
_ -> (%wschar | %newline):* {% () => null %}
