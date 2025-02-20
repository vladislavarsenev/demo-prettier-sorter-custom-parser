## Why
This is a POC of the possibility to parse and render import clauses without using AST by `Nearley` parser. 

## Bundle size

```sh
Size limit: 10 kB
Size:       8.74 kB with all dependencies, minified and brotlied
```

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
- [ ] it doesn't move some code before imports. Because it thinks that before imports could be only shebang or directives with comments.
- [ ] add legacy `with` attribute
- [ ] plugins now puts new line after shebang. Should we make exception in this case?
- [ ] it doesn't handle many groups of imports within one file. e.g. multiple svelte <script> blocks, multiple module declation in typescript.

