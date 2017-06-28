/* © 2016 int3ractive.com
 * @author Thanh
 */

/**
 * The clock component
 * @type {Object}
 */
const Clock = {
	init(selector) {
		this.clock = $(selector);

		if (!this.clock) {
			throw new Error('Clock.start: cannot find Clock element with selector', selector);
		}

		// update time immediately
		this.currentTime = this.getCurrentTime();
		this.render();

		// check every second but only render when text is different
		this.tickId = setInterval(() => {
			const time = this.getCurrentTime();
			if (!$.shallowEqual(time, this.currentTime)) {
				this.currentTime = time;
				this.render();
			}
		}, 1000);
	},

	stop() {
		if (this.tickId) {
			clearInterval(this.tickId);
			this.tickId = 0;
		}
	},

	getCurrentTime() {
		const now = new Date();
		const hours = now.getHours() < 10 ? `0${now.getHours()}` : now.getHours();
		const minutes = now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes();
		// let seconds = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds();

		return { hours, minutes };
	},

	render() {
		const { hours, minutes } = this.currentTime;
		this.clock.innerHTML =
			`<span class="clock__hour">${hours}</span>:<span class="clock__minute">${minutes}</span>`;
	},
};

export default Clock;
