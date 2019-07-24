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
		visibility: visible;
		opacity: 1;
		transition: opacity 0.3s ease;
	}

	.clock-group--blend {
		color: #eee; /* to be changed at inline style */
		mix-blend-mode: color-dodge;
		filter: brightness(0.6);
	}

	.clock-group--invisible {
		visibility: hidden;
		opacity: 0;
	}

	/**
	 * Quick links group overlay
	 */
	.quick-links {
		margin: -1rem; /* compensate buttons padding */
		opacity: 0.5;
		transition: opacity 200ms;
		z-index: 1; /* raise it above mini clock */
	}

	.quick-links:hover {
		opacity: 1;
	}

	/* Brand logo */
	.logo {
		padding: 1rem;
		display: inline-block;
		color: white;
		font-size: 2rem;
		font-weight: bold;
		line-height: 1;
		text-decoration: none;
		text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
		opacity: 0.5;
		transition: all 200ms;
		/* compensate padding hit */
		margin-right: -1rem;
		margin-bottom: -1rem;
	}

	.logo:hover {
		color: white;
		opacity: 1;
		-ms-transform: translateY(-5px);
		transform: translateY(-5px);
	}

	/* square icon */
	.logo::before {
		display: block;
		content: '';
		width: 1.5rem;
		height: 2rem;
		border: solid 3px white;
	}

	/* brand logo has text on the left */
	.logo::after {
		content: attr(data-title);
		position: absolute;
		transform: translateX(-50%);
		font-size: 0.7em;
		font-weight: normal;
		white-space: nowrap;
		transition: all 200ms;
		visibility: hidden;
		opacity: 0;
		filter: none;

		bottom: 1em;
		left: auto;
		right: 35px;
		transform: translateX(0);
	}

	.logo:hover::after {
		visibility: visible;
		opacity: 1;
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

<svelte:head>
	<title>{$asciimoji}</title>
</svelte:head>

<Wallpaper settingsVisible="{settingsPanelVisible}" />

<main class="main">
	<div class="main__item main__item--top-left quick-links">
		<Quicklinks />
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
		class:clock-group--invisible="{!$settingsReady}"
		style="{centerGroupStyle}"
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
			title="Open Settings"
			on:click="{toggleSettingPanels}"
		></button>
		<PhotoCredit />
	</div>
	<div class="main__item main__item--bottom-right">
		<div class="brand-logo">
			<a
				href="https://int3ractive.com/nau-tab"
				class="quick-links__link logo"
				data-title="Made in Saigon"
				title="Visit project site"
			>
			</a>
		</div>
	</div>
</main>
<SettingsOverlay visible="{settingsPanelVisible}" />

<svelte:window on:keydown="{handleKeyDown}" />

<script>
	/* © 2019 int3ractive.com
	 * @author Thanh Tran
	 */
	import { setContext } from 'svelte';
	import Wallpaper from './components/Wallpaper.svelte';
	import PhotoCredit from './components/PhotoCredit.svelte';
	import Quicklinks from './components/Quicklinks.svelte';
	import Quote from './components/Quote.svelte';
	import Clock from './components/Clock.svelte';
	import Greeting from './components/Greeting.svelte';
	import SettingsOverlay from './components/SettingsOverlay.svelte';
	import { clockDisplay, language, settingsReady } from './stores/settings';
	import wallpaper from './stores/wallpaper';
	import asciimoji from './stores/asciimoji';

	$: clockMini = $clockDisplay === 'mini';
	$: clockDisplayBlend = $clockDisplay === 'blend';
	$: centerGroupStyle = $clockDisplay === 'blend' ? `color: ${$wallpaper.color}` : '';

	let settingsPanelVisible = false;

	function toggleSettingPanels() {
		settingsPanelVisible = !settingsPanelVisible;
		// console.log(settingsPanelVisible);
	}

	function handleKeyDown(event) {
		// console.log(event.key);
		if (settingsPanelVisible && event.key === 'Escape') {
			settingsPanelVisible = false;
		}
	}

	setContext('settingsPanel', {
		toggleSettingPanels,
	});
</script>
