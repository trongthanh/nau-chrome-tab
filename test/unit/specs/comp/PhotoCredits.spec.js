import Vue from 'vue';
import PhotoCredit from '@/components/PhotoCredit';

describe('PhotoCredit.vue', () => {
	it('should render correct contents', () => {
		const imgData = {
			imgUrl: 'https://images.unsplash.com/photo-1',
			imgId: 'unsplashimgid',
			authorName: 'Author Name',
			authorUsername: 'authorUsername',
		};

		const PhotoCreditComp = Vue.extend(PhotoCredit);
		const vm = new PhotoCreditComp({
			propsData: { imgData },
		}).$mount();

		expect(vm.$el.querySelector('.photo-credit__author').textContent).toEqual(imgData.authorName);
		expect(vm.$el.querySelector('.photo-credit__author').href).toEqual(
			`https://unsplash.com/@${imgData.authorUsername}`,
		);
		expect(vm.$el.querySelector('.photo-credit__origin').textContent).toEqual('Unsplash');
		expect(vm.$el.querySelector('.photo-credit__origin').href).toEqual(`https://unsplash.com/photos/${imgData.imgId}`);
	});
});
