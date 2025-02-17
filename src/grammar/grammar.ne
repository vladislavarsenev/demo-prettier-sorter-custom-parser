
@{%
import { collectComments } from './collect-comments'
import { collectDefaultImportStatement } from './collect-default-import-statement'
import { collectSideEffectImport } from './collect-side-effect-import'
import { collectNamedImport } from './collect-named-import'
import { collectNamedImportList } from './collect-named-import-list'
import { collectDefaultImport } from './collect-default-import'
import { collectImportAttribute } from './collect-import-attribute'
import { joinData } from './join-data'
import { lexer } from './lexer'
%}

@lexer lexer
@preprocessor typescript

# main rule
program -> importStatement:* {% id %}

# import rule
importStatement -> sideEffectImportStatement {% id %} 
                | defaultImportStatement {% id %}
               
defaultImportStatement -> _ %importLit _ importClause _ %from _ fromClause _ importAttributes:? %semicolon:* {% collectDefaultImportStatement %}

sideEffectImportStatement -> _ %importLit _ fromClause _  %semicolon:*  {% collectSideEffectImport %}

importAttributes -> %withLiteral _ %lbrace _ importAttributesList _ %rbrace _ {% joinData %} # modern with
                | %assertLiteral _ %lbrace _ importAttributesList _ %rbrace _ {% joinData %} # deprecated assert

importAttributesList -> importAttribute ( _ %comma _ importAttribute ):* {% joinData %}
importAttribute -> importAttributeKey _ %colon _ variativeQuote %string variativeQuote {% joinData %}
importAttributeKey -> %string {% data => data[0].text %}

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
fromClause -> variativeQuote %string variativeQuote {%  (data) => data[1].text %}

variativeQuote -> %single_quote | %double_quote {% (data) => null %}

# Ignore anything else (whitespace)
_ -> ( ws | %comment | %ml_comment):* {% collectComments %}

ws -> (%wschar | %newline) {% () => null %}