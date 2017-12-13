import { shallowEqual } from '@/common/utils';

describe('utils', () => {
	it('shallowEqual()', () => {
		expect(shallowEqual('1', 4)).toBe(false);
		expect(shallowEqual('1', 1)).toBe(true);
		expect(shallowEqual('10', 10)).toBe(true);
		expect(shallowEqual('10', 1)).toBe(false);
		expect(shallowEqual({ a: 1, b: 2 }, [])).toBe(false);
		expect(shallowEqual({ a: 1, b: 2 }, { a: 1, b: 2, c: null })).toBe(true);
		expect(shallowEqual({ a: 1, b: 2 }, { a: 1, b: 2, c: 3 })).toBe(false);
		expect(shallowEqual({ a: 1, b: 2 }, { a: 1, b: 2, c: '' })).toBe(false);
		expect(shallowEqual({ a: 1, b: 2 }, { a: 1, b: 2, c: '0' })).toBe(false);
	});
});
