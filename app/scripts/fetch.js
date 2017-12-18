/* © 2016 int3ractive.com
 * @author Thanh
 */
/* eslint-disable import/prefer-default-export */

/**
 * Get query string from param object
 * @param  {Object} params params object with key: value pairs
 * @return {string}        Query string to use with GET URL
 */
function queryString(params) {
	return Object.keys(params)
		.map(k => {
			let val = params[k];
			// join array values with comma
			if (Array.isArray(val)) {
				val = val.join(',');
			}

			return encodeURIComponent(k) + '=' + encodeURIComponent(val);
		})
		.join('&');
}

/**
 * Fetch Unplash random image
 *
 * @param {Object} options Additional options to pass to the unsplash GET API
 * @return {Promise}        the request resolving promise object
 */
export function fetchUnsplash(options) {
	const unsplashAPI = 'https://api.unsplash.com/photos/random';

	const defaults = {
		orientation: 'landscape',
		w: 1920,
		collections: [1507483], // collection will be overwritten from external options
	};

	// get override param
	const params = Object.assign({}, defaults, options);

	const requiredHeaders = new Headers({
		'Content-Type': 'application/json',
		Accept: 'application/json',
		Authorization: 'Client-ID 01334b1872fbd0bda3f4f3ba44f0693213cf06f682b81079f8adf802fb89993b',
	});

	const url = unsplashAPI + '?' + queryString(params);
	console.log('fetch url:', url);
	const req = new Request(url, {
		method: 'GET',
		headers: requiredHeaders,
	});


	return fetch(req).then(response => {
		console.log('response.status:', response.status);
		if (response.ok) {
			return response.json(); // result will be JSON object
		}

		return response.json(); // Even response is 4**, we still receive json object describe error

	}).catch(err => {
		console.log('Errors:', err);

		return err;
	});
}
