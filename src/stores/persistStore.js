/* © 2019 int3ractive.com
 * @author Thanh
 */
import { writable } from 'svelte/store';
import PersistStorage from '../common/PersistStorage';

const defaultState = {
	lastPhotoFetch: 0, // timestamp
	nextPhoto: null,
	currentPhoto: {
		imgUrl:
			'https://images.unsplash.com/photo-1462688681110-15bc88b1497c?dpr=1&auto=compress,format&w=1920&q=80&cs=tinysrgb',
		imgId: 'gzeUpbjoTUA',
		authorName: 'Hoach Le Dinh',
		authorUsername: 'hoachld',
		color: '#888888', // median color of the photo
	}, // unsplash photo data, with structure similar to wallpaper
	userPhoto: null, // user photo data, with structure similar to wallpaper
	greetingName: '',

	// TODO: migrate old settings to top level
	settings: null, // old settings group is now at top level
	// settings
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
};

const { subscribe, update } = writable(defaultState);

(async function() {
	const keys = Object.keys(defaultState);
	const incomingState = await PersistStorage.get(keys);

	keys.forEach(key => {
		// remove undefined stored data
		if (incomingState[key] === undefined) {
			delete incomingState[key];
		}
	});
	console.log('imcomingState', incomingState);

	update(currentState => {
		// TODO: use spread?
		// make sure new default settings are kept instead of being omitted
		const settings = Object.assign({}, currentState.settings, incomingState.settings);
		delete incomingState.settings;
		const state = Object.assign({}, currentState, incomingState, { settings });
		return state;
	});
})();

/**
 * Set the state (without persisting to local storage)
 *
 * Input can be key-value params pair or a state object
 *
 * @param {*} key
 * @param {*} value
 */
function setState(key, value) {
	update(state => {
		state[key] = value;
		return state;
	});
}

/**
 * Save state of each key and persist data if needed
 *
 * @param {string} key
 * @param {*} value
 */
function saveState(key, value) {
	PersistStorage.set({ [key]: value }).then(() => {
		update(state => {
			state[key] = value;
			return state;
		});
	});
}

export default { subscribe, setState, saveState };
