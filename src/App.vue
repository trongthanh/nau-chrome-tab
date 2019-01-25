<template>
<div id="app" class="app">
	<Wallpaper />
	<main class="main">
		<div class="main__item main__item--top-left quick-links">
			<ul id="quicklinks" class="quick-links__list">
				<li class="quick-links__li" id="gmail"><a href="https://mail.google.com" class="quick-links__link mdi mdi--gmail" title="GMail"></a></li>
				<li class="quick-links__li" id="gcalendar"><a href="https://calendar.google.com" class="quick-links__link mdi mdi--calendar" title="Google Calendar"></a></li>
				<li class="quick-links__li" id="gdrive"><a href="https://drive.google.com" class="quick-links__link mdi mdi--google-drive" title="Google Drive"></a></li>
				<li class="quick-links__li" id="github"><a href="https://github.com" class="quick-links__link mdi mdi--github-circle" title="Github"></a></li>
				<li class="quick-links__li" id="bitbucket"><a href="https://bitbucket.org" class="quick-links__link mdi mdi--bitbucket" title="Bitbucket"></a></li>
				<li class="quick-links__li" id="trello"><a href="https://trello.com" class="quick-links__link mdi mdi--trello" title="Trello"></a></li>
				<li class="quick-links__li" id="facebook"><a href="https://facebook.com" class="quick-links__link mdi mdi--facebook" title="Facebook"></a></li>
				<li class="quick-links__li" id="twitter"><a href="https://twitter.com" class="quick-links__link mdi mdi--twitter" title="Twitter"></a></li>
				<li class="quick-links__li" id="gplus"><a href="https://plus.google.com" class="quick-links__link mdi mdi--google-plus" title="Google +"></a></li>
				<li class="quick-links__li" id="tuoitre"><a href="http://tuoitre.vn" class="quick-links__link quick-links__link--fw" title="Tuoitre.vn"><span class="u-serif-text">tt</span></a></li>
				<li class="quick-links__li" id="vnexpress"><a href="http://vnexpress.net/" class="quick-links__link quick-links__link--fw" title="VNExpress"><span class="u-serif-text">vE</span></a></li>
				<li class="quick-links__li" id="thanhnien"><a href="http://thanhnien.vn/" class="quick-links__link quick-links__link--fw" title="Thanhnien.vn"><span class="u-serif-text">Tn</span></a></li>
				<li class="quick-links__li" id="gphotos"><a href="https://photos.google.com" class="quick-links__link mdi mdi--image" title="Google Photos"></a></li>
				<li class="quick-links__li" id="youtube"><a href="https://youtube.com" class="quick-links__link mdi mdi--youtube-play" title="Youtube"></a></li>
				<li class="quick-links__li" id="naujukebox"><a href="https://jukebox.naustud.io" class="quick-links__link mdi mdi--play" title="Nau Jukebox"></a></li>
			</ul>
		</div>
		<div class="main__item main__item--top-right">
			<div>Weather info</div>
		</div>
		<div class="main__item main__item--center">
			<Clock />
			<Greeting :lang="lang" />
		</div>
		<Quote :quote="quote" />
		<div class="main__item main__item--bottom-left">
			<button class="setting-btn icon-btn mdi mdi--settings" type="button" @click.stop="onSettingBtnClick"></button>
			<PhotoCredit :imgData="currentPhoto" />
		</div>
		<div class="main__item main__item--bottom-right">
			<div class="brand-logo">
				<a href="https://int3ractive.com" class="quick-links__link quick-links__link--svg" title="Int3ractive">
					T3
				</a>
			</div>
		</div>
	</main>
	<SettingsOverlay />
</div>
</template>

<script>
/* © 2019 int3ractive.com
 * @author Thanh
 */
import { enQuotes, viQuotes } from './common/quotes';
import Store from './common/Store';
import SettingsOverlay from './components/SettingsOverlay';
import Wallpaper from './components/Wallpaper';
import PhotoCredit from './components/PhotoCredit';
import Quote from './components/Quote';
import Clock from './components/Clock';
import Greeting from './components/Greeting';

import './styles/normalize.css';
import './styles/materialdesignicons.css';
import './styles/main.css';

export default {
	name: 'app',
	components: {
		SettingsOverlay,
		Wallpaper,
		PhotoCredit,
		Quote,
		Clock,
		Greeting,
	},
	data() {
		return {
			currentPhoto: Store.get('currentPhoto'),
			lang: Store.get('settings').language,
			quote: Store.get('quote'),
		};
	},
	methods: {
		onSettingBtnClick() {
			// console.log('settings btn clicked');
			const settingsActive = Store.get('settingsActive');
			Store.set('settingsActive', !settingsActive);
		},
		getQuote() {
			const quoteList = this.lang === 'vi' ? viQuotes : enQuotes;
			const randomQuote = quoteList[Math.floor(Math.random() * quoteList.length)];
			if (randomQuote) {
				Store.set('quote', {
					text: randomQuote[0],
					author: randomQuote[1],
				});
				this.quote = Store.get('quote');
			}
		},
	},
	created() {
		Store.subscribe('currentPhoto', event => {
			this.currentPhoto = event.currentPhoto;
		});
		Store.subscribe('settings', event => {
			if (this.lang !== event.settings.language) {
				this.lang = event.settings.language;
			}
		});

		this.getQuote();
	},
};
</script>

<style>
.app {
	width: 100%;
	height: 100%;
	position: relative;
}
</style>
