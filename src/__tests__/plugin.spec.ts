import * as prettier from 'prettier';
import { describe, expect, it } from 'vitest';
import Plugin from '../';

describe('prettier plugin', () => {
    it('formats code', async () => {
        const code = `import B from "b"
import A from "a"

const x = 8;`;
        const formatted = await prettier.format(code, {
            parser: 'typescript',
            plugins: [Plugin],
        });

        expect(formatted).toEqual(`import A from "a";
import B from "b";

const x = 8;
`);
    });

    it('formats code with leading comments', async () => {
        const code = `import B from "b"
/* leading comment */

import A from "a"

const x = 8;`;
        const formatted = await prettier.format(code, {
            parser: 'typescript',
            plugins: [Plugin],
        });

        expect(formatted).toEqual(`/* leading comment */
import A from "a";
import B from "b";

const x = 8;
`);
    });
});
