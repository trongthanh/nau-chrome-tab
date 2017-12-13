<template>
<div id="clock" class="clock">
	<span class="clock__hour">{{ time.hours }}</span>:<span class="clock__minute">{{ time.minutes }}</span>
</div>
</template>

<script>
import { shallowEqual } from '../common/utils';
import Store from '../common/Store';

export default {
	name: 'Clock',
	data() {
		return {
			time: null,
		};
	},
	methods: {
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
		Store.set('currentTime', this.time);

		// check every second but only render when text is different
		this.tickId = setInterval(() => {
			const time = this.getCurrentTime();
			if (!shallowEqual(time, this.currentTime)) {
				this.time = time;
				Store.set('currentTime', this.time); // notify other components about time change
			}
		}, 1000);
	},
};
</script>
