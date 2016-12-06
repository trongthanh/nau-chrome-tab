/* © 2016 NauStud.io
 * @author Thanh
 */
(function() {
	'use strict';
	const Settings = nau.Settings;

	nau.define('quicklinks', {
		init(selector) {
			this.quicklinks = $$('.quick-links__li', $(selector));
			// console.log(this.quicklinks);
			if (!this.quicklinks || !this.quicklinks.length) {
				throw new Error('Quicklinks::initial elements cannot be found');
			}

			this.render();
			this.initEvents();
		},

		initEvents() {
			Settings.subscribe('activeQuicklinks', event => {
				this.render();
			});
		},

		render() {
			let ql = Settings.get('activeQuicklinks');

			this.quicklinks.forEach(li => {
				li.classList.toggle('u-hidden', !ql[li.id]);
			});
		}
	});

}());
