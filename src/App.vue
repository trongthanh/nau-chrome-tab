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
			<button id="settings-btn" class="setting-btn icon-btn mdi mdi--settings" type="button"></button>
			<PhotoCredit :imgData="currentPhoto" />
		</div>
		<div class="main__item main__item--bottom-right">
			<div class="brand-logo">
				<a href="https://naustud.io" class="quick-links__link quick-links__link--svg svg-wrap" title="Nau Studio">
					<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="57.774px" height="16px" viewBox="0 512 362.3 100.4" enable-background="new 0 512 362.3 100.4" xml:space="preserve"><path id="XMLID_28_" fill="#ffffff" d="M25.1,612.2v-75.1h21.5c7.8,0,14.7,4,17.1,11l24.3,64H116l-28.1-73.7c-1.2-5.6-10-26.3-34.5-26.3H0v100H25.1z"/><path id="XMLID_27_" fill="#ffffff" d="M337.2,512.2v75.1h-21.5c-8.2,0-14.5-5-17.1-11l-24.3-64h-28.1l28.1,73.7c3,9.8,12,26.3,34.5,26.3h53.4v-100H337.2z"/><polygon id="XMLID_26_" fill="#ffffff" points="167.6,612.2 141.5,612.2 132.1,587.1 158,587.1 "/><path id="XMLID_25_" fill="#ffffff" d="M232,590.7c0,0-26.1-69-26.5-69.8c-3.4-5.4-8.6-9-15.9-8.8h-21.9c0,0,8.6,6.2,14,21.5c0,0,24.9,65.8,25.5,67.2c2.6,7,8.8,11.6,14.7,11.6h24.3C246.1,612.2,237.4,605.7,232,590.7"/></svg>
				</a>
			</div>
		</div>
	</main>
</div>
</template>

<script>
import { enQuotes, viQuotes } from './common/quotes';
import Store from './common/Store';
// import Settings from './components/Settings';
import Wallpaper from './components/Wallpaper';
import PhotoCredit from './components/PhotoCredit';
import Quote from './components/Quote';
import Clock from './components/Clock';
import Greeting from './components/Greeting';

export default {
	name: 'app',
	components: {
		// Settings,
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
