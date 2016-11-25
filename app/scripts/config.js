/* © 2016 int3ractive.com
 * @author Thanh
 */
/**
 * This is initial config and namespace for the page
 * @type {Object}
 */
var nau = {}; //eslint-disable-line

/**
 * Quick and dirty method to compare 2 objects, with implicit conversion
 * @param  {*} a First object
 * @param  {*} b Second object
 * @return {Boolean}   equal?
 */
/*eslint eqeqeq:0*/
$.shallowEqual = function(a, b) {
	let isEqual = a == b;
	if (isEqual) {
		return true;
	}

	if (typeof a === 'object' && typeof b === 'object') {
		let props = Object.keys(a).concat(Object.keys(b));
		// let's not worry prop duplication for now
		return props.every((prop) => (a[prop] == b[prop]));
	} else {
		return false;
	}
};
