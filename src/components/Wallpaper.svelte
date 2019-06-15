<style>
	/**
	 * Wallpaper background
	 */
	.wallpaper {
		position: fixed;
		width: 100%;
		height: 100%;
		background-position: center center;
		background-size: cover;
		z-index: 0;
	}

	.wallpaper--blur {
		filter: blur(5px);
	}
</style>

<div
	id="wallpaper"
	class="wallpaper"
	class:wallpaper--blur="{settingsVisible}"
	style="background-image: url({$wallpaper.imgUrl}); background-color: {$wallpaper.color};"
></div>

<script>
	import wallpaper from '../stores/wallpaper';

	export let settingsVisible = false;
</script>
