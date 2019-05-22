<style>
	.modal {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 70%;
		max-width: 1024px;
		min-width: 320px;
		max-height: 80%;
		overflow: hidden;
		visibility: hidden;
		backface-visibility: hidden;
		-ms-transform: translateX(-50%) translateY(-50%);
		transform: translateX(-50%) translateY(-50%);
		padding-top: 4.5rem; /* space for heading */
	}

	/* Effect 3: Slide from the bottom, change from origin: apply to container, to avoid
	conflicting with the frosty glass effect */
	.modal--slide-up {
		transform: translateX(-50%) translateY(-40%);
		opacity: 0;
		transition: all 0.3s 0.3s; /* delay to avoid overheating rendering and make framerate drop */
	}

	.modal--active {
		transform: translateX(-50%) translateY(-50%);
		opacity: 1;
		visibility: visible;
	}

	.modal__close {
		position: absolute;
		right: 0;
		top: 0;
		font-size: 2.2rem;
	}

	/* modal content styles */
	.modal__content {
		background: rgba(0, 0, 0, 0.5);
		position: relative;
		border-radius: 3px;
		margin: 0 auto;
		height: auto;
		overflow: auto;
		max-height: 70vh;
		min-height: 40vh;
	}

	.modal__title {
		margin: 0;
		padding: 0.5em;
		text-align: center;
		background: rgba(0, 0, 0, 0.8);
		border-radius: 3px 3px 0 0;
		position: absolute;
		top: 0;
		width: 100%;
	}

	.modal__body {
		padding: 2rem;
	}

	/**
	 * Settings Panel
	 */
	.settings__label {
		display: inline-block;
		margin-right: 1rem;
		padding: 1rem 0.5rem;
	}

	[id='setting-wallpaper-mode-user']:checked ~ [id='setting-photo-selector'] {
		display: inline-block;
	}

	/**
	 * File input
	 */
	.file-input {
		cursor: pointer;
		white-space: nowrap;
		overflow: hidden;
		max-width: 20rem;
		text-overflow: ellipsis;
		vertical-align: middle;
	}

	.file-input:hover {
		background-color: rgba(0, 0, 0, 0.5);
	}

	.file-input > [type='file'] {
		/* hide native input UI */
		width: 0.1px;
		height: 0.1px;
		opacity: 0;
		overflow: hidden;
		position: absolute;
		z-index: -1;
	}
</style>

<div class="modal modal--slide-up" class:modal--active="{active}" on:click|stopPropagation>
	<h3 class="modal__title" i18n="settings">Settings</h3>
	<button
		class="modal__close icon-btn mdi mdi--close"
		on:click="{() => dispatch('close')}"
	></button>
	<div class="modal__content">
		<form id="settings-panel" class="modal__body settings">
			<!-- temporary hide this setting, will come back later when I have full quote translation
			<fieldset>
				<legend>Choose language / Chọn ngôn ngữ</legend>
				<input id="setting-lang-en" type="radio" name="setting-language" value="en" v-model="language"><label class="settings__label" for="setting-lang-en">
					English
				</label>

				<input id="setting-lang-vi" type="radio" name="setting-language" value="vi" v-model="language"><label class="settings__label" for="setting-lang-vi">
					Tiếng Việt
				</label>
			</fieldset>
			-->
			<fieldset>
				<legend i18n="wallpaper_mode">Wallpaper Mode</legend>
				<input
					id="setting-wallpaper-mode-unsplash"
					type="radio"
					name="setting-wallpaper-mode"
					value="unsplash"
					bind:group="{$wallpaperMode}"
				/><!--
			--><label class="settings__label" for="setting-wallpaper-mode-unsplash">
					Unsplash
				</label>

				<input
					id="setting-wallpaper-mode-user"
					type="radio"
					name="setting-wallpaper-mode"
					value="user"
					bind:group="{$wallpaperMode}"
				/><!--
			--><label class="settings__label" for="setting-wallpaper-mode-user" i18n="your_photo">
					Your Photo
				</label>

				<label
					id="setting-photo-selector"
					class="u-hidden file-input settings__label"
					title="Click to select you photo"
				>
					<input
						id="setting-photo-selector-input"
						type="file"
						class="u-hidden"
						on:change="{handleUserPhotoFileChange}"
					/>
					<i class="mdi mdi--file-image"></i>
					<span id="setting-photo-selector-label" class="file-input__label">{ userPhotoName }</span>
				</label>

				<span id="selected-photo"></span>
			</fieldset>
			<fieldset>
				<legend i18n="clock_display">Clock Display</legend>
				<input
					id="setting-clock-display-center"
					type="radio"
					name="setting-clock-display"
					value="center"
					bind:group="{$clockDisplay}"
				/>
				<label class="settings__label" for="setting-clock-display-center">
					Center
				</label>

				<input
					id="setting-clock-display-blend"
					type="radio"
					name="setting-clock-display"
					value="blend"
					bind:group="{$clockDisplay}"
				/>
				<label class="settings__label" for="setting-clock-display-blend">
					Color blend (experiment)
				</label>

				<input
					id="setting-clock-display-mini"
					type="radio"
					name="setting-clock-display"
					value="mini"
					bind:group="{$clockDisplay}"
				/>
				<label class="settings__label" for="setting-clock-display-mini">
					Mini
				</label>
			</fieldset>
			<fieldset id="setting-quicklinks">
				<legend i18n="quick_links">Quick Links</legend>
				<label title="https://mail.google.com" class="settings__label"
					><input type="checkbox" value="gmail" bind:group="{$quicklinks}" />
					<i class="mdi mdi--gmail"></i> GMail</label
				>
				<label title="https://calendar.google.com" class="settings__label"
					><input type="checkbox" value="gcalendar" bind:group="{$quicklinks}" />
					<i class="mdi mdi--calendar"></i> Google Calendar</label
				>
				<label title="https://drive.google.com" class="settings__label"
					><input type="checkbox" value="gdrive" bind:group="{$quicklinks}" />
					<i class="mdi mdi--google-drive"></i> Google Drive</label
				>
				<label title="https://github.com" class="settings__label"
					><input type="checkbox" value="github" bind:group="{$quicklinks}" />
					<i class="mdi mdi--github-circle"></i> Github</label
				>
				<label title="https://bitbucket.org" class="settings__label"
					><input type="checkbox" value="bitbucket" bind:group="{$quicklinks}" />
					<i class="mdi mdi--bitbucket"></i> Bitbucket</label
				>
				<label title="https://trello.com" class="settings__label"
					><input type="checkbox" value="trello" bind:group="{$quicklinks}" />
					<i class="mdi mdi--trello"></i> Trello</label
				>
				<label title="https://facebook.com" class="settings__label"
					><input type="checkbox" value="facebook" bind:group="{$quicklinks}" />
					<i class="mdi mdi--facebook"></i> Facebook</label
				>
				<label title="https://twitter.com" class="settings__label"
					><input type="checkbox" value="twitter" bind:group="{$quicklinks}" />
					<i class="mdi mdi--twitter"></i> Twitter</label
				>
				<label title="https://plus.google.com" class="settings__label"
					><input type="checkbox" value="gplus" bind:group="{$quicklinks}" />
					<i class="mdi mdi--google-plus"></i> Google +</label
				>
				<label title="http://tuoitre.vn" class="settings__label"
					><input type="checkbox" value="tuoitre" bind:group="{$quicklinks}" />
					<span class="u-serif-text">tt</span> Tuoitre.vn</label
				>
				<label title="http://vnexpress.net/" class="settings__label"
					><input type="checkbox" value="vnexpress" bind:group="{$quicklinks}" />
					<span class="u-serif-text">vE</span> VNExpress</label
				>
				<label title="http://thanhnien.vn/" class="settings__label"
					><input type="checkbox" value="thanhnien" bind:group="{$quicklinks}" />
					<span class="u-serif-text">Tn</span> Thanhnien.vn</label
				>
				<label title="https://photos.google.com" class="settings__label"
					><input type="checkbox" value="gphotos" bind:group="{$quicklinks}" />
					<i class="mdi mdi--image"></i> Google Photos</label
				>
				<label title="https://youtube.com" class="settings__label"
					><input type="checkbox" value="youtube" bind:group="{$quicklinks}" />
					<i class="mdi mdi--youtube-play"></i> Youtube</label
				>
				<label title="https://jukebox.naustud.io" class="settings__label"
					><input type="checkbox" value="naujukebox" bind:group="{$quicklinks}" />
					<i class="mdi mdi--play"></i> Nau Jukebox</label
				>
			</fieldset>
			<div class="copyright">
				<small
					>&copy; 2019 <a href="https://int3ractive.com">Thanh Tran</a>.
					<span i18n="oss_notice">Open source under Apache License v2.0</span>.</small
				>
				<a
					class="icon-btn"
					href="https://github.com/trongthanh/nau-chrome-tab"
					title="Source code on Github"
					><i class="mdi mdi--github-circle"></i></a
				><!--
				--><a
					class="icon-btn"
					href="https://chrome.google.com/webstore/detail/nau-tab/pimockeojlggmlnknhicajgckmlggifa?hl=en"
					title="Install this extension on Chrome Webstore"
					><i class="mdi mdi--google-chrome"></i
				></a>
			</div>
		</form>
	</div>
</div>
<!-- /.modal -->

<script>
	/* © 2019 int3ractive.com
	 * @author Thanh
	 */
	import { createEventDispatcher } from 'svelte';
	import { readAndResizeImage } from '../common/utils';
	import {
		// language,
		wallpaperMode,
		clockDisplay,
		userPhoto,
		quicklinks,
	} from '../stores/settings';

	const dispatch = createEventDispatcher();

	export let active = false;

	$: userPhotoName = $userPhoto ? $userPhoto.imgId : 'Choose a file';

	function handleUserPhotoFileChange(event) {
		console.log('file selector change:', event.target.files);
		const file = event.target.files[0];
		if (!file) {
			return;
		}

		if (file.type.includes('image')) {
			storeUserPhoto(file);
		} else {
			/* eslint-disable-next-line no-alert */
			alert('Please select only file of type image (JPG, PNG)');
		}
	}

	function storeUserPhoto(file) {
		readAndResizeImage(file).then(imgDataUrl => {
			userPhoto.set({
				imgUrl: imgDataUrl,
				imgId: file.name,
				authorName: 'You',
				authorUsername: '',
			});
			wallpaperMode.set('user');
			console.log('readAndResizeImage DONE');
		});
	}
</script>
