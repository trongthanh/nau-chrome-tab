/* © 2016 int3ractive.com
 * @author Thanh
 */
(function() {
	'use strict';
	// start clock
	nau.clock.init('#clock');

	// display greeting
	nau.greeting.init('#greeting');

	// display quote
	nau.quotes.init('#quotation');

	// render wallpaper last since this is heavy routine
	nau.wallpaper.init('#wallpaper');

	// test
	// chrome.topSites.get(topSites => {
	// 	topSites.forEach(site => {
	// 		console.log('Top site:', site.title, '-', site.url);
	// 	});
	// });

}());
