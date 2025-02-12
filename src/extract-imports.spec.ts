import { describe, expect, it } from 'vitest';
import { extractImports } from './extract-imports';

describe('extract-imports.ts', () => {
    it('should extract default import', () => {
        expect(extractImports("import module from 'file'")).toEqual({
            startLoc: 0,
            endLoc: 25,

            imports: [
                { defaultImport: 'module', from: 'file', leadingComments: [] },
            ],
        });
    });

    it('should extract namespace import', () => {
        expect(extractImports("import * as module from 'file'")).toEqual({
            startLoc: 0,
            endLoc: 30,
            imports: [
                {
                    namespaceImport: 'module',
                    from: 'file',
                    leadingComments: [],
                },
            ],
        });
    });

    it('should extract named imports', () => {
        const source = `import { module } from 'file'

const x = 5
    `;

        expect(extractImports(source)).toEqual({
            startLoc: 0,
            endLoc: 29,
            imports: [
                {
                    namedImports: [{ alias: undefined, name: 'module' }],
                    defaultImport: undefined,
                    namespaceImport: undefined,
                    from: 'file',
                    leadingComments: [],
                },
            ],
        });
    });

    it('should extract multiline named imports', () => {
        const source = `import {
  module,
  another
} from 'file'`;

        expect(extractImports(source)).toEqual({
            startLoc: 0,
            endLoc: 42,
            imports: [
                {
                    defaultImport: undefined,
                    namespaceImport: undefined,
                    namedImports: [
                        { alias: undefined, name: 'module' },
                        { alias: undefined, name: 'another' },
                    ],
                    from: 'file',
                    leadingComments: [],
                },
            ],
        });
    });

    it('should extract one line multiple imports', () => {
        const source = `import { module } from 'file';;;;;; import { another } from 'another'`;

        expect(extractImports(source)).toEqual({
            startLoc: 0,
            endLoc: 69,
            imports: [
                {
                    defaultImport: undefined,
                    namespaceImport: undefined,
                    namedImports: [{ alias: undefined, name: 'module' }],
                    from: 'file',
                    leadingComments: [],
                },
                {
                    defaultImport: undefined,
                    namespaceImport: undefined,
                    namedImports: [{ alias: undefined, name: 'another' }],
                    from: 'another',
                    leadingComments: [],
                },
            ],
        });
    });

    it('should extract multiple with reduntant semicolons', () => {
        const source = `    import { module } from 'file';;;;`;

        expect(extractImports(source)).toEqual({
            startLoc: 0,
            endLoc: 33,
            imports: [
                {
                    defaultImport: undefined,
                    namespaceImport: undefined,
                    namedImports: [{ alias: undefined, name: 'module' }],
                    from: 'file',
                    leadingComments: [],
                },
            ],
        });
    });

    it('should extract multiple imports with directive in the beggining', () => {
        const source = `"use client"
import { module } from 'file'`;

        expect(extractImports(source)).toEqual({
            startLoc: 14,
            endLoc: 42,
            imports: [
                {
                    defaultImport: undefined,
                    namespaceImport: undefined,
                    namedImports: [{ alias: undefined, name: 'module' }],
                    from: 'file',
                    leadingComments: [],
                },
            ],
        });
    });

    it('parses side-effect imports', () => {
        const source = `import 'file'`;

        expect(extractImports(source)).toEqual({
            startLoc: 0,
            endLoc: 13,
            imports: [
                {
                    from: 'file',
                    leadingComments: [],
                },
            ],
        });
    });
});
