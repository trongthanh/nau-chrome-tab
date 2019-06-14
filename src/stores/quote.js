/* © 2019 int3ractive.com
 * @author Thanh Tran
 */
import { derived } from 'svelte/store';
import { enQuotes, viQuotes } from '../common/quotes';
import { language } from './settings';

export default derived(language, $language => {
	const quoteList = $language === 'vi' ? viQuotes : enQuotes;

	const randomQuote = quoteList[Math.floor(Math.random() * quoteList.length)];
	if (randomQuote) {
		return {
			text: randomQuote[0],
			author: randomQuote[1],
		};
	}
	return {
		text: 'I dream, therefore, I become!',
		author: 'Cheryl Grossman',
	};
});
