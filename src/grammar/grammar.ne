
@{%
import { collectComments } from './collect-comments'
import { collectDefaultImportStatement } from './collect-default-import-statement'
import { collectSideEffectImport } from './collect-side-effect-import'
import { collectNamedImport } from './collect-named-import'
import { collectNamedImportList } from './collect-named-import-list'
import { collectDefaultImport } from './collect-default-import'
import { collectImportAttribute } from './collect-import-attribute'
import { collectDefaultAndNamedImports } from './collect-default-and-named-imports'
import { collectNamedImports } from './collect-named-imports'
import { collectDefaultImportClause } from './collect-default-import-clause'
import { collectNamedImportsClause } from './collect-named-imports-clause'
import { collectNamespaceImportClause } from './collect-namespace-import-clause'
import { collectFrom } from './collect-from'
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
               
defaultImportStatement -> _ %importLit _ importClause _ %from _ fromClause _ importAttributes:? %semicolon:* %newline:? {% collectDefaultImportStatement %}

sideEffectImportStatement -> _ %importLit _ fromClause _  %semicolon:*  {% collectSideEffectImport %}

importAttributes -> %withLiteral _ %lbrace _ importAttributesList _ %rbrace _ {% joinData %} # modern with
                | %assertLiteral _ %lbrace _ importAttributesList _ %rbrace _ {% joinData %} # deprecated assert

importAttributesList -> importAttribute ( _ %comma _ importAttribute ):* {% joinData %}
importAttribute -> importAttributeKey _ %colon _ variativeQuote %string variativeQuote {% joinData %}
importAttributeKey -> %string {% data => data[0].text %}

# importClause can handle default, named, and namespace imports
importClause -> defaultImport _ %comma _ namedImports {% collectDefaultAndNamedImports %}
              | defaultImport {% collectDefaultImportClause %}
              | namedImports {% collectNamedImportsClause %}
              | namespaceImport {% collectNamespaceImportClause %}

defaultImport -> %string {% collectDefaultImport %}

namedImports -> %lbrace _ namedImportList _ %rbrace {% collectNamedImports %}

namedImportList -> namedImport ( _ %comma _ namedImport ):* {%  collectNamedImportList %}

namedImport -> %string  _ %as _ %string {% collectNamedImport %}
  | %string {% collectNamedImport %}

namespaceImport -> %asterix _ %as _ %string {% joinData %}

# String literals for 'from' modules
fromClause -> variativeQuote %string variativeQuote {%  collectFrom %}

variativeQuote -> %single_quote | %double_quote {% joinData %}

# Ignore anything else (whitespace)
_ -> ( ws | %comment | %ml_comment):* {% joinData %}

ws -> (%wschar | %newline) {% joinData %}