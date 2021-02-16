/* © 2017 int3ractive.com
 * @author Thanh
 */
import Lockr from 'lockr';

let webStorage = null;
if ('browser' in window) {
	// Chrome's extension storage
	webStorage = browser && browser.storage && browser.storage.local;
}

/**
 * Augment the global Lockr object or Chrome Storage object to our Store object
 * Since the Chrome Storage object is asynchronous, we'll standardize our Store
 * object with Promise approach
 * and use Chrome Storage similar API
 * @type {Object}
 */
const PersistStorage = {
	/**
	 * set data object to local storage
	 * @param {object} store Object to save to local storage, data type (string, number, boolean, Object, Array) is mantained
	 * @return {object} the promise object which resolve when storing is done
	 */
	set(store) {
		if (store == null || typeof store !== 'object') {
			throw new Error('store must be an object of states');
		}

		return new Promise((resolve /* , reject */) => {
			if (webStorage) {
				webStorage.set(store, () => {
					resolve(store);
				});
			} else {
				Object.keys(store).forEach(key => {
					Lockr.set(key, store[key]);
				});
				resolve(store);
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

		return new Promise((resolve /* , reject */) => {
			if (webStorage) {
				webStorage.get(keys, result => {
					resolve(result);
				});
			} else {
				const result = {};
				keys.forEach(key => {
					result[key] = Lockr.get(key);
				});

				resolve(result);
			}
		});
	},

	/**
	 * delete from local storage completely
	 * @param  {string|Array} keys key string or array of key string
	 * @return {object} the promise object which resolve when storing is done
	 */
	remove(keys) {
		if (typeof keys === 'string') {
			keys = [keys];
		} else if (!Array.isArray(keys)) {
			throw new Error('key must be either string or Array of key strings');
		}

		return new Promise((resolve /* , reject */) => {
			if (webStorage) {
				webStorage.remove(keys, () => {
					resolve(keys);
				});
			} else {
				keys.forEach(key => {
					Lockr.rm(key);
				});

				resolve(keys);
			}
		});
	},
};

export default PersistStorage;
