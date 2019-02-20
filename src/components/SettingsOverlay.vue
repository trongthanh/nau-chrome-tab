<template>
	<!-- modal settings popup -->
	<div :class="{ 'modal-overlay': true, 'modal-overlay--active': active }" @keyup.esc="onModalClose" tabindex="0">
		<div class="modal__background" :style="{ backgroundImage: `url(${wallpaper.imgUrl})` }"></div>
		<SettingsModal v-click-outside="onModalClose" @close="onModalClose" />
	</div>
	<!-- /.modal-overlay -->
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
			wallpaper: Store.state.wallpaper,
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
			if (this.active) {
				setTimeout(() => {
					// the tabindex attr and next line make the overlay focusable and can trigger keyboard event
					this.$el.focus();
				}, 100);
			}
		});
	},
};
</script>

<style scoped>
/* empty */
</style>
