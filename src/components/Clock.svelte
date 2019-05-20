<style>
	/**
	 * The clock
	 */
	.clock {
		font-size: 1.8rem;
		text-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
	}

	.clock--center {
		font-size: 14.5rem;
		font-weight: 100;
		letter-spacing: -3px;
		text-shadow: 0 0 25px rgba(0, 0, 0, 0.3);
	}

	.clock--blend {
		font-size: 20rem;
		font-weight: normal;
		text-shadow: none;
	}
</style>

<div class="clock" class:clock--center="{center}" class:clock--blend="{blend}">
	<span class="clock__hour">{ $timer.hours }</span>:<span class="clock__minute"
		>{ $timer.minutes }</span
	>
</div>

<script>
	/* © 2019 Int3ractive.com
	 * @author Thanh Tran
	 */
	import timer from '../stores/timer';

	export let center = false;
	export let blend = false;
</script>
