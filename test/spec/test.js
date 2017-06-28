(function() {
	'use strict';

	describe('Give it some context', function() {
		describe('maybe a bit more context here', function() {
			it('should run here few assertions', function() {

			});
		});
	});
}());

// FIXME: to write unit test
// $.shallowEqual('1', 4)
// false
// $.shallowEqual('1', 1)
// true
// $.shallowEqual('10', 10)
// true
// $.shallowEqual('10', 1)
// false
// $.shallowEqual({a: 1, b: 2} , [])
// false
// $.shallowEqual({a: 1, b: 2} , {a: 1, b: 2, c: null})
// true
// $.shallowEqual({a: 1, b: 2} , {a: 1, b: 2, c: 3})
// false
// $.shallowEqual({a: 1, b: 2} , {a: 1, b: 2, c: ''})
// false
// $.shallowEqual({a: 1, b: 2} , {a: 1, b: 2, c: '0'})
// false
