/* © 2019 Int3ractive.com
 * @author Thanh Tran
 */
import { derived } from 'svelte/store';
import persistStore from './persistStore';
import { wallpaperMode } from './settings';
import { fetchUnsplash } from '../common/services';
import { getDayPeriod } from '../common/utils';

const RENEW_DURATION = 1000 * 60 * 60; // fetch new image every hour

// TODO: I'm still learning about Svelte's store mechanism and how different store data interact, to be refactor

let runOnce = false; // to make sure checkWallpaperRetention run only once
// wallpaper store
export default derived([wallpaperMode, persistStore], ([$wallpaperMode, $persistStore]) => {
	if ($persistStore._rehydrated) {
		if ($wallpaperMode === 'user' && $persistStore.userPhoto) {
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
		if (!runOnce) checkWallpaperRetention($persistStore);
	}
	return $persistStore.currentPhoto;
});

async function checkWallpaperRetention($persistStore) {
	runOnce = true;
	const lastCheck = $persistStore.lastPhotoFetch;

	const now = Date.now();
	// the first hour after install, user will see default background,
	// then we'll fetch new image in the next hour
	if (now > lastCheck + RENEW_DURATION) {
		const nextPhoto = $persistStore.nextPhoto;
		const photoStates = {};
		if (nextPhoto) {
			console.log('change currentPhoto to', nextPhoto);
			photoStates.currentPhoto = nextPhoto;
		}
		try {
			const newNextPhoto = await fetchNewPhoto(now + RENEW_DURATION); // add one hour for next hour
			photoStates.nextPhoto = newNextPhoto;
			photoStates.lastPhotoFetch = now;
		} catch (err) {
			console.log('Failed to fetch new photo for next hour');
		} finally {
			persistStore.saveState(photoStates);
		}
	}
}

async function fetchNewPhoto(time) {
	// const period = getDayPeriod(1549029600000); // this value to test night time
	const period = getDayPeriod(time);
	const json = await fetchUnsplash(period);

	console.log('fetch result', json);
	const url = json.urls.custom || json.urls.full;
	const user = json.user || { name: '', username: '' };

	return new Promise((resolve, reject) => {
		// cache the image via normal browser cache in the background
		// but don't show it immediately after load, user will see new image in next open tab
		const imgEl = document.createElement('IMG');
		imgEl.onload = () => {
			console.log('Image is loaded, ready for view in next hour');
			resolve({
				location: json.location,
				imgUrl: url,
				imgId: json.id,
				authorName: user.name,
				authorUsername: user.username,
				color: json.color,
			});
		};

		imgEl.onerror = err => {
			console.log('Image load errors, we will try again next open tab');
			reject(err);
		};
		// load the image
		imgEl.src = url;
	});
}
