/* © 2019 int3ractive.com
 * @author Thanh Tran
 */
import { derived } from 'svelte/store';
import { quicklinks } from '../common/quicklinks';
import { activeQuicklinks } from './settings';

export default derived(activeQuicklinks, $activeQuicklinks => {
	console.log($activeQuicklinks);
	return quicklinks.filter(link => $activeQuicklinks.includes(link.id));
});
