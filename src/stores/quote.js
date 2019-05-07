/* © 2019 int3ractive.com
 * @author Thanh Tran
 */
import { readable } from 'svelte/store';
import { enQuotes, viQuotes } from '../common/quotes';

// TODO: replace with settings store
const settings = {
	language: 'en',
};

export default readable(null, function start(set) {
	const quoteList = settings.language === 'vi' ? viQuotes : enQuotes;

	const randomQuote = quoteList[Math.floor(Math.random() * quoteList.length)];
	if (randomQuote) {
		set({
			text: randomQuote[0],
			author: randomQuote[1],
		});
	} else {
		set({
			text: 'I dream, therefore, I become!',
			author: 'Cheryl Grossman',
		});
	}

	// return function stop() {};
});
