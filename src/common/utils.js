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
			// console.log('Resized image size:', imgDataUrl.length / 1024, 'KB');
			resolve(imgDataUrl);
		};
		img.onerror = () => {
			reject();
		};
		img.src = url;
	});
}
