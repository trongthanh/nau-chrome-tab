<template>
	<div id="clock" class="clock">
		<span class="clock__hour">{{ time.hours }}</span
		>:<span class="clock__minute">{{ time.minutes }}</span>
	</div>
</template>

<script>
/* © 2019 int3ractive.com
 * @author Thanh
 */
export default {
	name: 'Clock',
	inject: ['store'],
	data() {
		return {
			appState: this.store.state,
		};
	},
	computed: {
		time() {
			return this.appState.currentTime;
		},
	},
};
</script>
