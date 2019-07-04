/* © 2019 Int3ractive.com
 * @author Thanh Tran
 */
import { derived } from 'svelte/store';
import persistStore from './persistStore';
import { fetchNewPhoto } from '../common/services';
import { hasPeriodChanged } from '../common/utils';

const RENEW_DURATION = 1000 * 60 * 60; // fetch new image every hour

// TODO: I'm still learning about Svelte's store mechanism and how different store data interact, to be refactor

let runOnce = false; // to make sure checkWallpaperRetention run only once

// wallpaper store
export default derived(
	[persistStore],
	([$persistStore]) => {
		if ($persistStore._rehydrated) {
			if ($persistStore.wallpaperMode === 'user' && $persistStore.userPhoto) {
				return $persistStore.userPhoto;
			}

			if (!$persistStore.currentPhoto.imgId) {
				// load unsplash wallpaper for the very first time
				fetchNewPhoto(Date.now()).then(currentPhoto => {
					persistStore.saveState({ currentPhoto });
				});
			}

			// if not checked, below routine will be executed indefnitely
			// due to lastPhotoFetch is updated to the store late
			// TODO: this is another thing to think of when restructure (if needed) this app stores
			if (!runOnce) {
				runOnce = true;
				return checkWallpaperRetention($persistStore);
			} else {
				return $persistStore.currentPhoto;
			}
		}

		return $persistStore.currentPhoto;
	},
	// the synchronous fallback data while we wait for store subscription
	persistStore.defaultState.currentPhoto
);

// export for unit testing only
export function checkWallpaperRetention($persistStore) {
	const lastCheck = $persistStore.lastPhotoFetch;

	const now = Date.now();
	// the first hour after install, user will see default background,
	// then we'll fetch new image in the next hour
	if (now > lastCheck + RENEW_DURATION) {
		let currentPhoto = $persistStore.currentPhoto;
		const nextPhoto = $persistStore.nextPhoto;
		const photoStates = {};
		if (nextPhoto) {
			console.log('change currentPhoto to', nextPhoto);
			currentPhoto = photoStates.currentPhoto = nextPhoto;
		}
		let lastPhotoFetch = now;
		let timeFetch = now + RENEW_DURATION; // we're fetching early for next swap, hence, time in the next hour

		if (hasPeriodChanged(now, currentPhoto.fetchTime) && hasPeriodChanged(now, lastCheck)) {
			// swap wallpaper immedately in next open, to sync to the right period of day
			lastPhotoFetch = now - RENEW_DURATION;
			timeFetch = now;
		}

		fetchNewPhoto(timeFetch)
			.then(newNextPhoto => {
				photoStates.nextPhoto = newNextPhoto;
				photoStates.lastPhotoFetch = lastPhotoFetch;
			})
			.catch(() => {
				console.log('Failed to fetch new photo for next hour');
			})
			.finally(() => {
				persistStore.saveState(photoStates);
			});

		return photoStates.currentPhoto || $persistStore.currentPhoto;
	}

	// time limit is not reached
	return $persistStore.currentPhoto;
}
