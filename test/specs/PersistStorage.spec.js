import PersistStorage from 'src/common/PersistStorage';

describe('PersistStorage', () => {
	it('PersistStorage.set', () => {
		expect.assertions(1);

		return PersistStorage.set({
			key1: 'string',
			key2: 123,
			key3: true,
			key4: { foo: 'bar' },
			key5: [1, 'a'],
		}).then(result => {
			expect(result).toEqual({
				key1: 'string',
				key2: 123,
				key3: true,
				key4: { foo: 'bar' },
				key5: [1, 'a'],
			});
		});
	});

	it('PersistStorage.get', () => {
		expect.assertions(1);

		return PersistStorage.set({
			key1: 'string',
			key2: 123,
			key3: true,
			key4: { foo: 'bar' },
			key5: [1, 'a'],
		}).then(() => {
			PersistStorage.get(['key1', 'key2', 'key3', 'key4', 'key5']).then(result => {
				expect(result).toEqual({
					key1: 'string',
					key2: 123,
					key3: true,
					key4: { foo: 'bar' },
					key5: [1, 'a'],
				});
			});
		});
	});
});
