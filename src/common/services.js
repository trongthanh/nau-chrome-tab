/* © 2019 int3ractive.com
 * @author Thanh
 */

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

			return `${encodeURIComponent(k)}=${encodeURIComponent(val)}`;
		})
		.join('&');
}

const unsplashAPI = 'https://api.unsplash.com/photos/random';
const collectionsByPeriod = {
	day: [1507483],
	dawn: [1507483], // no separate collection for now
	night: [4747434],
	dusk: [4747434], // no separate collection for now
};
/**
 * Fetch Unplash random image
 *
 * @param {string} period Period of the day to change appropriate collection (day, night, dawn, dusk)
 * @return {Promise}        the request resolving promise object
 */
export function fetchUnsplash(period = 'day') {
	const params = {
		orientation: 'landscape',
		w: 1920,
		// my collection with curated photos, refer to https://unsplash.com/@trongthanh/collections
		collections: collectionsByPeriod[period] || collectionsByPeriod.day,
	};

	// NOTE: the client id belongs to Nau-Tab only, please request your own Application at Unsplash
	const requiredHeaders = new Headers({
		'Content-Type': 'application/json',
		Accept: 'application/json',
		Authorization: 'Client-ID 01334b1872fbd0bda3f4f3ba44f0693213cf06f682b81079f8adf802fb89993b',
	});

	const url = `${unsplashAPI}?${queryString(params)}`;
	console.log('fetch url:', url);
	const req = new Request(url, {
		method: 'GET',
		headers: requiredHeaders,
	});

	return fetch(req)
		.then(response => {
			console.log('response.status:', response.status);
			if (response.ok) {
				return response.json(); // result will be JSON object
			}

			return response.json(); // Even response is 4**, we still receive json object describe error
		})
		.catch(err => {
			console.log('Errors:', err);

			return err;
		});
}
