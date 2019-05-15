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

// wallpaper store
export default derived([wallpaperMode, persistStore], ([$wallpaperMode, $persistStore]) => {
	if ($persistStore._rehydrated) {
		if ($wallpaperMode === 'user' && $persistStore.userPhoto) {
			return $persistStore.userPhoto;
		}

		checkWallpaperRetention($persistStore);
	}
	return $persistStore.currentPhoto;
});

function checkWallpaperRetention($persistStore) {
	const lastCheck = $persistStore.lastPhotoFetch;
	let currentPhoto = $persistStore.currentPhoto;

	const now = Date.now();
	// the first hour after install, user will see default background,
	// then we'll fetch new image in the next hour
	if (now > lastCheck + RENEW_DURATION) {
		const nextPhoto = $persistStore.nextPhoto;
		if (nextPhoto) {
			currentPhoto = nextPhoto;

			console.log('currentPhoto', currentPhoto);
			persistStore.saveState('currentPhoto', currentPhoto);
		}
		fetchNewPhoto(now);
	}
}

function fetchNewPhoto(now) {
	// const period = getDayPeriod(1549029600000); // this value to test night time
	const period = getDayPeriod(now + RENEW_DURATION); // add one hour for next hour
	fetchUnsplash(period).then(json => {
		console.log('fetch result', json);
		const url = json.urls.custom || json.urls.full;
		const user = json.user || { name: '', username: '' };

		// cache the image via normal browser cache in the background
		// but don't show it immediately after load, user will see new image in next open tab
		const imgEl = document.createElement('IMG');
		imgEl.onload = () => {
			console.log('Image is loaded, ready for view in next hour');
			persistStore.saveState('nextPhoto', {
				location: json.location,
				imgUrl: imgEl.src,
				imgId: json.id,
				authorName: user.name,
				authorUsername: user.username,
				color: json.color,
			});
			persistStore.saveState('lastPhotoFetch', now);
		};

		imgEl.onerror = () => {
			console.log('Image load errors, we will try again next open tab');
		};
		// load the image
		imgEl.src = url;
	});
}
