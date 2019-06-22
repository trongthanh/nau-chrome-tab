<style>
	/**
	 * Photo credit
	 */
	.photo-credit {
		font-size: 0.8em;
		display: inline-block;
		margin-bottom: 0.1em;
		text-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
	}
</style>

<div id="photo-credit" class="photo-credit">
	{#if creditVisible}
	<span>Photo by </span>
	<a
		href="https://unsplash.com/@{$wallpaper.authorUsername}?utm_source=nau-tab&utm_medium=referral"
		class="photo-credit__author"
		>{ $wallpaper.authorName }</a
	>
	<span> / </span>
	<a
		href="https://unsplash.com/photos/{$wallpaper.imgId}?utm_source=nau-tab&utm_medium=referral"
		class="photo-credit__origin"
		>Unsplash</a
	>
	{/if}
</div>

<script>
	/* © 2019 int3ractive.com
	 * @author Thanh
	 */
	import wallpaper from '../stores/wallpaper';

	$: creditVisible = $wallpaper.authorName && $wallpaper.authorName !== 'You' && $wallpaper.imgUrl;
</script>
