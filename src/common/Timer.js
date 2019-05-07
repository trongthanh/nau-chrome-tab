/* © 2019 int3ractive.com
 * @author Thanh
 * TODO: TO REMOVE
 */
import { compareTimeObj } from './utils';
import { dispatch } from './Dispatcher';

const Timer = {
	start() {
		// update time immediately
		this.time = this.getCurrentTime();

		dispatch({
			type: 'SET_CURRENT_TIME',
			currentTime: this.time,
		});

		// check every second but only render when text is different
		this.tickId = setInterval(() => {
			const time = this.getCurrentTime();
			if (!compareTimeObj(time, this.time)) {
				this.time = time;
				dispatch({
					type: 'SET_CURRENT_TIME',
					currentTime: this.time,
				});
			}
		}, 1000);
	},
	getCurrentTime() {
		const now = new Date();
		const hours = String(now.getHours()).padStart(2, '0');
		const minutes = String(now.getMinutes()).padStart(2, '0');

		return { hours, minutes };
	},

	stop() {
		if (this.tickId) {
			clearInterval(this.tickId);
			this.tickId = 0;
		}
	},
};

export default Timer;
