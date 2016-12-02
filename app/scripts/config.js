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
	 * @return {*}        The newly defined value / object
	 */
	define(moduleName, value) {
		'use strict';
		Object.defineProperty(this, moduleName, {
			enumerable: true,
			configurable: false,
			writable: false,
			value: value,
		});

		return this[moduleName];
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

(function() {
	'use strict';
	let chromeStorage = null;
	if ('chrome' in window) {
		chromeStorage = chrome && chrome.storage && chrome.storage.local;
	}
	/**
	 * Augment the global Lockr object or Chrome Storage object to our Store object
	 * Since the Chrome Storage object is asynchronous, we'll standardize our Store object with Promise approach
	 * and use Chrome Storage similar API
	 * @type {Object}
	 */
	const Store = nau.define('Store', {
		/**
		 * set data object to local storage
		 * @param {object} obj Object to save to local storage, data type (string, number, boolean, Object, Array) is mantained
		 * @return {object} the promise object which resolve when storing is done
		 */
		set(obj) {
			return new Promise((resolve, reject) => {
				if (chromeStorage) {
					chromeStorage.set(obj, () => {
						resolve(obj);
					});
				} else {
					Object.keys(obj)
						.forEach(key => {
							Lockr.set(key, obj[key]);
						});
					resolve(obj);
				}
			});
		},

		/**
		 * get stored data
		 * @param  {string|Array} keys key string or array of key string
		 * @return {object} The result object
		 */
		get(keys) {
			if (typeof keys === 'string') {
				keys = [keys];
			} else if (!Array.isArray(keys)) {
				throw new Error('key must be either string or Array of key strings');
			}

			return new Promise((resolve, reject) => {
				if (chromeStorage) {
					chromeStorage.get(keys, (result) => {
						resolve(result);
					});
				} else {
					let result = {};
					keys.forEach((key) => {
						result[key] = Lockr.get(key);
					});

					resolve(result);
				}
			});
		},
	});

	nau.define('Settings', {

		init() {
			// default
			this._settings = {
				wallpaperMode: 'unsplash'
			};

			return Store.get('settings').then(result => {
				console.log('setting resume', result);
				this._settings = Object.assign(this._settings, result.settings);
				this.initUI();
			});
		},

		initUI() {
			// wallpaper modes
			$('#setting-wallpaper-mode-' + this.get('wallpaperMode')).checked = true;

			$$('[name="setting-wallpaper-mode"]')._.addEventListener('change', event => {
				console.log('event.target.value', event.target.value);
				this.set('wallpaperMode', event.target.value);
			});

			// file selector
			$('#setting-photo-selector').addEventListener('change', (event) => {
				console.log('file selector change:', event.target.files);
			});
		},

		subscribe(key, handler) {
			// we'll make use of DOM events for our custom events
			document.addEventListener('setting:' + key, handler);
		},

		get(key) {
			return this._settings[key];
		},

		set(key, value) {
			this._settings[key] = value;
			this.save(key);
		},

		save(key) {
			nau.Store.set({settings: this._settings}).then(() => {
				document._.fire('setting:' + key, { value: this._settings[key]});
			});
		}
	});
}());
