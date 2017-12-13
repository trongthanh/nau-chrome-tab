<template>
<div id="quotation" class="main__item main__item--bottom quotes">
	<p class="quotes__text">{{ quote.text }}</p>
	<p class="quotes__author">{{ quote.author }}</p>
</div>
</template>

<script>
import { enQuotes, viQuotes } from '../common/quotes';

export default {
	name: 'Quote',
	props: ['lang'],
	computed: {
		quote() {
			const quoteList = this.lang === 'vi' ? viQuotes : enQuotes;
			const randomQuote = quoteList[Math.floor(Math.random() * quoteList.length)];
			if (randomQuote) {
				return {
					text: randomQuote[0],
					author: randomQuote[1],
				};
			}

			return {
				text: 'I dream, therefore, I become!',
				author: 'Cheryl Grossman',
			};
		},
	},
};
</script>
