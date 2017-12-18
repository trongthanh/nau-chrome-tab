<template>
<!-- modal settings popup -->
<div class="modal-overlay">
	<div class="modal modal--slide-up" id="settings-modal">
		<div class="modal__background"></div>
		<h3 class="modal__title" i18n="settings">Settings</h3>
		<button id="settings-close-btn" class="modal__close icon-btn mdi mdi--close"></button>
		<div class="modal__content">
			<form id="settings-panel" class="modal__body settings">
				<fieldset>
					<legend>Choose language / Chọn ngôn ngữ</legend>
					<input id="setting-lang-en" type="radio" name="setting-language" value="en"><!--
				--><label class="settings__label" for="setting-lang-en">
						English
					</label>

					<input id="setting-lang-vi" type="radio" name="setting-language" value="vi"><!--
				--><label class="settings__label" for="setting-lang-vi">
						Tiếng Việt
					</label>
				</fieldset>
				<fieldset>
					<legend i18n="wallpaper_mode">Wallpaper Mode</legend>
					<input id="setting-wallpaper-mode-unsplash" type="radio" name="setting-wallpaper-mode" value="unsplash"><!--
				--><label class="settings__label" for="setting-wallpaper-mode-unsplash">
						Unsplash
					</label>

					<input id="setting-wallpaper-mode-user" type="radio" name="setting-wallpaper-mode" value="user"><!--
				--><label class="settings__label" for="setting-wallpaper-mode-user" i18n="your_photo">
						Your Photo
					</label>

					<label id="setting-photo-selector" class="u-hidden file-input settings__label">
						<input id="setting-photo-selector-input" type="file" class="u-hidden">
						<i class="mdi mdi--file-image"></i>
						<span id="setting-photo-selector-label" class="file-input__label">Choose a file</span>
					</label>

					<span id="selected-photo"></span>

				</fieldset>
				<fieldset id="setting-quicklinks">
					<legend i18n="quick_links">Quick Links</legend>
					<label title="https://mail.google.com" class="settings__label" ><input type="checkbox" data-link-id="gmail"> <i class="mdi mdi--gmail"></i> GMail</label>
					<label title="https://calendar.google.com" class="settings__label" ><input type="checkbox" data-link-id="gcalendar"> <i class="mdi mdi--calendar"></i> Google Calendar</label>
					<label title="https://drive.google.com" class="settings__label" ><input type="checkbox" data-link-id="gdrive"> <i class="mdi mdi--google-drive"></i> Google Drive</label>
					<label title="https://github.com" class="settings__label" ><input type="checkbox" data-link-id="github"> <i class="mdi mdi--github-circle"></i> Github</label>
					<label title="https://bitbucket.org" class="settings__label" ><input type="checkbox" data-link-id="bitbucket"> <i class="mdi mdi--bitbucket"></i> Bitbucket</label>
					<label title="https://trello.com" class="settings__label" ><input type="checkbox" data-link-id="trello"> <i class="mdi mdi--trello"></i> Trello</label>
					<label title="https://facebook.com" class="settings__label" ><input type="checkbox" data-link-id="facebook"> <i class="mdi mdi--facebook"></i> Facebook</label>
					<label title="https://twitter.com" class="settings__label" ><input type="checkbox" data-link-id="twitter"> <i class="mdi mdi--twitter"></i> Twitter</label>
					<label title="https://plus.google.com" class="settings__label" ><input type="checkbox" data-link-id="gplus"> <i class="mdi mdi--google-plus"></i> Google +</label>
					<label title="http://tuoitre.vn" class="settings__label"><input type="checkbox" data-link-id="tuoitre"> <span class="u-serif-text">tt</span> Tuoitre.vn</label>
					<label title="http://vnexpress.net/" class="settings__label"><input type="checkbox" data-link-id="vnexpress"> <span class="u-serif-text">vE</span> VNExpress</label>
					<label title="http://thanhnien.vn/" class="settings__label"><input type="checkbox" data-link-id="thanhnien"> <span class="u-serif-text">Tn</span> Thanhnien.vn</label>
					<label title="https://photos.google.com" class="settings__label" ><input type="checkbox" data-link-id="gphotos"> <i class="mdi mdi--image"></i> Google Photos</label>
					<label title="https://youtube.com" class="settings__label" ><input type="checkbox" data-link-id="youtube"> <i class="mdi mdi--youtube-play"></i> Youtube</label>
					<label title="https://jukebox.naustud.io" class="settings__label" ><input type="checkbox" data-link-id="naujukebox"> <i class="mdi mdi--play"></i> Nau Jukebox</label>
				</fieldset>
				<div class="copyright">
					<small>&copy; 2016 <a href="http://int3ractive.com">Thanh Tran</a>. <span i18n="oss_notice">Open source under Apache License v2.0</span>.</small>
					<a class="icon-btn" href="https://github.com/trongthanh/nau-chrome-tab" title="Source code on Github"><i class="mdi mdi--github-circle"></i></a><!--
					--><a class="icon-btn" href="https://chrome.google.com/webstore/detail/nau-tab/pimockeojlggmlnknhicajgckmlggifa?hl=en" title="Install this extension on Chrome Webstore"><i class="mdi mdi--google-chrome"></i></a>
				</div>
			</form>
		</div>
	</div>
</div><!-- /.modal-overlay -->
</template>

<script>
export default {
	name: 'HelloWorld',
	data() {
		return {
			msg: 'Welcome to Your Vue.js App',
		};
	},
};
</script>

<style scoped>
/* empty */
</style>
