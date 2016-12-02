/* © 2016 int3ractive.com
 * @author Thanh
 */
(function() {
	'use strict';
	// imports
	const Store = nau.Store;
	const Settings = nau.Settings;

	const RENEW_DURATION =  1000 * 60 * 60; // fetch new image every hour

	const defaultPhoto = {
		imgUrl: 'images/bg-default.jpg',
		imgId: '',
		authorName: 'ChromeOS',
		authorUsername: '',
	};

	nau.define('wallpaper', {
		init(selector) {
			this.wallpaper = $(selector);
			const wallpaperMode = this.currentMode = Settings.get('wallpaperMode');

			if (wallpaperMode === 'user') {
				this._initUserMode();
			} else {
				// unsplash
				this._initUnsplashMode();
			}

			this.initEvents();
			this.initDragDrop();
		},

		_initUserMode() {
			Store.get('userPhoto').then(result => {
				// use user photo
				this.imgData = result.userPhoto || defaultPhoto;
				this.render();
			});
		},

		_initUnsplashMode() {
			Store.get(['lastPhotoFetch', 'currentPhoto']).then(result => {
				let lastCheck = result.lastPhotoFetch || 0;
				let now = Date.now();
				let currentPhoto = result.currentPhoto;

				const DEBUG = false;
				// the first hour after install, user will see default background,
				// then we'll fetch new image in the next hour
				if (DEBUG || now > lastCheck + RENEW_DURATION) {
					Store.get('nextPhoto').then(nextResult=> {
						if (nextResult.nextPhoto) {
							currentPhoto = nextResult.nextPhoto;
							Store.set({
								currentPhoto: currentPhoto
							});
						}
						// use next photo
						this.imgData = currentPhoto || defaultPhoto;
						this.render();
						this._fetchNewPhoto(now);
					});
				} else {
					// for this hour
					this.imgData = currentPhoto || defaultPhoto;
					this.render();
				}
			});
		},

		_fetchNewPhoto(now) {
			nau.fetchUnsplash().then(json => {
				console.log('fetch result', json);
				let url = json.urls.custom || json.urls.full;
				let user = json.user || {name: '', username: ''};

				// cache the image via normal browser cache in the background
				// but don't show it immediately after load, user will see new image in next open tab
				let imgEl = document.createElement('IMG');
				imgEl.onload = () => {
					console.log('Image is loaded, ready for view in next hour');
					Store.set({
						lastPhotoFetch: now,
						nextPhoto: {
							imgUrl: imgEl.src,
							imgId: json.id,
							authorName: user.name,
							authorUsername: user.username,
						},
					});
				};

				imgEl.onerror = () => {
					console.log('Image load errors, we\'ll try again next open tab');
					Store.set({nextPhoto: null});
				};
				imgEl.src = url;
			});
		},

		initEvents() {
			Settings.subscribe('wallpaperMode', (event) => {
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
		},

		initDragDrop() {
			this.wallpaper._.events({
				dragover: (event) => {
					event.stopPropagation();
					event.preventDefault();
					event.dataTransfer.dropEffect = 'link'; // Explicitly show this is a copy.
				},
				drop: (event) => {
					event.stopPropagation();
					event.preventDefault();

					let files = event.dataTransfer.files; // FileList object.
					console.log('Num files', files.length);
					// files is a FileList of File objects. List some properties.
					for (let i = 0, f; i < files.length; i++) {
						f = files[i];
						console.log(escape(f.name), ' (type ', f.type || 'n/a', ') - ',
							f.size, ' bytes, last modified: ',
							f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a');
					}

					let file = files[0];
					this._readAndResizeImage(file).then(imgDataUrl => {
						this.imgData = {
							imgUrl: imgDataUrl,
							imgId: file.name,
							authorName: 'You',
							authorUsername: '',
						};
						this.render();
						Store.set({ userPhoto: this.imgData });
						Settings.set('wallpaperMode', 'user');
					});
				},
			});
		},

		render() {
			let imgData = this.imgData;
			let imgUrl = `url(${imgData.imgUrl})`;
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
				$('#photo-credit').innerHTM = '';
			}
			setTimeout(() => {
				this.wallpaper.classList.add('wallpaper--ready');
			}, 12);
		},

		_readAndResizeImage(file) {
			const URL = window.URL;
			const canvas = document.createElement('CANVAS');
			const canvasWidth = canvas.width = window.screen.width; // match canvasWidth with full screen width

			return new Promise((resolve, reject) => {
				let ctx = canvas.getContext('2d');
				let url = URL.createObjectURL(file);
				let img = new Image();
				img.onload = () => {
					// keep ratio by maintain width
					let ratio = img.height / img.width;

					let canvasHeight = Math.round(ratio * canvasWidth);
					canvas.height = canvasHeight;
					ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight); // scale the image down/up to the canvas sizes
					let imgDataUrl = canvas.toDataURL('image/jpeg', 0.8); // 0.8 is of decent quality with optimal size
					console.log('Resized image size:', imgDataUrl.length / 1024, 'KB');
					resolve(imgDataUrl);
				};
				img.src = url;
			});
		}
	});

}());
