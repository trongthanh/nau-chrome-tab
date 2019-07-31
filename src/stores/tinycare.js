/* © 2019 int3ractive.com
 * @author Thanh Tran
 */
import { derived } from 'svelte/store';
import { enTinycare } from '../common/tinycareMessages';
import { language } from './settings';

export default derived(language, $language => {
	// TODO: add Vietnamese later
	const tinycareLines = $language === 'vi' ? enTinycare : enTinycare;

	const [icon, text] = tinycareLines[Math.floor(Math.random() * tinycareLines.length)];

	// capitalize:
	const processedText = text[0].toUpperCase() + text.slice(1);

	return [icon, processedText];
});
