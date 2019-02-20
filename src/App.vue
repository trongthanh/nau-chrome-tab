<template>
<div id="app" class="app">
	<Wallpaper />
	<main class="main">
		<div class="main__item main__item--top-left quick-links">
			<Quicklinks />
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
				<a href="https://int3ractive.com" class="quick-links__link" title="Int3ractive">
					<i class="mdi mdi--power-plug" />
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
import { dispatch } from './common/Dispatcher';
import SettingsOverlay from './components/SettingsOverlay';
import Wallpaper from './components/Wallpaper';
import PhotoCredit from './components/PhotoCredit';
import Quote from './components/Quote';
import Clock from './components/Clock';
import Greeting from './components/Greeting';
import Quicklinks from './components/Quicklinks';

import './styles/normalize.css';
import './styles/materialdesignicons.css';
import './styles/main.css';

export default {
	name: 'app',
	provide: {
		dispatch,
		store: Store,
	},
	components: {
		Clock,
		Greeting,
		PhotoCredit,
		Quicklinks,
		Quote,
		SettingsOverlay,
		Wallpaper,
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
