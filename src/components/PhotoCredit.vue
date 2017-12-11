<template>
<div id="photo-credit" class="photo-credit">
	<template v-if="imgData.imgId">
		<span>Photo by</span>
		<a :href="'https://unsplash.com/@' + imgData.authorUsername"
			class="photo-credit__author">{{imgData.authorName}}</a>
		<span>/</span>
		<a :href="'https://unsplash.com/photos/' + imgData.imgId"
			class="photo-credit__origin">Unsplash</a>
	</template>
</div>
</template>

<script>
import Store from '../common/Store';

export default {
	name: 'PhotoCredit',
	data() {
		return {
			imgData: {
				imgUrl: '',
				imgId: '',
				authorName: '',
				authorUsername: '',
			},
		};
	},

	created() {
		// this.imgData = { ...Store.get('currentPhoto') };
	},
};
</script>
