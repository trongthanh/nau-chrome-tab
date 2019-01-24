<template>
<div id="quotation" class="main__item main__item--bottom quotes">
	<p class="quotes__text">{{ quote.text }}</p>
	<p class="quotes__author">{{ quote.author }}</p>
</div>
</template>

<script>
/* © 2019 int3ractive.com
 * @author Thanh
 */
export default {
	name: 'Quote',
	props: ['quote'],
};
</script>
