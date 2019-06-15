/* © 2019 int3ractive.com
 * @author Thanh Tran
 */
import { derived } from 'svelte/store';
import { quicklinks } from '../common/quicklinks';
import { activeQuicklinks, userQuicklinks } from './settings';

export default derived(
	[activeQuicklinks, userQuicklinks],
	([$activeQuicklinks, $userQuicklinks]) => [
		...quicklinks.filter(link => $activeQuicklinks.includes(link.id)),
		...$userQuicklinks.filter(link => link.active),
	]
);
