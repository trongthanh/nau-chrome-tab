<template>
	<h1 id="greeting" class="greeting">
		<span id="greeting-text">{{ greetText }}</span
		>,
		<div
			id="greeting-name"
			:class="{ greeting__name: true, 'greeting__name--active': inputActive }"
			@click.stop="onNameClick"
		>
			<input
				:class="{ greeting__name__input: true, 'greeting__name__input--empty': isInputEmpty }"
				v-model="inputValue"
				v-click-outside="onInputClickOutside"
				placeholder="gorgeous"
				@focus="$event.target.select()"
				@keyup.enter="commitInput"
				@keyup.esc="cancelInput"
			/>
			<span class="greeting__name__output">{{ greetingName }}</span>
		</div>
	</h1>
</template>

<script>
/* © 2019 int3ractive.com
 * @author Thanh
 */
import vClickOutside from 'v-click-outside/lib';

export default {
	name: 'Greeting',
	inject: ['dispatch', 'store'],
	props: ['lang'],
	directives: {
		clickOutside: vClickOutside.directive,
	},
	data() {
		return {
			appState: this.store.state, // point to global Store to observe for changes
			inputActive: true,
			inputValue: '',
		};
	},
	computed: {
		isInputEmpty() {
			return !this.inputValue.trim();
		},
		greetingName() {
			return this.appState.greetingName;
		},
		greetText() {
			// greeting
			const { hours } = this.appState.currentTime;
			let greetText = '';

			if (hours < 12) {
				// morning
				greetText = 'Good morning';
			} else if (hours < 18) {
				// afternoon
				greetText = 'Good afternoon';
			} else if (hours < 22) {
				// evening
				greetText = 'Good evening';
			} else {
				greetText = 'Good night';
			}

			return greetText;
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

		commitInput(/*event*/) {
			const newName = this.inputValue.trim();
			console.log('commit input:', newName);
			if (newName) {
				this.dispatch({
					greetingName: newName,
					type: 'UPDATE_GREETING_NAME',
				});
			}

			if (this.greetingName) {
				this.inputActive = false;
			}
		},

		cancelInput() {
			const greetingName = this.greetingName;
			this.inputValue = greetingName;
			if (greetingName) {
				this.inputActive = false;
			}
		},
	},
	created() {
		if (this.greetingName) {
			this.inputValue = this.greetingName;
			this.inputActive = false;
		}
	},
};
</script>
