<template>
<div id="wallpaper" :class="classes" :style="'background-image:url(' + imgUrl + ')'"></div>
</template>

<script>
/* © 2017 int3ractive.com
 * @author Thanh
 */
import Store from '../common/Store';
import { fetchUnsplash } from '../common/services';

const RENEW_DURATION = 1000 * 60 * 60; // fetch new image every hour

export default {
	name: 'Wallpaper',
	data() {
		return {
			classes: 'wallpaper',
			imgUrl: '',
			wallpaperMode: 'unsplash',
		};
	},
	created() {
		this.imgUrl = Store.get('currentPhoto').imgUrl;

		setTimeout(() => {
			this.classes = 'wallpaper wallpaper--ready';
		}, 100);

		const wallpaperMode = (this.wallpaperMode = Store.get('settings').wallpaperMode);

		if (wallpaperMode === 'user') {
			this._initUserMode();
		} else {
			// unsplash
			this._initUnsplashMode();
		}
	},

	methods: {
		_initUserMode() {
			const imgData = Store.get('userPhoto');
			this.imgUrl = imgData.imgUrl;
		},

		_initUnsplashMode() {
			const lastCheck = Store.get('lastPhotoFetch') || 0;
			let currentPhoto = Store.get('currentPhoto');

			const now = Date.now();
			const DEBUG = true;
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

const Wallpaper = {
	init(selector) {
		this.wallpaper = $(selector);

		this.initEvents();
		this.initDragDrop();
	},

	initEvents() {
		Store.subscribe('wallpaperMode', event => {
			console.log('Settings fire event', event);
			if (event.value !== this.currentMode) {
				if (event.value === 'user') {
					this._initUserMode();
				} else {
					this._initUnsplashMode();
				}
				this.currentMode = event.value;
			}
		});

		Store.subscribe('userPhotoSelected', event => {
			this._storeUserPhoto(event.file);
		});
	},

	initDragDrop() {
		this.wallpaper._.events({
			dragover: event => {
				event.stopPropagation();
				event.preventDefault();
				event.dataTransfer.dropEffect = 'link'; // Explicitly show this is a copy.
			},
			drop: event => {
				event.stopPropagation();
				event.preventDefault();

				const files = event.dataTransfer.files; // FileList object.
				console.log('Num files', files.length);
				// files is a FileList of File objects. List some properties.
				for (let i = 0, f; i < files.length; i++) {
					f = files[i];
					console.log(
						escape(f.name),
						' (type ',
						f.type || 'n/a',
						') - ',
						f.size,
						' bytes, last modified: ',
						f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a'
					);
				}

				const file = files[0];
				Store.set('userPhotoName', file.name);
				this._storeUserPhoto(file);
			},
		});
	},

	render() {
		const imgData = this.imgData;
		const imgUrl = `url(${imgData.imgUrl})`;
		this.wallpaper.style.backgroundImage = imgUrl;
		$('.modal__background').style.backgroundImage = imgUrl;
		if (imgData.authorUsername) {
			$('#photo-credit').innerHTML = `
				Photo by
				<a href="https://unsplash.com/@${imgData.authorUsername}"
					class="photo-credit__author">${imgData.authorName}</a>
				/
				<a href="https://unsplash.com/photos/${imgData.imgId}"
					class="photo-credit__origin">Unsplash</a>
			`;
		} else {
			$('#photo-credit').innerHTML = '';
		}
		setTimeout(() => {
			this.wallpaper.classList.add('wallpaper--ready');
		}, 12);
	},

	_storeUserPhoto(file) {
		this._readAndResizeImage(file).then(imgDataUrl => {
			this.imgData = {
				imgUrl: imgDataUrl,
				imgId: file.name,
				authorName: 'You',
				authorUsername: '',
			};
			this.render();
			Store.set({ userPhoto: this.imgData });
			Store.set('wallpaperMode', 'user');
		});
	},

	_readAndResizeImage(file) {
		const URL = window.URL;
		const canvas = document.createElement('CANVAS');
		// match canvasWidth with full screen width
		const canvasWidth = (canvas.width = window.screen.width);

		return new Promise((resolve, reject) => {
			const ctx = canvas.getContext('2d');
			const url = URL.createObjectURL(file);
			const img = new Image();
			img.onload = () => {
				// keep ratio by maintain width
				const ratio = img.height / img.width;

				const canvasHeight = Math.round(ratio * canvasWidth);
				canvas.height = canvasHeight;
				// scale the image down/up to the canvas sizes
				ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
				// 0.8 is of decent quality with optimal size
				const imgDataUrl = canvas.toDataURL('image/jpeg', 0.8);
				console.log('Resized image size:', imgDataUrl.length / 1024, 'KB');
				resolve(imgDataUrl);
			};
			img.onerror = () => {
				reject();
			};
			img.src = url;
		});
	},
};
</script>

