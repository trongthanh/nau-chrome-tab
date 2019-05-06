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
		transition: opacity 500ms;
		opacity: 0;
		z-index: 0;
	}

	.wallpaper--ready {
		opacity: 1;
	}

	.wallpaper--blur {
		filter: blur(5px);
	}
</style>

<div
	id="wallpaper"
	class="wallpaper"
	class:wallpaper--ready="{wallpaperReady}"
	class:wallpaper--blur="{settingsActive}"
	style="background-image:url('{wallpaper.imgUrl}')"
></div>

<script></script>
