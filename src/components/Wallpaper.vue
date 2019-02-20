<template>
	<div
		id="wallpaper"
		:class="{ wallpaper: true, 'wallpaper--ready': wallpaperReady }"
		:style="'background-image:url(' + imgUrl + ')'"
	></div>
</template>

<script>
/* © 2019 int3ractive.com
 * @author Thanh
 */
import Store from '../common/Store';
import { fetchUnsplash } from '../common/services';

const RENEW_DURATION = 1000 * 60 * 60; // fetch new image every hour

export default {
	name: 'Wallpaper',
	data() {
		return {
			wallpaperReady: false,
			imgUrl: '',
			wallpaperMode: 'unsplash',
			userPhotoName: '',
		};
	},
	created() {
		this.wallpaperMode = Store.get('settings').wallpaperMode;
		this.init();

		Store.subscribe('userPhoto', () => {
			this.init();
		});

		Store.subscribe('settings', ({ settings }) => {
			if (this.wallpaperMode !== settings.wallpaperMode) {
				// change wallpapermode, reinit
				this.wallpaperMode = settings.wallpaperMode;
				this.init();
			}

			if (settings.wallpaperMode === 'user' && this.userPhotoName !== settings.userPhotoName) {
				// user upload new user photo
				// console.log('user photo changed');
				this.init();
			}
		});
	},

	methods: {
		init() {
			if (this.wallpaperMode === 'user') {
				this._initUserMode();
			} else {
				// unsplash
				this._initUnsplashMode();
			}

			this.wallpaperReady = true;
		},
		_initUserMode() {
			const imgData = Store.get('userPhoto');
			this.imgUrl = imgData.imgUrl;
		},

		_initUnsplashMode() {
			const lastCheck = Store.get('lastPhotoFetch') || 0;
			let currentPhoto = Store.get('currentPhoto');

			const now = Date.now();
			// NOTE: set true to load new photo every refresh
			const DEBUG = false;
			// the first hour after install, user will see default background,
			// then we'll fetch new image in the next hour
			if (DEBUG || now > lastCheck + RENEW_DURATION) {
				const nextPhoto = Store.get('nextPhoto');
				if (nextPhoto) {
					currentPhoto = nextPhoto;
					Store.set({
						currentPhoto,
					});
				}
				// use next photo
				this.imgUrl = currentPhoto.imgUrl;
				this._fetchNewPhoto(now);
			} else {
				// for this hour
				this.imgUrl = currentPhoto.imgUrl;
			}
		},

		_fetchNewPhoto(now) {
			fetchUnsplash().then(json => {
				console.log('fetch result', json);
				const url = json.urls.custom || json.urls.full;
				const user = json.user || { name: '', username: '' };
				const location = json.location;

				// cache the image via normal browser cache in the background
				// but don't show it immediately after load, user will see new image in next open tab
				const imgEl = document.createElement('IMG');
				imgEl.onload = () => {
					console.log('Image is loaded, ready for view in next hour');
					Store.set({
						lastPhotoFetch: now,
						nextPhoto: {
							location,
							imgUrl: imgEl.src,
							imgId: json.id,
							authorName: user.name,
							authorUsername: user.username,
						},
					});
				};

				imgEl.onerror = () => {
					console.log("Image load errors, we'll try again next open tab");
					Store.set({ nextPhoto: null });
				};
				imgEl.src = url;
			});
		},
	},
};
</script>
