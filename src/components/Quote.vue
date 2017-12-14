<template>
<div id="quotation" class="main__item main__item--bottom quotes">
	<p class="quotes__text">{{ quote.text }}</p>
	<p class="quotes__author">{{ quote.author }}</p>
</div>
</template>

<script>
export default {
	name: 'Quote',
	props: ['quote'],
};
</script>
