
@{%
import moo from "moo";

function collectDefaultImportStatemenet(data: any) {
  return {
    defaultImport: data[3].defaultImport,
    namespaceImport: data[3].namespaceImport,
    namedImports: data[3].namedImports,
    from: data[7],
  }; 
}

function collectSideEffectImport(data: any) {
  return { from: data[3] }
}

function collectNamedImport(data: any) {
  return { name: data[0].text, alias: data[4]?.text } 
}

function collectNamedImportList(data: any) {
  return data.flatMap((item) => {
    if(!Array.isArray(item) && !('alias' in (item ?? {}))) return []

    return Array.isArray(item) ? collectNamedImportList(item) : item
  })
}

function collectDefaultImport(data: any) {
  return data[0].text
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
  importLit: "import",
  asterix: "*",
  as: "as",
  newline: { match: /\n/, lineBreaks: true },
  comment: /\/\/.*?$/,
  ml_comment: /\/\*[\s\S]*?\*\//,
  string: /[\.\/a-zA-Z0-9_]+/,
})

%}
@lexer lexer
@preprocessor typescript

# main rule
program -> importStatement:* {% data => {
  return data[0][0]
} %}

# import rule
importStatement -> sideEffectImportStatement {% id %} 
                | defaultImportStatement {% id %}
               
defaultImportStatement -> _ %importLit _ importClause _ %from _ fromClause _ %semicolon:? {% collectDefaultImportStatemenet %}

sideEffectImportStatement -> _ %importLit _ fromClause _ %semicolon:?  {% collectSideEffectImport %}

# importClause can handle default, named, and namespace imports
importClause -> defaultImport _ %comma _ namedImports {% (data) => ({ defaultImport: data[0], namedImports: data[4] }) %}
              | defaultImport {% (data) => ({ defaultImport: data[0] }) %}
              | namedImports {% (data) => ({ namedImports: data[0] }) %}
              | namespaceImport {% (data) => ({namespaceImport: data[0]}) %}

defaultImport -> %string {% collectDefaultImport %}

namedImports -> %lbrace _ namedImportList _ %rbrace {% (data) => data[2] %}

namedImportList -> namedImport ( _ %comma _ namedImport ):* {%  collectNamedImportList %}

namedImport -> %string  _ %as _ %string {% collectNamedImport %}
  | %string {% collectNamedImport %}

namespaceImport -> %asterix _ %as _ %string {% data => data[4].text %}

# String literals for 'from' modules
fromClause -> variativeQuoate %string variativeQuoate {%  (data) => data[1].text %}

variativeQuoate -> %single_quote | %double_quote {% (data) => null %}

# Ignore anything else (whitespace)
_ -> (%wschar | %newline | %comment | %ml_comment):* {% () => null %}
