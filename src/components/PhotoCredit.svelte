<style>
	/**
	 * Photo credit
	 */
	.photo-credit {
		font-size: 0.8em;
		display: inline-block;
		margin-bottom: 0.1em;
	}
</style>

<div id="photo-credit" class="photo-credit">
	{#if creditVisible}
	<span>Photo by </span>
	<a href="https://unsplash.com/@{$wallpaper.authorUsername}" class="photo-credit__author"
		>{ $wallpaper.authorName }</a
	>
	<span> / </span>
	<a href="https://unsplash.com/photos/{$wallpaper.imgId}" class="photo-credit__origin">Unsplash</a>
	{/if}
</div>

<script>
	/* © 2019 int3ractive.com
	 * @author Thanh
	 */
	import wallpaper from '../stores/wallpaper';

	$: creditVisible = $wallpaper.authorName && $wallpaper.authorName !== 'You' && $wallpaper.imgUrl;
</script>
