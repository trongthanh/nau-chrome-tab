/* © 2019 int3ractive.com
 * @author Thanh
 */
import PersistStorage from './PersistStorage';
import { enQuotes, viQuotes } from './quotes';
import Timer from './Timer';

const Store = {
	init(register) {
		register(this._handleEvent.bind(this));

		Timer.start();
		return this;
	},

	// internal dispatch method for store, should not be used outside
	_dispatch(action) {
		if (this._stateSaving) {
			setTimeout(() => {
				this._handleEvent({ action });
			}, 16);
			return;
		}

		// handle event immediately
		this._handleEvent({ action });
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
			clockDisplay: 'center', // center, blend or mini
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
			// make sure new default settings are kept instead of being omitted
			const settings = Object.assign({}, this.state.settings, result.settings);
			delete result.settings;
			this.state = Object.assign(this.state, result, { settings });

			// return whole states object in resolve callback
			return this.state;
		});
	},

	_handleEvent(event) {
		const action = event.action;
		const state = this.state;
		console.log('_handleEvent', action);
		this._stateSaving = true;

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
			case 'UPDATE_SETTINGS': {
				const newWallpaperMode = action.settings.wallpaperMode;
				const currentWallpaperMode = state.settings.wallpaperMode;

				this.save('settings', action.settings).then(() => {
					if (newWallpaperMode !== currentWallpaperMode) {
						if (newWallpaperMode === 'user' && state.userPhoto) {
							this._dispatch({
								type: 'UPDATE_WALLPAPER',
								wallpaper: state.userPhoto,
							});
						} else {
							this._dispatch({
								type: 'UPDATE_WALLPAPER',
								wallpaper: state.currentPhoto,
							});
						}
					}
				});
				break;
			}
			case 'UPDATE_USER_PHOTO':
				this.save('userPhoto', action.userPhoto).then(() => {
					if (state.settings.wallpaperMode === 'user') {
						this._dispatch({
							type: 'UPDATE_WALLPAPER',
							wallpaper: action.userPhoto,
						});
					}
				});

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

	/**
	 * Set the state
	 *
	 * Input can be key-value params pair or a state object
	 *
	 * @param {*} key
	 * @param {*} value
	 */
	set(key, value) {
		this.state[key] = value;
		this._stateSaving = false;
	},
	/**
	 * Save state of each key and persist data if needed
	 * @param {string} key
	 * @param {*} value
	 */
	save(key, value) {
		this.state[key] = value;

		return PersistStorage.set({ [key]: this.state[key] }).then(() => {
			this._stateSaving = false;
		});
	},
};

// FIXME: debug
window.store = Store;

export default Store;
