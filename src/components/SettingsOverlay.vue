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
import SettingsModal from './SettingsModal';

export default {
	name: 'SettingsOverlay',
	inject: ['dispatch', 'store'],
	components: {
		SettingsModal,
	},
	directives: {
		clickOutside: vClickOutside.directive,
	},
	data() {
		return {
			appState: this.store.state,
		};
	},
	computed: {
		active() {
			return this.appState.settingsActive;
		},
		wallpaper() {
			return this.appState.currentPhoto;
		},
	},
	methods: {
		onModalClose() {
			if (this.active) {
				this.dispatch({
					type: 'SET_SETTING_ACTIVE',
					settingsActive: false,
				});
			}
		},
	},
	updated() {
		if (this.active) {
			setTimeout(() => {
				// the tabindex attr and next line make the overlay focusable and can trigger keyboard event
				this.$el.focus();
			}, 100);
		}
	},
};
</script>

<style scoped>
/* empty */
</style>
