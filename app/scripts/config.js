/* © 2016 int3ractive.com
 * @author Thanh
 */
// eslint-disable-next-line
import Lockr from 'lockr';
import { i18n, t } from './i18n';

// universal Web Extension API
window.browser = window.msBrowser || window.browser || window.chrome;

/**
 * Quick and dirty method to compare 2 objects, with implicit conversion
 * @param  {*} a First object
 * @param  {*} b Second object
 * @return {Boolean}   equal?
 */
/*eslint eqeqeq:0*/
$.shallowEqual = function(a, b) {
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

};

let webStorage = null;
if ('browser' in window) {
	webStorage = browser && browser.storage && browser.storage.local;
}

/**
 * Augment the global Lockr object or Chrome Storage object to our Store object
 * Since the Chrome Storage object is asynchronous, we'll standardize our Store
 * object with Promise approach
 * and use Chrome Storage similar API
 * @type {Object}
 */
export const Store = {
	/**
	 * set data object to local storage
	 * @param {object} obj Object to save to local storage, data type
	 * (string, number, boolean, Object, Array) is mantained
	 * @return {object} the promise object which resolve when storing is done
	 */
	set(obj) {
		return new Promise((resolve/*, reject*/) => {
			if (webStorage) {
				webStorage.set(obj, () => {
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

		return new Promise((resolve/*, reject*/) => {
			if (webStorage) {
				webStorage.get(keys, (result) => {
					resolve(result);
				});
			} else {
				const result = {};
				keys.forEach((key) => {
					result[key] = Lockr.get(key);
				});

				resolve(result);
			}
		});
	},
};

export const Settings = {
	defaultCollectionId: '1507483',
	init() {
		// default
		this._settings = {
			language: navigator.language.includes('vi') ? 'vi' : 'en',
			wallpaperMode: 'unsplash', // unsplash or user
			userPhotoName: '', // file name to display at file selector
			collectionId: '1507483',
			activeQuicklinks: {
				gmail: true,
				gcalendar: false,
				gdrive: false,
				github: false,
				bitbucket: false,
				trello: false,
				facebook: true,
				twitter: true,
				gplus: false,
				tuoitre: false,
				vnexpress: true,
				thanhnien: false,
				gphotos: false,
				youtube: true,
				naujukebox: false,
			},
		};

		return Store.get(['settings']).then(result => {
			console.log('setting resume', result);
			this._settings = Object.assign(this._settings, result.settings);

			// init i18n first
			i18n.init(this._settings.language);

			this.initUI();

			// return whole settings object in resolve callback
			return this._settings;
		});
	},

	initUI() {
		$$('[name="setting-language"]')._.addEventListener('change', event => {
			console.log('event.target.value', event.target.value);
			this.set('language', event.target.value);
		});

		// listen to language change event to rerender locale
		this.subscribe('language', event => {
			console.log('language settings changed', event.value);
			i18n.switchLocale(event.value);
			this.renderLocale();
		});

		$$('[name="setting-wallpaper-mode"]')._.addEventListener('change', event => {
			console.log('event.target.value', event.target.value);
			this.set('wallpaperMode', event.target.value);
		});

		$('#unsplash-collection-id').addEventListener('change', event => {
			if (event.target.value.trim().length >= 6) {
				this.set('collectionId', event.target.value.trim());
			}
		});

		// file selector
		$('#setting-photo-selector-input').addEventListener('change', (event) => {
			console.log('file selector change:', event.target.files);
			const file = event.target.files[0];
			if (file.type.includes('image')) {
				this.set('userPhotoName', file.name);
				document._.fire('setting:userPhotoSelected', { file });
			} else {
				alert('Please select only file of type image (JPG, PNG)');
			}
		});

		$('#setting-quicklinks')._.delegate('change', '[type="checkbox"]', event => {
			console.log('event.target', event.target, event.target.checked);
			const input = event.target;
			const ql = this.get('activeQuicklinks');
			ql[input.dataset.linkId] = input.checked;
			this.set('activeQuicklinks', ql);
		});

		this.render();
	},

	render() {
		// language
		$('#setting-lang-' + this.get('language')).checked = true;
		this.renderLocale();

		// wallpaper modes
		$('#setting-wallpaper-mode-' + this.get('wallpaperMode')).checked = true;
		if (this.get('userPhotoName')) {
			$('#setting-photo-selector-label').textContent = this.get('userPhotoName');
		} else {
			$('#setting-photo-selector-label').textContent = t('choose_file');
		}

		$('#unsplash-collection-id').value = this.get('collectionId');

		const ql = this.get('activeQuicklinks');
		// console.log(ql);
		$$('#setting-quicklinks [type="checkbox"]').forEach(input => {
			input.checked = ql[input.dataset.linkId];
			// console.log(input.dataset.linkId, ql[input.dataset.linkId]);
		});
	},

	renderLocale() {
		$('html').setAttribute('lang', this.get('language'));

		// swap translate text content
		$$('[i18n]').forEach(el => {
			if (!el.hasAttribute('i18n-disabled')) {
				el.textContent = t(el.getAttribute('i18n'));
			}
		});
	},

	/**
	 * Subscribe to a change in settings
	 * @param  {string} key     Name of settings / key in store
	 * @param  {Function} handler Call back function
	 * @return {void}
	 * @example
	 * ```js
	 * import { Settings } from './config';
	 *
	 * Settings.subscribe('language', event => {
	 * 	console.log('New language', event.value);
	 * 	this.update();
	 * });
	 * ```
	 */
	subscribe(key, handler) {
		// we'll make use of DOM events for our custom events
		document.addEventListener('setting:' + key, handler);
	},

	get(key) {
		return this._settings[key];
	},

	set(key, value) {
		this._settings[key] = value;
		this.render();
		this.save(key);
	},

	save(key) {
		Store.set({ settings: this._settings }).then(() => {
			document._.fire('setting:' + key, { value: this._settings[key] });
		});
	},
};
