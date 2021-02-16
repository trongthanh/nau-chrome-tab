/* © 2017 int3ractive.com
 * @author Thanh
 */

/**
 * Specialized function to compare 2 time objects created in Clock
 * @param {object} a
 * @param {object} b
 */
export function compareTimeObj(a, b) {
	// note: naive comparison, to be enhanced
	return `${a.hours}${a.minutes}` === `${b.hours}${b.minutes}`;
}

/* eslint-disable eqeqeq */
export function shallowEqual(a, b) {
	const isEqual = a == b;
	if (isEqual) {
		return true;
	}

	if (typeof a === 'object' && typeof b === 'object') {
		const props = Object.keys(a).concat(Object.keys(b));

		// let's not worry prop duplication for now
		return props.every(prop => a[prop] == b[prop]);
	}

	return false;
}

/**
 * Read and resize image to keep size small for storing
 * @param {File} file
 * @returns {Promise}
 */
export function readAndResizeImage(file) {
	const URL = window.URL;
	const canvas = document.createElement('CANVAS');
	// match canvasWidth with full screen width
	const canvasWidth = window.screen.width;
	canvas.width = canvasWidth;

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
			// console.log('Resized image size:', imgDataUrl.length / 1024, 'KB');

			// draw image to a 1x1 px bitmap to get median color
			ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, 0, 0, 1, 1);
			const imgData = ctx.getImageData(0, 0, 1, 1).data;
			const color = `#${rgbToHex(imgData[0], imgData[1], imgData[2])}`;
			console.log('median color', color);
			resolve({ imgDataUrl, color });
		};
		img.onerror = () => {
			reject();
		};
		img.src = url;
	});
}

/* eslint-disable no-bitwise */
export function rgbToHex(r, g, b) {
	if (r > 255 || g > 255 || b > 255) throw new Error('Invalid color component');
	return ((r << 16) | (g << 8) | b).toString(16);
}

/**
 * Helper to get day's period,
 * @param  {Date} timeValue	Time of the day
 * @return {string}			Period of the input time, either: day, night, dawn, dusk
 */
export function getDayPeriod(timeValue) {
	let time = timeValue;
	if (!(time instanceof Date)) {
		time = new Date(time);
	}
	const hours = time.getHours();

	if (hours < 5) {
		return 'night';
	} else if (hours < 7) {
		return 'dawn';
	} else if (hours < 18) {
		return 'day';
	} else if (hours < 20) {
		return 'dusk';
	}

	// else
	return 'night';
}

/**
 * Check whether there was change in period of the day
 * @param  {[type]}  time1 [description]
 * @param  {[type]}  time2 [description]
 * @return {Boolean}       [description]
 */
export function hasPeriodChanged(time1, time2) {
	console.log('hasPeriodChanged(time1, time2)', getDayPeriod(time1), getDayPeriod(time2));
	return getDayPeriod(time1) !== getDayPeriod(time2);
}

/**
 * Get query string from param object
 * @param  {Object} params params object with key: value pairs
 * @return {string}        Query string to use with GET URL
 */
export function queryString(params) {
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
