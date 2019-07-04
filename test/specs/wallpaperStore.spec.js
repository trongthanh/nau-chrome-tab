import { checkWallpaperRetention } from 'src/stores/wallpaper';
import { fetchNewPhoto } from 'src/common/services';

const RENEW_DURATION = 1000 * 60 * 60;

let mockPersistStoreCallback;

function mockTime(hours = 15, minutes = 0) {
	return new Date(2018, 10, 5, hours, minutes, 0, 0).getTime();
}

function mockDateNow(hours = 15, minutes = 0) {
	const nativeNow = Date.now;
	Date.now = () => mockTime(hours, minutes);

	return function revertDateNow() {
		Date.now = nativeNow;
	};
}

function mockPersistStore({ lastPhotoFetchTime, hasNextPhoto }) {
	const nextPhoto = {
		imgUrl: 'nextPhoto.url',
		imgId: 'nextPhoto.id',
		authorName: 'nextPhoto.authorName',
		authorUsername: 'nextPhoto.authorUsername',
		color: 'nextPhoto.color',
		fetchTime: lastPhotoFetchTime + RENEW_DURATION,
	};

	return {
		lastPhotoFetch: lastPhotoFetchTime,
		nextPhoto: null,
		...(hasNextPhoto && { nextPhoto }),
		currentPhoto: {
			imgUrl: 'currentPhoto.url',
			imgId: 'currentPhoto.id',
			authorName: 'currentPhoto.authorName',
			authorUsername: 'currentPhoto.authorUsername',
			color: 'currentPhoto.color',
			fetchTime: lastPhotoFetchTime,
		}, // unsplash photo data
		userPhoto: null, // user photo data, with structure similar to wallpaper
		greetingName: '',
		// settings
		language: 'en',
		wallpaperMode: 'unsplash',
		clockDisplay: 'center',
		userPhotoName: 'Thanh',
	};
}

jest.mock('src/stores/persistStore', () => {
	return {
		__esModule: true,
		default: {
			// prettier-ignore
			defaultState: {
				currentPhoto: { imgUrl:'', imgId: '', authorName: '', authorUsername: '', color: '', fetchTime: 0 }
			},
			saveState: photoStates => {
				if (typeof mockPersistStoreCallback === 'function') {
					mockPersistStoreCallback(photoStates);
					mockPersistStoreCallback = null;
				}
			},
		},
	};
});

jest.mock('src/common/services', () => {
	return {
		__esModule: true,
		fetchNewPhoto: jest.fn(
			time =>
				new Promise((resolve, reject) =>
					resolve({
						imgUrl: 'fetchNewPhoto.url',
						imgId: 'fetchNewPhoto.id',
						authorName: 'fetchNewPhoto.authorName',
						authorUsername: 'fetchNewPhoto.authorUsername',
						color: 'fetchNewPhoto.color',
						fetchTime: time,
					})
				)
		),
	};
});
describe('test the mock functions', () => {
	test('mockTime() shoudld return controlled time', () => {
		expect(mockTime(9, 30)).toBe(new Date(2018, 10, 5, 9, 30, 0, 0).getTime());
		expect(mockTime(23)).toBe(new Date(2018, 10, 5, 23, 0, 0, 0).getTime());
	});

	test('mockDateNow() shoudld make Date.now() return fixed time', () => {
		const revertDateNow = mockDateNow(12, 3);
		expect(Date.now()).toBe(new Date(2018, 10, 5, 12, 3, 0, 0).getTime());
		expect(Date.now()).toBe(new Date(2018, 10, 5, 12, 3, 0, 0).getTime());
		expect(Date.now()).toBe(new Date(2018, 10, 5, 12, 3, 0, 0).getTime());

		revertDateNow();
		expect(Date.now()).not.toBe(new Date(2018, 10, 5, 12, 3, 0, 0).getTime());
	});
});

describe('wallpaper store - checkWallpaperRetention()', () => {
	test('same hour, return currentPhoto', () => {
		const revertDateNow = mockDateNow(10, 30);
		const persistStore = mockPersistStore({
			lastPhotoFetchTime: mockTime(10),
			hasNextPhoto: true,
		});

		const currentPhoto = checkWallpaperRetention(persistStore);
		expect(currentPhoto).toBeDefined();
		expect(currentPhoto).toBe(persistStore.currentPhoto);
		expect(currentPhoto.imgId).toBe('currentPhoto.id');
		revertDateNow();
	});

	test('next hour, return nextPhoto', done => {
		const revertDateNow = mockDateNow(11, 1);
		const persistStore = mockPersistStore({
			lastPhotoFetchTime: mockTime(10),
			hasNextPhoto: true,
		});

		mockPersistStoreCallback = photoStates => {
			const updatedPersistStore = {
				...persistStore,
				...photoStates,
			};

			expect(updatedPersistStore.nextPhoto.imgId).toBe('fetchNewPhoto.id');
			expect(updatedPersistStore.nextPhoto.fetchTime).toBe(Date.now() + RENEW_DURATION);
			expect(updatedPersistStore.lastPhotoFetch).toBe(Date.now());
			revertDateNow();
			done();
		};

		const currentPhoto = checkWallpaperRetention(persistStore);
		expect(currentPhoto).toBeDefined();
		expect(currentPhoto).toBe(persistStore.nextPhoto);
		expect(currentPhoto.imgId).toBe('nextPhoto.id');
	});
});

describe('wallpaper store - checkWallpaperRetention() - period changed', () => {
	let persistStore = mockPersistStore({
		lastPhotoFetchTime: mockTime(15),
		hasNextPhoto: true,
	});

	beforeEach(() => {
		fetchNewPhoto.mockClear();
	});

	test('reopen after long time, time shift from day to dusk', done => {
		// note that next hour will be night,
		// this is the cause for continuous new photo fetch
		const revertDateNow = mockDateNow(19, 30);

		mockPersistStoreCallback = photoStates => {
			const updatedPersistStore = {
				...persistStore,
				...photoStates,
			};

			expect(updatedPersistStore.nextPhoto.fetchTime).toBe(Date.now());
			expect(updatedPersistStore.lastPhotoFetch).toBe(Date.now() - RENEW_DURATION);
			revertDateNow();
			// store updatedPersistStore for next test
			persistStore = updatedPersistStore;
			done();
		};

		const currentPhoto = checkWallpaperRetention(persistStore);
		expect(currentPhoto).toBeDefined();
		expect(currentPhoto).toBe(persistStore.nextPhoto);
		expect(currentPhoto.imgId).toBe('nextPhoto.id');
	});

	test('after day period detected, swap photo immediately, and fetch for next hour', done => {
		const revertDateNow = mockDateNow(19, 32);

		mockPersistStoreCallback = photoStates => {
			const updatedPersistStore = {
				...persistStore,
				...photoStates,
			};

			expect(updatedPersistStore.nextPhoto.imgId).toBe('fetchNewPhoto.id');
			expect(updatedPersistStore.nextPhoto.fetchTime).toBe(Date.now() + RENEW_DURATION);
			expect(updatedPersistStore.lastPhotoFetch).toBe(Date.now());

			revertDateNow();
			// store updatedPersistStore for next test
			persistStore = updatedPersistStore;
			done();
		};

		const currentPhoto = checkWallpaperRetention(persistStore);
		expect(currentPhoto).toBeDefined();
		expect(currentPhoto.imgId).toBe('fetchNewPhoto.id');
		expect(currentPhoto.fetchTime).toBe(persistStore.lastPhotoFetch + RENEW_DURATION);
	});

	test('on the third open, no photo swap should happen', () => {
		const revertDateNow = mockDateNow(19, 34);

		// TODO: mock so that we can detect  fetchNewPhoto should not be called

		const initCurrentPhoto = persistStore.currentPhoto;
		const initLastPhotoFetch = persistStore.lastPhotoFetch;

		const currentPhoto = checkWallpaperRetention(persistStore);
		expect(currentPhoto).toBe(initCurrentPhoto);
		expect(persistStore.lastPhotoFetch).toBe(initLastPhotoFetch);
		expect(fetchNewPhoto).not.toHaveBeenCalled();

		revertDateNow();
	});

	test('on the fourth open, no photo swap should happen', () => {
		const revertDateNow = mockDateNow(19, 45);

		// TODO: mock so that we can detect  fetchNewPhoto should not be called
		const initCurrentPhoto = persistStore.currentPhoto;
		const initLastPhotoFetch = persistStore.lastPhotoFetch;

		const currentPhoto = checkWallpaperRetention(persistStore);
		expect(currentPhoto).toBe(initCurrentPhoto);
		expect(persistStore.lastPhotoFetch).toBe(initLastPhotoFetch);
		expect(fetchNewPhoto).not.toHaveBeenCalled();
		revertDateNow();
	});
});
