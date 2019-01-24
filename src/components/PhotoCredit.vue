<template>
<div id="photo-credit" class="photo-credit">
	<template v-if="imgData.imgId">
		<span>Photo by </span>
		<a :href="'https://unsplash.com/@' + imgData.authorUsername"
			class="photo-credit__author">{{imgData.authorName}}</a>
		<span> / </span>
		<a :href="'https://unsplash.com/photos/' + imgData.imgId"
			class="photo-credit__origin">Unsplash</a>
	</template>
</div>
</template>

<script>
/* © 2019 int3ractive.com
 * @author Thanh
 */
export default {
	name: 'PhotoCredit',
	props: ['imgData'],
};
</script>
