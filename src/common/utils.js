/* © 2017 int3ractive.com
 * @author Thanh
 */

/* eslint-disable eqeqeq */
export function shallowEqual(a, b) {
	const isEqual = a == b;
	if (isEqual) {
		return true;
	}

	if (typeof a === 'object' && typeof b === 'object') {
		const props = Object.keys(a).concat(Object.keys(b));

		// let's not worry prop duplication for now
		return props.every(prop => a[prop] == b[prop]);
	}

	return false;
}
