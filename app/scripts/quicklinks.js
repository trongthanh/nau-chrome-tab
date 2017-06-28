/* © 2016 NauStud.io
 * @author Thanh
 */
import { Settings } from './config';

const QuickLinks = {
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
		Settings.subscribe('activeQuicklinks', (/*event*/) => {
			this.render();
		});
	},

	render() {
		const ql = Settings.get('activeQuicklinks');

		this.quicklinks.forEach(li => {
			li.classList.toggle('u-hidden', !ql[li.id]);
		});
	},
};

export default QuickLinks;
