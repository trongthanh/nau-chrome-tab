/* © 2019 int3ractive.com
 * @author Thanh
 */
import { getDayPeriod, queryString } from './utils';

const unsplashAPI = 'https://api.unsplash.com/photos/random';
const collectionsByPeriod = {
	day: [1507483],
	night: [4747434],
	dawn: [4748158],
	dusk: [4748158],
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

export async function fetchNewPhoto(time) {
	// const period = getDayPeriod(1549029600000); // this value to test night time
	const period = getDayPeriod(time);
	const json = await fetchUnsplash(period);

	console.log('fetch result', json);
	const url = json.urls.custom || json.urls.full;
	const user = json.user || { name: '', username: '' };

	return new Promise((resolve, reject) => {
		// cache the image via normal browser cache in the background
		// but don't show it immediately after load, user will see new image in next open tab
		const imgEl = document.createElement('IMG');
		imgEl.onload = () => {
			console.log('Image is loaded, ready for view in next hour');
			resolve({
				location: json.location,
				imgUrl: url,
				imgId: json.id,
				authorName: user.name,
				authorUsername: user.username,
				color: json.color,
				fetchTime: time, // to check for shift of day period
			});
		};

		imgEl.onerror = err => {
			console.log('Image load errors, we will try again next open tab');
			reject(err);
		};
		// load the image
		imgEl.src = url;
	});
}
