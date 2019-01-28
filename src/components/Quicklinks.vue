<template>
	<ul id="quicklinks" class="quick-links__list">
		<li v-for="link in quicklinks" :key="link.id" class="quick-links__li" :id="link.id">
			<a :href="link.url" :class="{'quick-links__link': true, 'mdi': true, [`mdi--${link.icon}`]: true}" :title="link.title">
				<span v-if="link.typeicon" class="typeicon">{{ link.typeicon }}</span>
			</a>
		</li>
	</ul>
</template>

<script>
/* © 2019 int3ractive.com
 * @author Thanh
 */
import Store from '../common/Store';
/* eslint no-multi-spaces: off */
// prettier-ignore
const quicklinkInfo = [
	{ id: 'gmail',      url: 'https://mail.google.com', icon: 'gmail', title: 'GMail' },
	{ id: 'gcalendar',  url: 'https://calendar.google.com', icon: 'calendar', title: 'Google Calendar' },
	{ id: 'gdrive',     url: 'https://drive.google.com', icon: 'google-drive', title: 'Google Drive' },
	{ id: 'github',     url: 'https://github.com', icon: 'github-circle', title: 'Github' },
	{ id: 'bitbucket',  url: 'https://bitbucket.org', icon: 'bitbucket', title: 'Bitbucket' },
	{ id: 'trello',     url: 'https://trello.com', icon: 'trello', title: 'Trello' },
	{ id: 'facebook',   url: 'https://facebook.com', icon: 'facebook', title: 'Facebook' },
	{ id: 'twitter',    url: 'https://twitter.com', icon: 'twitter', title: 'Twitter' },
	{ id: 'gplus',      url: 'https://plus.google.com', icon: 'google-plus', title: 'Google +' },
	{ id: 'tuoitre',    url: 'http://tuoitre.vn', typeicon: 'tt', title: 'Tuoitre.vn' },
	{ id: 'vnexpress',  url: 'http://vnexpress.net/', typeicon: 'vE', title: 'VNExpress' },
	{ id: 'thanhnien',  url: 'http://thanhnien.vn/', typeicon: 'tn', title: 'Thanhnien.vn' },
	{ id: 'gphotos',    url: 'https://photos.google.com', icon: 'image', title: 'Google Photos' },
	{ id: 'youtube',    url: 'https://youtube.com', icon: 'youtube-play', title: 'Youtube' },
	{ id: 'naujukebox', url: 'https://jukebox.naustud.io', icon: 'play', title: 'Nau Jukebox' },
];

export default {
	name: 'Quote',
	data() {
		return {
			quicklinkStatus: Store.get('settings').activeQuicklinks,
		};
	},
	computed: {
		quicklinks() {
			const quicklinkStatus = this.quicklinkStatus;
			return quicklinkInfo.filter(link => {
				return quicklinkStatus[link.id];
			});
		},
	},
	created() {
		Store.subscribe('settings', ({ settings }) => {
			// console.log('settings changed');
			this.quicklinkStatus = { ...settings.activeQuicklinks };
		});
	},
	methods: {
		update() {},
	},
};
</script>
