<template>
<!-- modal settings popup -->
<div :class="{'modal-overlay': true, 'modal-overlay--active': active}">
	<div class="modal__background" :style="{backgroundImage: `url(${currentPhoto.imgUrl})`}"></div>
	<SettingsModal v-click-outside="onModalClose" @close="onModalClose" />
</div><!-- /.modal-overlay -->
</template>

<script>
/* © 2019 int3ractive.com
 * @author Thanh
 */
import vClickOutside from 'v-click-outside';
import Store from '../common/Store';
import SettingsModal from './SettingsModal';

export default {
	name: 'SettingsOverlay',
	components: {
		SettingsModal,
	},
	directives: {
		clickOutside: vClickOutside.directive,
	},
	data() {
		return {
			active: false,
			currentPhoto: Store.get('currentPhoto'),
		};
	},
	methods: {
		onModalClose() {
			// console.log('onModalClose');
			if (this.active) {
				Store.set('settingsActive', !this.active);
			}
		},
	},
	created() {
		Store.subscribe('settingsActive', event => {
			this.active = event.settingsActive;
		});
		Store.subscribe('currentPhoto', event => {
			this.currentPhoto = event.currentPhoto;
		});
	},
};
</script>

<style scoped>
/* empty */
</style>
