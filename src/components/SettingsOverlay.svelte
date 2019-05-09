<style>
	/**
	 * Modal popup
	 * Shamelessly copied from: http://tympanus.net/codrops/2013/06/25/nifty-modal-window-effects/;
	 * Note: .modal-overlay is now parent of .modal
	 */
	.modal-overlay {
		position: fixed;
		width: 100%;
		height: 100%;
		visibility: hidden;
		top: 0;
		left: 0;
		z-index: 1000;
		opacity: 0;
		background: rgba(0, 0, 0, 0.5);
		transition: all 0.3s;
	}

	.modal-overlay--active {
		opacity: 1;
		visibility: visible;
	}
</style>

<!-- modal settings popup -->
<div
	class="modal-overlay"
	class:modal-overlay--active="{active}"
	tabindex="0"
	on:click="{handleClick}"
>
	<SettingsModal {active} on:close="{handleClick}" />
</div>
<!-- /.modal-overlay -->

<script>
	/* © 2019 int3ractive.com
	 * @author Thanh Tran
	 */
	import { getContext } from 'svelte';
	import SettingsModal from './SettingsModal.svelte';

	const { toggleSettingPanels } = getContext('settingsPanel');

	function handleClick() {
		toggleSettingPanels();
	}

	export let active = false;
</script>
