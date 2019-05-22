/* © 2019 int3ractive.com
 * @author Thanh Tran
 */
import { readable } from 'svelte/store';

const asciimojiSet = [
	'☜(⌒▽⌒)☞',
	'ʕ·͡ᴥ·ʔ',
	'❤',
	'※(^o^)/※',
	'(｡^‿‿^｡)',
	'<(^_^)>',
	'(҂◡_◡) ᕤ',
	'(づ｡`‿‿`｡)づ',
	'(っ´ω`c)♡',
	'(づ ￣ ³￣)づ',
	'-`ღ´-',
	'✌(-‿-)✌',
	'(^-^)/',
	'⊹╰(⌣ʟ⌣)╯⊹',
];

/**
 * Generate random asciimoji
 */
export default readable(null, function start(set) {
	set(asciimojiSet[Math.floor(Math.random() * asciimojiSet.length)]);
});
