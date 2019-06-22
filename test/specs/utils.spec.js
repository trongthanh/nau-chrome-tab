import { shallowEqual, compareTimeObj, getDayPeriod, hasPeriodChanged } from 'src/common/utils';

describe('utils - shallowEqual()', () => {
	test('shallowEqual()', () => {
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

describe('utils - compareTimeObj()', () => {
	test('compareTimeObj()', () => {
		expect(compareTimeObj({ hours: 1, minutes: 20 }, { hours: 1, minutes: 20 })).toBe(true);
		expect(compareTimeObj({ hours: 1, minutes: 20 }, { hours: 1, minutes: 21 })).toBe(false);
	});
});

describe('utils - getDayPeriod()', () => {
	test('getDayPeriod()', () => {
		const today = new Date(2019, 5, 23);
		// night/early morning
		today.setHours(4);
		expect(getDayPeriod(today)).toBe('night');
		today.setHours(5);
		expect(getDayPeriod(today)).toBe('dawn');
		today.setHours(8);
		expect(getDayPeriod(today)).toBe('day');
		today.setHours(14);
		expect(getDayPeriod(today)).toBe('day');
		today.setHours(18);
		expect(getDayPeriod(today)).toBe('dusk');
		today.setHours(20);
		expect(getDayPeriod(today)).toBe('night');
	});
});

describe('utils - hasPeriodChanged()', () => {
	test('hasPeriodChanged()', () => {
		const dawn1 = new Date(2019, 5, 23, 5);
		const dawn2 = new Date(2019, 5, 23, 6);
		const morning1 = new Date(2019, 5, 23, 10);
		const morning2 = new Date(2019, 5, 23, 15);
		const dusk1 = new Date(2019, 5, 23, 18);
		const dusk2 = new Date(2019, 5, 23, 19);
		const night1 = new Date(2019, 5, 23, 22);
		const night2 = new Date(2019, 5, 23, 2);

		expect(hasPeriodChanged(dawn1, dawn2)).toBe(false);
		expect(hasPeriodChanged(dawn1, morning1)).toBe(true);
		expect(hasPeriodChanged(morning1, morning2)).toBe(false);
		expect(hasPeriodChanged(morning2, dusk1)).toBe(true);
		expect(hasPeriodChanged(dusk1, dusk2)).toBe(false);
		expect(hasPeriodChanged(dusk2, night1)).toBe(true);
		expect(hasPeriodChanged(night1, night2)).toBe(false);
	});
});
