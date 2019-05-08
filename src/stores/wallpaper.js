/* © 2019 Int3ractive.com
 * @author Thanh Tran
 */
import { derived } from 'svelte/store';
import persistStore from './persistStore';
import { wallpaperMode } from './settings';

// const wallpaperUnsplash = {
// 	imgUrl:
// 		'https://images.unsplash.com/photo-1462688681110-15bc88b1497c?dpr=1&auto=compress,format&w=1920&q=80&cs=tinysrgb',
// 	imgId: 'gzeUpbjoTUA',
// 	authorName: 'Hoach Le Dinh',
// 	authorUsername: 'hoachld',
// 	color: '#888888', // median color of the photo
// };

// const wallpaperUser = {
// 	imgUrl:
// 		'https://images.unsplash.com/photo-1522988796650-2cc783a2a4b3?dpr=1&auto=compress,format&w=1920&q=80&cs=tinysrgb',
// 	imgId: 'MINzDVNWOWU',
// 	authorName: 'Lê Tân',
// 	authorUsername: 'ktsfish',
// 	color: '#888888',
// };

export default derived([wallpaperMode, persistStore], ([$wallpaperMode, $persistStore]) => {
	if ($wallpaperMode === 'user' && $persistStore.userPhoto) {
		return $persistStore.userPhoto;
	}
	// TODO: fetch next photo here

	return $persistStore.currentPhoto;
});
