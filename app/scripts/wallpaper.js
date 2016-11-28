/* © 2016 int3ractive.com
 * @author Thanh
 */
(function() {
	'use strict';
	// imports
	const Store = nau.Store;

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

			let lastCheck = Store.get('lastPhotoFetch', 0);
			let now = Date.now();
			let currentPhoto = Store.get('currentPhoto');

			const DEBUG = false;
			// the first hour after install, user will see default background,
			// then we'll fetch new image in the next hou
			if (DEBUG || now > lastCheck + RENEW_DURATION) {
				let nextPhoto = Store.get('nextPhoto');
				if (nextPhoto) {
					currentPhoto = nextPhoto;
					Store.set('currentPhoto', currentPhoto);
					Store.set('nextPhoto', null);
				}

				nau.fetchUnsplash().then(json => {
					console.log('fetch result', json);
					let url = json.urls.custom || json.urls.full;
					let user = json.user || {name: '', username: ''};

					// cache the image via normal browser cache in the background
					// but don't show it immediately after load, user will see new image in next open tab
					let imgEl = document.createElement('IMG');
					imgEl.onload = () => {
						console.log('Image is loaded, ready for view in next hour');
						Store.set('lastPhotoFetch', now);
						Store.set('nextPhoto', {
							imgUrl: imgEl.src,
							imgId: json.id,
							authorName: user.name,
							authorUsername: user.username,
						});
					};

					imgEl.onerror = () => {
						console.log('Image load errors, we\'ll try again next open tab');
					};
					imgEl.src = url;
				});
			}

			// for this hour
			this.imgData = currentPhoto || defaultPhoto;
			this.render();
		},

		render() {
			let imgData = this.imgData;
			this.wallpaper.style.backgroundImage = `url(${imgData.imgUrl})`;
			if (imgData.authorUsername) {
				$('#photo-credit').innerHTML = `
					Photo by
					<a href="https://unsplash.com/@${imgData.authorUsername}"
						class="photo-credit__author">${imgData.authorName}</a>
					/
					<a href="https://unsplash.com/photos/${imgData.imgId}"
						class="photo-credit__origin">Unsplash</a>
				`;
			}
		}
	});

}());
