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

<script>
	let wallpaperReady = true;
	let settingsActive = false;

	let wallpaper = {
		imgUrl:
			'https://images.unsplash.com/photo-1522988796650-2cc783a2a4b3?dpr=1&auto=compress,format&w=1920&q=80&cs=tinysrgb',
		imgId: 'MINzDVNWOWU',
		authorName: 'Lê Tân',
		authorUsername: 'ktsfish',
		color: '#888888', // median color of the photo
	};
</script>
