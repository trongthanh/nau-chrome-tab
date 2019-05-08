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
			persistStore.setState(settingName, value);
		},
		save: value => {
			persistStore.saveState(settingName, value);
		},
	};
}

export const activeQuicklinks = createPersistSettingStore('activeQuicklinks');
export const clockDisplay = createPersistSettingStore('clockDisplay');
export const language = createPersistSettingStore('language');
export const userPhotoName = createPersistSettingStore('userPhotoName');
export const wallpaperMode = createPersistSettingStore('wallpaperMode');

