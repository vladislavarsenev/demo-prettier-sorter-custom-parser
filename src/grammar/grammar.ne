
@{%
import { collectComments } from './collect-comments'
import { collectDefaultImportStatement } from './collect-default-import-statement'
import { collectSideEffectImport } from './collect-side-effect-import'
import { collectNamedImport } from './collect-named-import'
import { collectNamedImportList } from './collect-named-import-list'
import { collectDefaultImport } from './collect-default-import'
import { lexer } from './lexer'
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
               
defaultImportStatement -> _ %importLit _ importClause _ %from _ fromClause _ %semicolon:? {% collectDefaultImportStatement %}

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