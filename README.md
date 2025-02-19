## Why
This is a POC of the possibility to parse and render import clauses without using AST by `Nearley` parser. 

## Bundle size

```sh
dist/prettier-sort.js  31.96 kB │ gzip: 8.46 kB
dist/prettier-sort.umd.cjs  22.10 kB │ gzip: 7.51 kB
```

## What has been done
- Implemented parsing all kinds of imports described in the ES Modules specification from any file:
  - `import "file"`
  - `import * as someModules from "file"`
  - `import defaultModule from "file"`
  - `import { lib } from "file"`
  - `import { libA as libB } from "file"`
  - and their combinations
- Alphabetical sorting
- Replace initial imports with sorted ones

## How to manage
- pnpm build - build the project into a module. The module wasn't tested on real files, due to demonstration purposes. Not recommended for production.
- pnpm test - runs tests in watch mode
- pnpm size - check bundle size
- pnpm compile - compile `Nearley` grammar into a JS file


## TBD
- [x] searching imports in file
- [x] removing mentions of imports from the file
- [x] sorting of import in natural order
- [x] support `importOrderCaseInsensitive`
- [x] support `importOrder`
- [x] support `importOrderSideEffects`
- [x] sort third-party imports according place of `<THIRD_PARTY_MODULES>`
- [x] sorting specifiers
- [x] adding new line after group
- [x] support importOrderGroupNamespaceSpecifiers
- [x] add with/assertion literal
- [x] refactor code and preserve all characters in import lines
- [x] add support importing types
- [x] add snapshot tests for angular/svelte/typescript/flow
- [ ] ignore sorting where "sort-imports-ignore" is placed
- [ ] add legacy `with` attribute

