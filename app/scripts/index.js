/* © 2016 int3ractive.com
 * @author Thanh
 */
(function() {
	'use strict';

	const RENEW_DURATION =  1000 * 60 * 60; // fetch new image every hour
	let lastCheck = +localStorage.getItem('lastPhotoFetch') || Date.now(); // 0 if no localStorage
	let now = Date.now();

	let body = $('body');

	let imgUrl = localStorage.getItem('imgUrl');
	const DEBUG = false;

	// the first hour after install, user will see default background (lastCheck == now),
	// then we'll fetch new image in the next hou
	if (DEBUG || now > lastCheck + RENEW_DURATION) {
		nau.fetchUnsplash().then(json => {
			console.log('fetch result', json);
			let url = json.urls.custom || json.urls.full;
			let user = json.user || {name: '', username: ''};

			// cache the image via normal browser cache in the background
			// but don't show it immediately after load, user will see new image in next open tab
			let imgEl = document.createElement('IMG');
			imgEl.onload = () => {
				console.log('Image is loaded, ready for next tab open');
				localStorage.setItem('lastPhotoFetch', now);
				localStorage.setItem('imgUrl', imgEl.src);
				localStorage.setItem('imgId', json.id);
				localStorage.setItem('authorName', user.name);
				localStorage.setItem('authorUsername', user.username);
			};

			imgEl.onerror = () => {
				console.log('Image load errors, we\'ll try again next open tab');
			};
			imgEl.src = url;

		});
	}

	if (imgUrl) {
		setBG(imgUrl);
		$('#photo-credit').innerHTML = `
			Photo by
			<a href="https://unsplash.com/@${localStorage.getItem('authorUsername')}" class="photo-credit__author">${localStorage.getItem('authorName')}</a>
			/
			<a href="https://unsplash.com/photos/${localStorage.getItem('imgId')}" class="photo-credit__origin">Unsplash</a>
		`;
	} else {
		console.log('Use default background');
		setBG('images/bg-default.jpg');
	}

	// start clock
	nau.clock.start('#clock');

	function setBG(url) {
		body.style.backgroundImage = `url(${url})`;
	}

	// display quote
	nau.quotes.render();

}());
