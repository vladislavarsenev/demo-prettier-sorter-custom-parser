import { describe, expect, it } from 'vitest';
import { flatten } from '../flatten';

describe('flatten', () => {
	it('should flat the array', () => {
		expect(flatten([1, [2, [3, 4]]])).toEqual([1, 2, 3, 4]);
	});
});
