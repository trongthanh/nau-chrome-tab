/* © 2019 Int3ractive.com
 * @author Thanh Tran
 */
import { derived } from 'svelte/store';
import persistStore from './persistStore';

function createPersistSettingStore(settingName) {
	const { subscribe } = derived(persistStore, $persistStore => $persistStore[settingName]);

	return {
		subscribe,
		set: value => {
			// set state without persist
			persistStore.setState(settingName, value);
		},
		save: value => {
			// set and persist state
			persistStore.saveState(settingName, value);
		},
	};
}

export const activeQuicklinks = createPersistSettingStore('activeQuicklinks');
export const clockDisplay = createPersistSettingStore('clockDisplay');
export const language = createPersistSettingStore('language');
export const userPhotoName = createPersistSettingStore('userPhotoName');
export const wallpaperMode = createPersistSettingStore('wallpaperMode');
export const userPhoto = createPersistSettingStore('userPhoto');

