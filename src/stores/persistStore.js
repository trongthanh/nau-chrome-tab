/* © 2019 int3ractive.com
 * @author Thanh
 */
import { writable } from 'svelte/store';
import PersistStorage from '../common/PersistStorage';

const defaultState = {
	_rehydrated: false, // flag to check if we're still rehydrating
	lastPhotoFetch: 0, // timestamp
	nextPhoto: null,
	currentPhoto: {
		imgUrl:
			'https://images.unsplash.com/photo-1522988796650-2cc783a2a4b3?dpr=1&auto=compress,format&w=1920&q=80&cs=tinysrgb',
		imgId: 'MINzDVNWOWU',
		authorName: 'Lê Tân',
		authorUsername: 'ktsfish',
		color: '#888888',
	}, // unsplash photo data
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
		gcalendar: true,
		gdrive: true,
		github: false,
		bitbucket: false,
		trello: false,
		facebook: true,
		twitter: true,
		gplus: false,
		tuoitre: true,
		vnexpress: false,
		thanhnien: false,
		gphotos: false,
		youtube: true,
		naujukebox: false,
	},
};

const { subscribe, update } = writable(defaultState);

// eslint-disable-next-line
(async function() {
	const keys = Object.keys(defaultState).filter(key => key !== '_rehydrated');
	const incomingState = await PersistStorage.get(keys);

	const unsaved = {};
	let unsavedCount = 0;
	keys.forEach(key => {
		// console.log(incomingState[key]);
		// remove undefined stored data
		if (incomingState[key] === undefined) {
			delete incomingState[key];
			unsaved[key] = defaultState[key];
			unsavedCount += 1;
		}
	});
	console.log('imcomingState', incomingState);
	console.log('unsaved', unsaved);

	update(currentState => {
		// make sure new default settings are kept instead of being omitted
		const settings = { ...currentState.settings, ...incomingState.settings };
		delete incomingState.settings;
		const state = { ...currentState, ...incomingState, settings, _rehydrated: true };
		console.log('NOW state', state);
		return state;
	});

	if (unsavedCount) {
		// save the unsaved
		PersistStorage.set(unsaved).then(() => {
			console.log('persist unsaved data');
		});
	}
})();

/**
 * Set the state (without persisting to local storage)
 *
 * Input can be key-value params pair or a state object
 *
 * @param {*} key
 * @param {*} value
 * TODO: use the form {state} as param instead
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
 * TODO: use the form {state} as param instead
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
