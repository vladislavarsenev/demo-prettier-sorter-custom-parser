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

	it('group imports by option', async () => {
		const code = `import module from "@a/b"
import module from "@b/a"
import module from "@a/a"
`;
		const formatted = await prettier.format(code, {
			parser: 'typescript',
			plugins: [Plugin],
			importOrder: ['@a/*', '@b/*'],
		});

		expect(formatted).toEqual(`import module from "@a/a";
import module from "@a/b";
import module from "@b/a";
`);
	});

	it('should dont touch side effect when sorting by groups when option presented', async () => {
		const code = `import module from "@a/b"
import module from "@a/a"
import "module"
import module from "@b/a"
import module from "@a/a"
`;
		const formatted = await prettier.format(code, {
			parser: 'typescript',
			plugins: [Plugin],
			importOrder: ['@a/*', '@b/*'],
			importOrderSideEffects: false,
		});

		expect(formatted).toEqual(`import module from "@a/a";
import module from "@a/b";
import "module";
import module from "@a/a";
import module from "@b/a";
`);
	});

	it('should ignore export inside imports', async () => {
		const code = `import { a } from "./a"
export { a } from "./a"
`;
		const formatted = await prettier.format(code, {
			parser: 'typescript',
			plugins: [Plugin],
		});

		expect(formatted).toEqual(`import { a } from "./a";

export { a } from "./a";\n`);
	});
});
