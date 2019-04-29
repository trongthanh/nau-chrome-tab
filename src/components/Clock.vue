<template>
	<div id="clock" class="clock">
		<span class="clock__hour">{{ time.hours }}</span
		>:<span class="clock__minute">{{ time.minutes }}</span>
	</div>
</template>

<script>
/* © 2019 int3ractive.com
 * @author Thanh
 */
import { compareTimeObj } from '../common/utils';

export default {
	name: 'Clock',
	inject: ['dispatch'],
	data() {
		return {
			time: null,
		};
	},
	methods: {
		// TODO: refactor to move to time Model
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
	},
	created() {
		// update time immediately
		this.time = this.getCurrentTime();
		// Store.set('currentTime', this.time);
		this.dispatch({
			type: 'SET_CURRENT_TIME',
			currentTime: this.time,
		});

		// check every second but only render when text is different
		this.tickId = setInterval(() => {
			const time = this.getCurrentTime();
			if (!compareTimeObj(time, this.time)) {
				this.time = time;
				// Store.set('currentTime', this.time); // notify other components about time change
				this.dispatch({
					type: 'SET_CURRENT_TIME',
					currentTime: this.time,
				});
			}
		}, 1000);
	},
};
</script>
