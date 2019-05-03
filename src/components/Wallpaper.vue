<template>
	<div
		id="wallpaper"
		:class="{ wallpaper: true, 'wallpaper--ready': wallpaperReady, 'wallpaper--blur': settingsActive }"
		:style="'background-image:url(' + wallpaper.imgUrl + ')'"
	></div>
</template>

<script>
/* © 2019 int3ractive.com
 * @author Thanh
 */
import { fetchUnsplash } from '../common/services';
import { getDayPeriod } from '../common/utils';

const RENEW_DURATION = 1000 * 60 * 60; // fetch new image every hour

// TODO: implement drag and drop user image

export default {
	name: 'Wallpaper',
	inject: ['store', 'dispatch'],
	data() {
		return {
			appState: this.store.state,

			wallpaperReady: false,
		};
	},
	computed: {
		wallpaperMode() {
			return this.appState.settings.wallpaperMode;
		},
		wallpaper() {
			return this.appState.wallpaper;
		},
		lastPhotoFetch() {
			return this.appState.lastPhotoFetch;
		},
		settingsActive() {
			return this.appState.settingsActive;
		},
	},
	created() {
		this.init();
	},

	methods: {
		init() {
			if (this.wallpaperMode === 'unsplash') {
				this._initUnsplashMode();
			}
			// nothing todo for user mode

			this.wallpaperReady = true;
		},

		_initUnsplashMode() {
			const lastCheck = this.lastPhotoFetch;
			let currentPhoto = this.wallpaper;

			const now = Date.now();
			// NOTE: set true to load new photo every refresh
			const DEBUG = false;
			// the first hour after install, user will see default background,
			// then we'll fetch new image in the next hour
			if (DEBUG || now > lastCheck + RENEW_DURATION) {
				const nextPhoto = this.appState.nextPhoto;
				if (nextPhoto) {
					currentPhoto = nextPhoto;

					console.log('currentPhoto', currentPhoto);
					this.dispatch({
						type: 'UPDATE_CURRENT_PHOTO',
						currentPhoto,
					});
					this.dispatch({
						type: 'UPDATE_WALLPAPER',
						wallpaper: currentPhoto,
					});
				}
				this._fetchNewPhoto(now);
			}
		},

		_fetchNewPhoto(now) {
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
					this.dispatch({
						type: 'UPDATE_NEXT_PHOTO',
						lastPhotoFetch: now,
						nextPhoto: {
							location: json.location,
							imgUrl: imgEl.src,
							imgId: json.id,
							authorName: user.name,
							authorUsername: user.username,
							color: json.color,
						},
					});
				};

				imgEl.onerror = () => {
					console.log('Image load errors, we will try again next open tab');
				};
				// load the image
				imgEl.src = url;
			});
		},
	},
};
</script>
