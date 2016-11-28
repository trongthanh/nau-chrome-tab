/* © 2016 int3ractive.com
 * @author Thanh
 */
/**
 * This is initial config and namespace for the page
 * @type {Object}
 */
/*global Lockr:true*/

//eslint-disable-next-line
var nau = {
	/**
	 * Create a new module under this namespace, making it immutable to avoid writing by mistake
	 * The module is accessible via normal object.property access
	 * @param  {string} moduleName Name of the module.
	 * @param  {*} value  Value of the module
	 * @return {nau}        `nau` object
	 */
	define(moduleName, value) {
		'use strict';
		return Object.defineProperty(this, moduleName, {
			enumerable: true,
			configurable: false,
			writable: false,
			value: value,
		});
	}
};

// make the define method unwritable
Object.defineProperty(nau, 'define', {
	enumerable: true,
	configurable: false,
	writable: false,
	value: nau.define,
});

/**
 * Augment the global Lockr object to our singleton
 * @type {Object}
 */
nau.define('Store', Lockr);

/**
 * Quick and dirty method to compare 2 objects, with implicit conversion
 * @param  {*} a First object
 * @param  {*} b Second object
 * @return {Boolean}   equal?
 */
/*eslint eqeqeq:0*/
$.shallowEqual = function(a, b) {
	'use strict';
	let isEqual = a == b;
	if (isEqual) {
		return true;
	}

	if (typeof a === 'object' && typeof b === 'object') {
		let props = Object.keys(a).concat(Object.keys(b));
		// let's not worry prop duplication for now
		return props.every(prop => a[prop] == b[prop]);
	} else {
		return false;
	}
};
