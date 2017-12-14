import Vue from 'vue';
import Quote from '@/components/Quote';

describe('Quote.vue', () => {
	it('should render correct contents', () => {
		const quote = {
			text: 'Yesterday, you said tomorrow.',
			author: 'Nike',
		};
		const QuoteComp = Vue.extend(Quote);
		const vm = new QuoteComp({
			propsData: { quote },
		}).$mount();

		expect(vm.$el.querySelector('.quotes__text').textContent).toEqual(quote.text);
		expect(vm.$el.querySelector('.quotes__author').textContent).toEqual(quote.author);
	});
});
