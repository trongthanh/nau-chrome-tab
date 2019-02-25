<template>
	<ul id="quicklinks" class="quick-links__list">
		<li v-for="link in quicklinks" :key="link.id" class="quick-links__li" :id="link.id">
			<a :href="link.url" :class="{'quick-links__link': true, 'mdi': true, [link.icon]: true}" :title="link.title">
				<span v-if="link.typeicon" class="typeicon">{{ link.typeicon }}</span>
			</a>
		</li>
	</ul>
</template>

<script>
/* © 2019 int3ractive.com
 * @author Thanh
 */
/* eslint no-multi-spaces: off */
// prettier-ignore
const quicklinkInfo = [
	{ id: 'gmail',      url: 'https://mail.google.com', icon: 'mdi--gmail', title: 'GMail' },
	{ id: 'gcalendar',  url: 'https://calendar.google.com', icon: 'mdi--calendar', title: 'Google Calendar' },
	{ id: 'gdrive',     url: 'https://drive.google.com', icon: 'mdi--google-drive', title: 'Google Drive' },
	{ id: 'github',     url: 'https://github.com', icon: 'mdi--github-circle', title: 'Github' },
	{ id: 'bitbucket',  url: 'https://bitbucket.org', icon: 'mdi--bitbucket', title: 'Bitbucket' },
	{ id: 'trello',     url: 'https://trello.com', icon: 'mdi--trello', title: 'Trello' },
	{ id: 'facebook',   url: 'https://facebook.com', icon: 'mdi--facebook', title: 'Facebook' },
	{ id: 'twitter',    url: 'https://twitter.com', icon: 'mdi--twitter', title: 'Twitter' },
	{ id: 'gplus',      url: 'https://plus.google.com', icon: 'mdi--google-plus', title: 'Google +' },
	{ id: 'tuoitre',    url: 'http://tuoitre.vn', icon: 'link--typeicon', typeicon: 'tt', title: 'Tuoitre.vn' },
	{ id: 'vnexpress',  url: 'http://vnexpress.net/', icon: 'link--typeicon', typeicon: 'vE', title: 'VNExpress' },
	{ id: 'thanhnien',  url: 'http://thanhnien.vn/', icon: 'link--typeicon', typeicon: 'tn', title: 'Thanhnien.vn' },
	{ id: 'gphotos',    url: 'https://photos.google.com', icon: 'mdi--image', title: 'Google Photos' },
	{ id: 'youtube',    url: 'https://youtube.com', icon: 'mdi--youtube-play', title: 'Youtube' },
	{ id: 'naujukebox', url: 'https://jukebox.naustud.io', icon: 'mdi--play', title: 'Nau Jukebox' },
];

export default {
	name: 'Quote',
	inject: ['store'],
	data() {
		return {
			appState: this.store.state,
		};
	},
	computed: {
		quicklinks() {
			const quicklinkStatus = this.appState.settings.activeQuicklinks;
			return quicklinkInfo.filter(link => quicklinkStatus[link.id]);
		},
	},
};
</script>
