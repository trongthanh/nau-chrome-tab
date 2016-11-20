/* © 2016 int3ractive.com
 * @author Thanh
 */
(function() {
	'use strict';
	nau.clock = {
		start(callback) {
			if (typeof callback !== 'function') {
				throw new Error('Clock.start: callback is not function');
			}
			// update time immediately
			this.currentTime = this.getCurrentTime();
			callback(this.currentTime);

			this.cb = callback;
			this.tickId = setInterval(() => {
				const timeText = this.getCurrentTime();
				if (timeText !== this.currentTime) {
					this.currentTime = timeText;
					callback(this.currentTime);
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

			return `<span class="clock__hour">${hours}</span>:<span class="clock__minute">${minutes}</span>`;
		}
	};

}());
