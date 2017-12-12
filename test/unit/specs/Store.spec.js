import PersistStorage from '@/common/PersistStorage';
import Store from '@/common/Store';

const mockStates = {
	lastPhotoFetch: Date.now(), // timestamp
	nextPhoto: {
		imgUrl: 'https://images.unsplash.com/photo-2',
		imgId: 'photo2',
		authorName: 'Ms. B',
		authorUsername: 'a',
	},
	currentPhoto: {
		imgUrl: 'https://images.unsplash.com/photo-1', // not real photo path
		imgId: 'photo1',
		authorName: 'Mr. A',
		authorUsername: 'b',
	},
	userPhoto: {
		imgUrl: 'data:image/jpeg;base64,abcdef', // not real data URI
		imgId: 'DSC_IMG0001.jpg',
		authorName: 'You',
		authorUsername: '',
	},
	settings: {
		language: 'vi',
		wallpaperMode: 'unsplash', // unsplash or user
		userPhotoName: 'DSC_IMG0001.jpg', // file name to display at file selector
		// prettier-ignore
		activeQuicklinks: {
			gmail: true, gcalendar: true, gdrive: true, github: true, bitbucket: true, trello: true, facebook: true, twitter: false, gplus: false, tuoitre: true, vnexpress: false, thanhnien: false, gphotos: false, youtube: false, naujukebox: false,
		},
	},
};

describe('Store defaults', () => {
	it('Store.states', () => {
		// store should has these default toplevel state

		expect(Store.states.lastPhotoFetch).toBeDefined();
		expect(Store.states.nextPhoto).toBeDefined();
		expect(Store.states.currentPhoto).toBeDefined();
		expect(Store.states.userPhoto).toBeDefined();
		expect(Store.states.settings).toBeDefined();
	});

	it('Store.rehydrate', () => {
		expect.assertions(1);

		return PersistStorage.set(mockStates).then(() =>
			Store.rehydrate().then(states => {
				expect(states).toEqual(mockStates);
			}),
		);
	});
});

describe('Store operations', () => {
	// setup
	beforeEach(() => PersistStorage.set(mockStates).then(() => Store.rehydrate()));

	it('Store.get', () => {
		// store should has these default toplevel state

		expect(Store.get('currentPhoto')).toEqual({
			imgUrl: 'https://images.unsplash.com/photo-1',
			imgId: 'photo1',
			authorName: 'Mr. A',
			authorUsername: 'b',
		});

		const settings = Store.get('settings');
		expect(settings.language).toEqual('vi');
		expect(settings.wallpaperMode).toEqual('unsplash');
		expect(settings.userPhotoName).toEqual('DSC_IMG0001.jpg');
		expect(settings.activeQuicklinks).toEqual(mockStates.settings.activeQuicklinks);
	});

	it('Store.set', () => {
		const newPhoto = {
			imgUrl: 'https://images.unsplash.com/photo-3',
			imgId: 'photo3',
			authorName: 'Mrs. C',
			authorUsername: 'c',
		};

		Store.set('currentPhoto', newPhoto);

		expect(Store.get('currentPhoto')).toEqual(newPhoto);
	});

	it('Store.subscribe (async)', done => {
		const newPhoto = {
			imgUrl: 'https://images.unsplash.com/photo-3',
			imgId: 'photo3',
			authorName: 'Mrs. C',
			authorUsername: 'c',
		};

		Store.subscribe('currentPhoto', event => {
			expect(event.currentPhoto).toEqual(newPhoto);
			done();
		});

		Store.set('currentPhoto', newPhoto);
	});
});
