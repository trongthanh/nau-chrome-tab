/* © 2019 int3ractive.com
 * @author Thanh
 */
import { writable } from 'svelte/store';
import PersistStorage from '../common/PersistStorage';

// prettier-ignore
const defaultState = {
	_rehydrated: false, // flag to check if we're still rehydrating
	_version: '3', // used to do migration
	lastPhotoFetch: 0, // timestamp
	nextPhoto: null,
	currentPhoto: {
		// a transparent 1x1px gif
		imgUrl: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
		// empty id will make the app fetch for new photo
		imgId: '',
		authorName: '',
		authorUsername: '',
		color: '#977857',
		fetchTime: 0,
	}, // unsplash photo data
	userPhoto: null, // user photo data, with structure similar to wallpaper
	greetingName: '',

	settings: null, // old settings group is now at top level
	// settings
	language: navigator.language.includes('vi') ? 'vi' : 'en',
	wallpaperMode: 'unsplash', // unsplash or user
	clockDisplay: 'center', // center, blend or mini
	userPhotoName: '', // file name to display at file selector
	activeQuicklinks: {
		gmail: true,
		facebook: true,
		twitter: true,
		youtube: true,
		wikipedia: true,
	},
	// user custom link
	userQuicklinks: [
		{ id: 'user1', active: false, url: '', icon: 'mdi--newspaper', title: 'News' },
		{ id: 'user2', active: false, url: '', icon: 'mdi--shopping', title: 'Shopping' },
		{ id: 'user3', active: false, url: '', icon: 'mdi--wordpress', title: 'My Blog' },
		{ id: 'user4', active: false, url: '', icon: 'mdi--earth', title: '' },
	],
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
	// console.log('imcomingState', incomingState);
	// console.log('unsaved', unsaved);

	if (incomingState._version !== defaultState._version) {
		unsavedCount += await migrateStorage(defaultState, incomingState, unsaved);
		console.log('Storage migrated to v', defaultState._version);
	}

	update(currentState => {
		const state = { ...currentState, ...incomingState, _rehydrated: true };
		console.log('NOW state', state);
		return state;
	});

	// I can use Object.keys(unsaved).length here but isn't it more costly?
	if (unsavedCount) {
		// save the unsaved
		PersistStorage.set(unsaved).then(() => {
			// if a key is set to null at this stage, we'll clean it up (migration requests)
			const removeKeys = Object.keys(unsaved).filter(key => unsaved[key] == null);

			PersistStorage.remove(removeKeys).then(() => {
				console.log('persist unsaved data');
			});
		});
	}
})();

/**
 * Set the state (without persisting to local storage)
 *
 * Input can be key-value params pair or a state object
 *
 * @param {Object} newState object to be merge to current state
 */
function setState(newState) {
	update(state => ({
		...state,
		...newState,
	}));
}

/**
 * Save state of each key and persist data if needed
 *
 * @param {Object} newState object to be merge to current state
 */
function saveState(newState) {
	PersistStorage.set(newState).then(() => {
		update(state => ({
			...state,
			...newState,
		}));
	});
}

/**
 * Simple storage migration script
 * @return {Promise}  Resolve when done
 */
function migrateStorage(defaults, incoming, toBeSaved) {
	return new Promise(resolve => {
		// for version 2 to 3
		if (incoming.settings) {
			const currentSettings = incoming.settings;
			delete currentSettings.collectionId; // collectionId cannot be changed by users, as per unsplash rules
			delete currentSettings.userPhotoName; // this is stored in userPhoto.imgId now

			// spread settings to top level
			Object.assign(incoming, currentSettings, { settings: null, _version: defaults._version });
			// remove old settings
			toBeSaved.settings = null;
			// switch to latest version
			toBeSaved._version = defaults._version;

			resolve(1);
		}

		// return number of toBeSaved count
		resolve(0);
	});
}

const persistStore = { subscribe, setState, saveState, defaultState };

export default persistStore;
