/* © 2017 int3ractive.com
 * @author Thanh
 */
import PersistStorage from './PersistStorage';

const Store = {
	// default
	// prettier-ignore
	states: {
		lastPhotoFetch: 0, // timestamp
		nextPhoto: '',
		currentPhoto: {
			imgUrl:
				'https://images.unsplash.com/photo-1462688681110-15bc88b1497c?dpr=1&auto=compress,format&w=1920&q=80&cs=tinysrgb',
			imgId: 'gzeUpbjoTUA',
			authorName: 'Hoach Le Dinh',
			authorUsername: 'hoachld',
		},
		userPhoto: '',
		settings: {
			// these properties must be inside 'settings' due to legacy versions used them
			language: navigator.language.includes('vi') ? 'vi' : 'en',
			wallpaperMode: 'unsplash', // unsplash or user
			userPhotoName: '', // file name to display at file selector
			activeQuicklinks: {
				gmail: true,
				gcalendar: false,
				gdrive: false,
				github: false,
				bitbucket: false,
				trello: false,
				facebook: true,
				twitter: false,
				gplus: false,
				tuoitre: false,
				vnexpress: true,
				thanhnien: false,
				gphotos: false,
				youtube: false,
				naujukebox: false,
			},
		},
		greetingName: '',

		// run-time state, won't be saved
		currentTime: { hours: 0, minutes: 0 },
		quote: {
			text: 'I dream, therefore, I become!',
			author: 'Cheryl Grossman',
		},
	},

	nosave: ['currentTime', 'quote'],

	/**
	 * Rehydrate states from persist storage to running store
	 * @return {Promise} resolve when all
	 */
	rehydrate() {
		const keys = ['settings', 'lastPhotoFetch', 'currentPhoto', 'nextPhoto', 'userPhoto', 'greetingName'];

		return PersistStorage.get(keys).then(result => {
			// console.log('rehydrate result', result);
			keys.forEach(key => {
				// remove undefined stored data
				if (result[key] === undefined) {
					delete result[key];
				}
			});
			this.states = Object.assign(this.states, result);
			this._dispatchEvent('statechange:all', this.states);

			// return whole states object in resolve callback
			return this.states;
		});
	},

	/**
	 * Subscribe to a change in settings
	 * @param  {string} key     Name of settings / key in store
	 * @param  {Function} handler Call back function
	 * @return {void}
	 * @example
	 * ```js
	 * import { Store } from './config';
	 *
	 * Store.subscribe('language', event => {
	 * 	console.log('New language', event.language);
	 * 	this.update();
	 * });
	 * ```
	 */
	subscribe(key, handler) {
		// we'll make use of DOM events for our custom events
		document.addEventListener('statechange:' + key, handler);
	},

	get(key) {
		return this.states[key];
	},

	/**
	 * Set the state
	 *
	 * Input can be key-value params pair or a state object
	 *
	 * @param {*} key
	 * @param {*} value
	 */
	set(key, value) {
		let obj = key;

		if (typeof key === 'string' && value != null) {
			obj = { [key]: value };
		}

		Object.keys(obj).forEach(stateName => {
			this.states[stateName] = obj[stateName];
			this.save(stateName);
		});
	},

	save(key) {
		if (!this.nosave.includes(key)) {
			PersistStorage.set({ [key]: this.states[key] }).then(() => {
				this._dispatchEvent('statechange:' + key, { [key]: this.states[key] });
			});
		}
	},

	/**
	 * simple event dispatcher using HTML Events and DOM inspired by Bliss
	 * @param {string} type
	 * @param {any} payload
	 * @return {void}
	 */
	_dispatchEvent(type, payload) {
		const evt = document.createEvent('HTMLEvents');

		evt.initEvent(type, true, true);

		// Return the result of dispatching the event, so we
		// can know if `e.preventDefault` was called inside it
		return document.dispatchEvent(Object.assign(evt, payload));
	},
};

export default Store;
