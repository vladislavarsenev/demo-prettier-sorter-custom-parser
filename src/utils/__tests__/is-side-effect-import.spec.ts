import { describe, expect, it } from 'vitest';
import { isSideEffectImport } from '../is-side-effect-import';

describe('isSideEffectImport', () => {
	it('should return true if the import is a side effect import', () => {
		const importItem = {
			hasDefaultImport: false,
			hasNamedImports: false,
			hasNamespaceImport: false,
			hasSideEffectImport: true,
			text: 'import "aFile"',
			from: '',
		};

		expect(isSideEffectImport(importItem)).toBe(true);
	});

	it('should return false if the import is not a side effect import', () => {
		const importItem = {
			hasDefaultImport: false,
			hasNamedImports: false,
			hasNamespaceImport: false,
			hasSideEffectImport: false,
			text: 'import "aFile"',
			from: '',
		};

		expect(isSideEffectImport(importItem)).toBe(false);
	});
});
