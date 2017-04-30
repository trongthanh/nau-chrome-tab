/* © 2016 int3ractive.com
 * @author Thanh
 */
import { Settings } from './config';
import clock from './clock';
import greeting from './greeting';
import quotes from './quotes';
import quicklinks from './quicklinks';
import wallpaper from './wallpaper';

// make sure settings are get and ready first
Settings.init().then((/* settings */) => {
	// start clock
	clock.init('#clock');

	// display greeting
	greeting.init('#greeting');

	// display quote
	quotes.init('#quotation');

	// display quicklinks
	quicklinks.init('#quicklinks');

	// render wallpaper last since this is heavy routine
	wallpaper.init('#wallpaper');
});

$('#settings-btn')._.events({
	click(/* event */) {
		$('#settings-modal').classList.add('modal--show');
	},
});

$$('#settings-close-btn, .modal-overlay')._.events({
	click(/* event */) {
		$('#settings-modal').classList.remove('modal--show');
	},
});


// test
// chrome.topSites.get(topSites => {
// 	topSites.forEach(site => {
// 		console.log('Top site:', site.title, '-', site.url);
// 	});
// });

