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
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
			'Droid Sans', 'Helvetica Neue', sans-serif;
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

	.main__item {
		transform: translateZ(0);
		display: flex;
	}

	.main__item--top-left {
		grid-area: tl / tl / tc / tc;
	}

	.main__item--top-right {
		grid-area: tr;
		align-items: flex-start;
		justify-content: flex-end;
	}

	.main__item--top-center {
		grid-area: tc;
		justify-content: center;
	}

	.main__item--center {
		grid-area: mc;
	}

	.main__item--bottom {
		grid-area: bc;
		max-width: 100%;
		align-items: flex-end;
	}

	.main__item--bottom-left {
		grid-area: bl;
		align-items: flex-end;
	}

	.main__item--bottom-right {
		grid-area: br;
		align-items: flex-end;
		justify-content: flex-end;
	}

	.setting-btn {
		/* compensate the hit padding */
		margin-left: -1rem;
		margin-bottom: -1rem;
	}
</style>

<Wallpaper />

<main class="main">
	<div class="main__item main__item--top-left quick-links">
		<Quicklinks />
	</div>

	<div v-if="clockMini" class="main__item main__item--top-center">
		<Clock />
	</div>
	<div v-if="clockMini" class="main__item main__item--top-right">
		<Greeting :lang="lang" />
	</div>

	<div
		v-if="clockCenter"
		:class="{
			main__item: true,
			'main__item--center': true,
			'clock-group': true,
			'clock-group--blend': clockDisplayBlend,
		}"
	>
		<Clock />
		<Greeting :lang="lang" />
	</div>

	<Quote :quote="quote" />
	<div class="main__item main__item--bottom-left">
		<button class="setting-btn icon-btn mdi mdi--settings" type="button" @click.stop="onSettingBtnClick"></button>
		<PhotoCredit :imgData="wallpaper" />
	</div>
	<div class="main__item main__item--bottom-right">
		<div class="brand-logo">
			<a href="https://int3ractive.com" class="quick-links__link logo" title="Made in Saigon"> </a>
		</div>
	</div>
</main>
<SettingsOverlay />

<script>
	export let name;
</script>
