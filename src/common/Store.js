/* © 2019 int3ractive.com
 * @author Thanh
 */
import PersistStorage from './PersistStorage';
import { enQuotes, viQuotes } from './quotes';

const Store = {
	init(register) {
		register(this._handleEvent.bind(this));
		return this;
	},
	// default
	// prettier-ignore
	state: {
		lastPhotoFetch: 0, // timestamp
		// current wallpaper
		wallpaper: {
			imgUrl:
				'https://images.unsplash.com/photo-1462688681110-15bc88b1497c?dpr=1&auto=compress,format&w=1920&q=80&cs=tinysrgb',
			imgId: 'gzeUpbjoTUA',
			authorName: 'Hoach Le Dinh',
			authorUsername: 'hoachld',
			color: '#888888', // median color of the photo
		},
		nextPhoto: null,
		currentPhoto: null, // unsplash photo data, with structure similar to wallpaper
		userPhoto: null, // user photo data, with structure similar to wallpaper
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
		settingsActive: false,
		currentTime: { hours: 0, minutes: 0 },
		quote: {
			text: 'I dream, therefore, I become!',
			author: 'Cheryl Grossman',
		},
	},

	nosave: ['currentTime', 'quote', 'settingsActive'],

	/**
	 * Rehydrate states from persist storage to running store
	 * @return {Promise} resolve when all
	 */
	rehydrate() {
		const keys = Object.keys(this.state).filter(key => !this.nosave.includes(key));

		return PersistStorage.get(keys).then(result => {
			// console.log('rehydrate result', result);
			keys.forEach(key => {
				// remove undefined stored data
				if (result[key] === undefined) {
					delete result[key];
				}
			});
			this.state = Object.assign(this.state, result);
			this._dispatchEvent('statechange:all', this.state);

			// return whole states object in resolve callback
			return this.state;
		});
	},

	_handleEvent(event) {
		const action = event.action;
		const state = this.state;
		console.log('_handleEvent', action);

		switch (action.type) {
			case 'SET_CURRENT_TIME':
				this.save('currentTime', action.currentTime);
				break;
			case 'UPDATE_GREETING_NAME':
				this.save('greetingName', action.greetingName);
				break;
			case 'SET_SETTING_ACTIVE':
				this.set('settingsActive', action.settingsActive);
				break;
			case 'RANDOMIZE_QUOTE': {
				const quoteList = state.settings.language === 'vi' ? viQuotes : enQuotes;
				const randomQuote = quoteList[Math.floor(Math.random() * quoteList.length)];
				if (randomQuote) {
					this.set('quote', {
						text: randomQuote[0],
						author: randomQuote[1],
					});
				}
				break;
			}
			case 'UPDATE_SETTINGS':
				this.save('settings', action.settings);
				break;
			case 'UPDATE_USER_PHOTO':
				this.save('userPhoto', action.userPhoto);
				break;
			case 'UPDATE_CURRENT_PHOTO':
				this.save('currentPhoto', action.currentPhoto);
				break;
			case 'UPDATE_WALLPAPER':
				// set this wallpaper state to force rerender Wallpaper component
				this.save('wallpaper', action.wallpaper);
				break;
			case 'UPDATE_NEXT_PHOTO':
				this.save('nextPhoto', action.nextPhoto);
				this.save('lastPhotoFetch', action.lastPhotoFetch);
				break;
			default:
				console.warn('Unknown action:', action.type);
				break;
		}
	},

	// TODO: REMOVE LEGACY CODE ONCE DONE
	// /**
	//  * Subscribe to a change in settings
	//  * @param  {string} key     Name of settings / key in store
	//  * @param  {Function} handler Call back function
	//  * @return {void}
	//  * @example
	//  * ```js
	//  * import { Store } from './config';
	//  *
	//  * Store.subscribe('language', event => {
	//  * 	console.log('New language', event.language);
	//  * 	this.update();
	//  * });
	//  * ```
	//  */
	subscribe(key, handler) {
		// we'll make use of DOM events for our custom events
		document.addEventListener(`statechange:${key}`, handler);
	},

	get(key) {
		return this.state[key];
	},

	// /**
	//  * Set the state
	//  *
	//  * Input can be key-value params pair or a state object
	//  *
	//  * @param {*} key
	//  * @param {*} value
	//  */
	set(key, value) {
		let obj = key;

		if (typeof key === 'string' && value != null) {
			obj = { [key]: value };
		}

		Object.keys(obj).forEach(stateName => {
			this.state[stateName] = obj[stateName];
		});
	},

	// /**
	//  * Save state of each key and persist data if needed
	//  * @param {string} key
	//  * @param {*} value
	//  */
	save(key, value) {
		this.state[key] = value;
		if (this.nosave.includes(key)) {
			// just dispatch change event, won't persist the state
			this._dispatchEvent(`statechange:${key}`, { [key]: this.state[key] });

			return;
		}

		PersistStorage.set({ [key]: this.state[key] }).then(() => {
			this._dispatchEvent(`statechange:${key}`, { [key]: this.state[key] });
		});
	},

	// /**
	//  * simple event dispatcher using HTML Events and DOM inspired by Bliss
	//  * @param {string} type
	//  * @param {any} payload
	//  * @return {void}
	//  */
	_dispatchEvent(type, payload) {
		const event = document.createEvent('HTMLEvents');

		event.initEvent(type, true, true);

		// Return the result of dispatching the event, so we
		// can know if `e.preventDefault` was called inside it
		return document.dispatchEvent(Object.assign(event, payload));
	},
};

// FIXME: debug
window.store = Store;

export default Store;
