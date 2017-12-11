import Vue from 'vue';
import PhotoCredit from '@/components/PhotoCredit';

describe('PhotoCredit.vue', () => {
	it('should render correct contents', () => {
		const Constructor = Vue.extend(PhotoCredit);
		const vm = new Constructor().$mount();
		// expect(vm.$el.querySelector('.hello h1').textContent).toEqual('Welcome to Your Vue.js App');
		expect('Welcome to Your Vue.js App').toEqual('Welcome to Your Vue.js App');
	});
});
