<style>
	:global(body) {
		text-rendering: geometricPrecision; /* this will make thin font not being bolden by subpixel-antialias Chrome */
		-webkit-font-smoothing: antialiased;
		margin: 0;
		padding: 0;
		height: 100%;
		color: white;
		font-size: 1.8rem;
		/* use native font-family for fastest rendering */
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
			'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
		background-position: center center;
		background-size: cover;
		background-color: #eee;
	}

	:global(button) {
		cursor: pointer;
	}

	:global(button:focus) {
		outline: none;
	}

	:global(a),
	:global(a:visited) {
		color: white;
		transition: all 200ms ease;
	}

	:global(a:hover) {
		color: #eee;
		text-decoration-color: #977857;
	}

	:global([type='radio']),
	:global([type='check']),
	:global(input + label) {
		cursor: pointer;
	}

	:global(fieldset) {
		margin-bottom: 1rem;
	}

	/**
	 * Main container
	 */
	.main {
		height: 100%;
		padding: 2rem;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		grid-template-rows: 1fr 3fr 1fr;
		grid-template-areas:
			'tl tc tc tr'
			'ml mc mc mr'
			'bl bc bc br';
	}

	:global(.main__item) {
		transform: translateZ(0);
		display: flex;
	}

	:global(.main__item--top-left) {
		grid-area: tl / tl / tc / tc;
	}

	:global(.main__item--top-right) {
		grid-area: tr;
		align-items: flex-start;
		justify-content: flex-end;
	}

	:global(.main__item--top-center) {
		grid-area: tc;
		justify-content: center;
	}

	:global(.main__item--center) {
		grid-area: mc;
	}

	:global(.main__item--bottom) {
		grid-area: bc;
		max-width: 100%;
		align-items: flex-end;
	}

	:global(.main__item--bottom-left) {
		grid-area: bl;
		align-items: flex-end;
	}

	:global(.main__item--bottom-right) {
		grid-area: br;
		align-items: flex-end;
		justify-content: flex-end;
	}

	.setting-btn {
		/* compensate the hit padding */
		margin-left: -1rem;
		margin-bottom: -1rem;
	}

	/**
	 * Clock group center
	 */
	.clock-group {
		text-align: center;
		/* recipe to vertical align center */
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}

	.clock-group--blend {
		color: #444;
		mix-blend-mode: color-dodge;
	}

	/**
	 * Utilities
	 */
	:global(.icon-btn) {
		appearance: none;
		border: 0;
		background: none;
		color: white;
		padding: 1rem;
		transition: color 200ms ease;
	}

	:global(.icon-btn:hover) {
		color: #977857;
	}

	:global(.copyright .icon-btn) {
		padding: 0.5rem;
	}

	:global(.u-hidden) {
		display: none;
	}
</style>

<Wallpaper settingsActive="{settingsPanelVisible}" />

<main class="main">
	<div class="main__item main__item--top-left quick-links">
		<!-- <Quicklinks /> -->
	</div>

	{#if clockMini}
	<div class="main__item main__item--top-center">
		<Clock />
	</div>
	<div class="main__item main__item--top-right">
		<Greeting lang="{$language}" />
	</div>
	{:else}
	<div
		class="main__item main__item--center clock-group"
		class:clock-group--blend="{clockDisplayBlend}"
	>
		<Clock center blend="{clockDisplayBlend}" />
		<Greeting lang="{$language}" center blend="{clockDisplayBlend}" />
	</div>
	{/if}

	<Quote />
	<div class="main__item main__item--bottom-left">
		<button
			class="setting-btn icon-btn mdi mdi--settings"
			type="button"
			on:click="{toggleSettingPanels}"
		></button>
		<PhotoCredit />
	</div>
	<div class="main__item main__item--bottom-right">
		<div class="brand-logo">
			<a href="https://int3ractive.com" class="quick-links__link logo" title="Made in Saigon"> </a>
		</div>
	</div>
</main>
<SettingsOverlay active="{settingsPanelVisible}" />

<script>
	/* © 2019 int3ractive.com
	 * @author Thanh Tran
	 */
	import { setContext } from 'svelte';
	import Wallpaper from './components/Wallpaper.svelte';
	import PhotoCredit from './components/PhotoCredit.svelte';
	import Quote from './components/Quote.svelte';
	import Clock from './components/Clock.svelte';
	import Greeting from './components/Greeting.svelte';
	import SettingsOverlay from './components/SettingsOverlay.svelte';
	import { clockDisplay, language } from './stores/settings';

	$: clockMini = $clockDisplay === 'mini';
	$: clockDisplayBlend = $clockDisplay === 'blend';

	let settingsPanelVisible = false;

	function toggleSettingPanels() {
		settingsPanelVisible = !settingsPanelVisible;
		console.log(settingsPanelVisible);
	}

	setContext('settingsPanel', {
		toggleSettingPanels,
	});
</script>
