import { describe, expect, test } from 'vitest';
import { isThirdPartyLibrary } from '../is-third-party-library';

describe('isThirdPartyLibrary', () => {
	test('should return true if the import name starts with . or ..', () => {
		expect(isThirdPartyLibrary('test')).toBe(true);
	});

	test('should return false if the import name is a relative path', () => {
		expect(isThirdPartyLibrary('./test')).toBe(false);
	});
});
