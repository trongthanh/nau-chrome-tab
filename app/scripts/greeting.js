/* © 2016 NauStud.io
 * @author Thanh
 */
(function() {
	'use strict';
	const Store = nau.Store;

	nau.greeting = {
		init(selector) {
			this.greeting = $(selector);
			this.greetingTextEl = $('#greeting-text', this.greeting);

			nau.greeting.name.init('#greeting-name', this.greeting);

			this.update();
		},

		update() {
			// greeting
			let today = new Date();
			let hour = today.getHours();
			let greetText = '';

			if (hour < 12) {
				// morning
				greetText = 'Good morning';
			} else if (hour < 18) {
				// afternoon
				greetText = 'Good afternoon';
			} else if (hour < 22) {
				// evening
				greetText = 'Good evening';
			} else {
				greetText = 'Please go to bed early';
			}

			this.greetText = greetText;
			this.render();
		},

		render() {
			this.greetingTextEl.textContent = this.greetText;
			this.name.render();
		}
	};

	/**
	 * Name component
	 * Subcomponent of greeting
	 * @type {Object}
	 */
	nau.greeting.name = {
		init(selector) {
			// name edit
			let nameEl = this.nameEl = $(selector);
			if (!nameEl) {
				throw new Error('nau.greeting.nam::init nameEl is not found');
			}
			let nameInput = this.nameInput = $('.greeting__name__input', nameEl);
			let nameText = this.nameText = $('.greeting__name__output', nameEl);
			if (!nameInput && !nameText) {
				throw new Error('nau.greeting.nam::init nameInput or nameText is not found');
			}

			let currentName = Store.get('greetingName');

			if (!currentName) {
				currentName = '________';
				Store.set('greetingName', currentName);
			}

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
				}
			});

			let self = this;
			function nameInputSubmit(event) {
				let newName = nameInput.value.trim();

				if (newName) {
					self.currentName = newName;
					Store.set('greetingName', newName);
				} else {
					self.currentName = Store.get('greetingName');
				}
				self.render();
				nameEl.classList.remove('greeting__name--active');
				document.removeEventListener('click', nameInputSubmit);
			}
			this.currentName = currentName;
			// set name at startup
			this.render();
		},

		update() {

			this.render();
		},

		render() {
			this.nameText.textContent = this.currentName + '.';
		}
	};

}());
