
@{%
import moo from "moo";

function collectComments(data: any) {
  if (data == null) return []

  const isComment = data?.type === 'comment' || data?.type === 'ml_comment'

  if(isComment) {
    return [data?.text]
  }

  return data.flatMap(collectComments)
}

function addLeadingComments(str: String, arg: {tralingComments: String, leadingComments: String}) {
  const trailingCommentsStr = arg.tralingComments.join('')
  const leadingCommentsStr = arg.leadingComments.join('')

  return str ? `${leadingCommentsStr}${str}${trailingCommentsStr}` : str
}

function collectDefaultImportStatemenet(data: any) {
  
  const leadingComments = data[2] ?? []
  const tralingComments = data[4] ?? []

  const comments = { leadingComments, tralingComments }

  return {
    defaultImport: addLeadingComments(data[3].defaultImport, comments),
    namespaceImport: addLeadingComments(data[3].namespaceImport, comments),
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
  comment: /\/\/.*?$/,
  ml_comment: /\/\*[\s\S]*?\*\//,
  string: /[\.\/a-zA-Z0-9_]+(?<!\/)/,
  wschar: /[ \t\r]+/,
  lbrace: "{",
  rbrace: "}",
  semicolon: ";",
  comma: ",",
  from: "from",
  single_quote: "'",
  double_quote: '"',
  importLit: "import",
  as: "as",
  asterix: "*",
  newline: { match: /\n/, lineBreaks: true },
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
_ -> ( ws | %comment | %ml_comment):* {% collectComments %}

ws -> (%wschar | %newline) {% () => null %}