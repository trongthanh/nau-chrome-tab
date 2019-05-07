/* © 2019 int3ractive.com
 * @author Thanh Tran
 */
import { readable } from 'svelte/store';
import { compareTimeObj } from '../common/utils';

function getCurrentTime() {
	const now = new Date();
	const hours = String(now.getHours()).padStart(2, '0');
	const minutes = String(now.getMinutes()).padStart(2, '0');

	return { hours, minutes };
}

let currentTime = getCurrentTime();

export default readable(currentTime, function start(set) {
	const tickId = setInterval(() => {
		const time = getCurrentTime();
		if (!compareTimeObj(time, currentTime)) {
			currentTime = time;
			set(currentTime);
		}
	}, 1000);

	return function stop() {
		clearInterval(tickId);
	};
});
