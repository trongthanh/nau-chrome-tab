/* © 2016 int3ractive.com
 * @author Thanh
 */
(function() {
	'use strict';

	const RENEW_DURATION =  1000 * 30; //1000 * 60 * 60; // fetch new image every hour
	let lastCheck = +localStorage.getItem('lastPhotoFetch') || Date.now(); // 0 if no localStorage
	let now = Date.now();

	let body = $('body');
	let clock = $('#clock');

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
	} else {
		console.log('Use default background');
	}

	// start clock
	nau.clock.start(updateClock);

	function setBG(url) {
		body.style.backgroundImage = `url(${url})`;
	}

	function updateClock(clockHtml) {
		clock.innerHTML = clockHtml;
	}

	// update quote
	let quote = nau.quotes.getQuote();
	$('#quotes').textContent = quote[0];
	$('#quotes-author').textContent = quote[1];

}());
