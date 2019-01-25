<template>
<h1 id="greeting" class="greeting">
	<span id="greeting-text">{{ greetText }}</span>,
	<div id="greeting-name" :class="{ greeting__name: true, 'greeting__name--active': inputActive}"
		@click.stop="onNameClick"
	>
		<input :class="{ greeting__name__input: true, 'greeting__name__input--empty': isInputEmpty}"
			v-model="inputValue"
			v-click-outside="onInputClickOutside"
			placeholder="gorgeous"
			@focus="$event.target.select()"
			@blur="commitInput"
			@keyup.enter="commitInput"
			@keyup.esc="cancelInput"
		>
		<span class="greeting__name__output">{{ currentName }}</span>
	</div>
</h1>
</template>

<script>
/* © 2019 int3ractive.com
 * @author Thanh
 */
import vClickOutside from 'v-click-outside';
import Store from '../common/Store';

export default {
	name: 'Greeting',
	props: ['lang'],
	directives: {
		clickOutside: vClickOutside.directive,
	},
	data() {
		return {
			greetText: '',
			inputActive: true,
			inputValue: '',
			currentName: '',
		};
	},
	computed: {
		isInputEmpty() {
			return !this.inputValue.trim();
		},
	},
	methods: {
		onNameClick() {
			this.inputActive = true;
			// console.log('Name click');
		},
		onInputClickOutside() {
			if (this.inputActive) {
				this.commitInput();
			}
		},

		update() {
			// greeting
			const today = new Date();
			const hour = today.getHours();
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
				greetText = 'Good night';
			}

			this.greetText = greetText;
		},

		commitInput(/*event*/) {
			const newName = this.inputValue.trim();
			console.log('commit input:', newName);
			if (newName) {
				this.currentName = newName;
				Store.set('greetingName', newName);
			} else {
				this.currentName = Store.get('greetingName');
			}

			if (this.currentName) {
				this.inputActive = false;
			}
		},

		cancelInput() {
			const greetingName = Store.get('greetingName') || '';
			this.currentName = greetingName;
			this.inputValue = greetingName;
			if (greetingName) {
				this.inputActive = false;
			}
		},
	},
	created() {
		const greetingName = Store.get('greetingName');
		if (greetingName) {
			this.currentName = greetingName;
			this.inputValue = greetingName;
			this.inputActive = false;
		}

		Store.subscribe('all', states => {
			console.log('resume greeting name', states);
		});

		Store.subscribe('currentTime', () => {
			this.update();
		});

		this.update();
	},
};
</script>
