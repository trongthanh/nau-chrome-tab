/* © 2016 int3ractive.com
 * @author Thanh
 */
(function() {
	'use strict';
	/**
	 * The clock component
	 * @type {Object}
	 */
	nau.clock = {
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
			let now = new Date();
			let hours = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
			let minutes = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
			// let seconds = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds();

			return {hours, minutes};
		},

		render() {
			let {hours, minutes} = this.currentTime;
			this.clock.innerHTML = `<span class="clock__hour">${hours}</span>:<span class="clock__minute">${minutes}</span>`;
		}
	};

}());
