/* © 2019 Int3ractive.com
 * @author Thanh Tran
 */
import { derived } from 'svelte/store';
import persistStore from './persistStore';

export const settingsReady = derived(
	persistStore,
	$persistStore => $persistStore._rehydrated,
	false
);

let activeQuicklinks;
const quicklinksStore = derived(persistStore, $persistStore => {
	// transform from Object to Array[linkName:string]
	activeQuicklinks = $persistStore.activeQuicklinks;
	return Object.keys(activeQuicklinks).filter(linkName => activeQuicklinks[linkName]);
});

export const quicklinks = {
	subscribe: quicklinksStore.subscribe,
	set(quicklinks) {
		// transform from Array[linkName:string] back to Object
		activeQuicklinks = Object.keys(activeQuicklinks).reduce((quickLinksObj, linkName) => {
			quickLinksObj[linkName] = quicklinks.includes(linkName);
			return quickLinksObj;
		}, {});
		//
		persistStore.saveState({ activeQuicklinks });
	},
};

function createPersistSettingStore(settingName) {
	const { subscribe } = derived(persistStore, $persistStore => $persistStore[settingName]);

	return {
		subscribe,
		set(value) {
			// set state and persist
			persistStore.saveState({ [settingName]: value });
		},
	};
}

export const clockDisplay = createPersistSettingStore('clockDisplay');
export const language = createPersistSettingStore('language');
export const userPhotoName = createPersistSettingStore('userPhotoName');
export const wallpaperMode = createPersistSettingStore('wallpaperMode');
export const userPhoto = createPersistSettingStore('userPhoto');
export const greetingName = createPersistSettingStore('greetingName');
