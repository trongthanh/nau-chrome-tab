/* © 2016 NauStud.io
 * @author Thanh
 */
(function() {
	'use strict';
	/**
	 * Fetch Unplash random image
	 *
	 * @param  {String} url     URL to the GraphQL endpoint
	 * @param  {String} query   The GraphQL query
	 * @return {Promise}        the request resolving promise object
	 */
	nau.fetchUnsplash = function fetchUnsplash() {
		const unsplashAPI = 'https://api.unsplash.com/photos/random?orientation=landscape&w=1920&&collections=349521,410546,279087,327760,147437';
		let requiredHeaders = new Headers({
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Authorization': 'Client-ID 01334b1872fbd0bda3f4f3ba44f0693213cf06f682b81079f8adf802fb89993b',
		});

		let req = new Request(unsplashAPI, {
			method: 'GET',
			headers: requiredHeaders,
			// body: JSON.stringify({ query }), // TODO: add 'variables' to the body
		});


		return fetch(req).then(response => {
			console.log('response.status:', response.status);
			if (response.ok) {
				return response.json(); // result will be JSON object
			} else {
				return response.json(); // Even response is 4**, we still receive json object describe error
			}
		}).catch(err => {
			console.log('Errors:', err);
			return err;
		});
	};
}());
