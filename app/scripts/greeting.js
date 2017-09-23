/* © 2017 Int3ractive.com
 * @author Thanh
 */

import { Store, Settings } from './config';
import { t } from './i18n';

/**
 * Name component
 * Subcomponent of greeting
 * @type {Object}
 */
const nameComponent = {
	init(selector) {
		// name edit
		const nameEl = this.nameEl = $(selector);
		if (!nameEl) {
			throw new Error('nau.greeting.nam::init nameEl is not found');
		}
		const nameInput = this.nameInput = $('.greeting__name__input', nameEl);
		const nameText = this.nameText = $('.greeting__name__output', nameEl);
		if (!nameInput && !nameText) {
			throw new Error('nau.greeting.nam::init nameInput or nameText is not found');
		}

		Store.get('greetingName').then(result => {
			const currentName = result.greetingName;
			if (!currentName) {
				nameEl.classList.add('greeting__name--active');
				nameInput.classList.add('greeting__name__input--empty');
			}

			this.currentName = currentName || '';
			// set name at startup
			this.render();
		});

		this._initEvents();
	},

	_initEvents() {
		const nameEl = this.nameEl;
		const nameInput = this.nameInput;
		/*eslint-disable no-use-before-define*/
		nameEl._.events({
			click: (event) => {
				event.stopPropagation();
				nameEl.classList.add('greeting__name--active');
				nameInput.focus();
				nameInput.setSelectionRange(0, nameInput.value.length);
				// bind click outside
				document.addEventListener('click', nameInputSubmit);
			},
		});

		nameInput._.events({
			blur() {
				nameInputSubmit();
			},
			keypress(event) {
				// enter
				if (event.charCode === 13) {
					nameInputSubmit();
				}
			},
		});

		const self = this;

		function nameInputSubmit(/*event*/) {
			const newName = nameInput.value.trim();

			if (newName) {
				self.currentName = newName;
				self.render();
				Store.set({ greetingName: newName });
			} else {
				Store.get('greetingName').then(result => {
					self.currentName = result.greetingName;
					self.render();
				});
			}

			document.removeEventListener('click', nameInputSubmit);
		}
	},

	update() {
		this.render();
	},

	render() {
		if (this.currentName) {
			// only hide the input if currentName is defined
			this.nameEl.classList.remove('greeting__name--active');
			this.nameInput.classList.remove('greeting__name__input--empty');
		}
		this.nameText.textContent = this.currentName + '.';
	},
};

const Greetings = {
	init(selector) {
		this.greeting = $(selector);
		this.greetingTextEl = $('#greeting-text', this.greeting);

		// sub component
		this.Name = nameComponent;
		this.Name.init('#greeting-name', this.greeting);

		// watch for language change
		Settings.subscribe('language', () => {
			this.update();
		});

		this.update();
	},

	update() {
		// greeting
		const today = new Date();
		const hour = today.getHours();
		let greetText = '';

		if (hour < 12) {
			// morning
			greetText = t('good_morning');
		} else if (hour < 18) {
			// afternoon
			greetText = t('good_afternoon');
		} else if (hour < 22) {
			// evening
			greetText = t('good_evening');
		} else {
			greetText = t('good_night');
		}

		this.greetText = greetText;
		this.render();
	},

	render() {
		this.greetingTextEl.textContent = this.greetText;
	},
};

export default Greetings;
