
@{%
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
%}

@preprocessor typescript
@lexer lexer

#main rule
program -> shebang:? importBlock:* restCode:* {% joinData %}

shebang -> %directive

importBlock -> restCode:* importStatement

restCode -> %ws | %nl | %multiLineComment | %inlineComment | %identifier | %otherChars | %number | %semicolon | %string | %kwImport | %colon | %comma | %lbrace | %rbrace

# import rule
importStatement -> sideEffectImportStatement {% id %} 
                | defaultImportStatement {% id %}
               
defaultImportStatement -> %kwImport _ importClause _ %kwFrom _ fromClause _ importAttributes:? {% collectDefaultImportStatement %}

sideEffectImportStatement -> %kwImport _ %string {% collectSideEffectImport %}

importAttributes -> %kwWith _ %lbrace _ importAttributesList _ %rbrace _ {% joinData %} # modern with
                | %identifier _ %lbrace _ importAttributesList _ %rbrace _ {% joinData %} # deprecated assert

importAttributesList -> importAttribute ( _ %comma _ importAttribute ):* {% joinData %}
importAttribute -> %identifier _ %colon _ %string {% joinData %}

# importClause can handle default, named, and namespace imports
importClause -> defaultImport _ %comma _ namedImports {% collectDefaultAndNamedImports %}
              | defaultImport {% collectDefaultImportClause %}
              | namedImports {% collectNamedImportsClause %}
              | namespaceImport {% collectNamespaceImportClause %}

defaultImport -> typeSpecifier:? %identifier {% collectDefaultImport %}

namedImports -> typeSpecifier:? %lbrace _ namedImportList _ %rbrace {% collectNamedImports %}

namedImportList -> namedImport ( _ %comma _ namedImport ):* {%  collectNamedImportList %}

namedImport -> typeSpecifier:? %identifier  _ %as _ %identifier {% collectNamedImport %}
  | typeSpecifier:? %identifier {% collectNamedImport %}

namespaceImport -> %asterix _ %as _ %string {% joinData %}

fromClause -> %string {%  collectFrom %}

typeSpecifier -> %identifier _ {% joinData %}

_ -> (%ws | %nl | %multiLineComment | %inlineComment):*

