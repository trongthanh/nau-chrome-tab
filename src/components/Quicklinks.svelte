<style>
	.typeicon {
		display: inline-block;
		font-size: 2.2rem;
		font-weight: bold;
		height: 2.4rem;
		letter-spacing: -1px;
		overflow: hidden;
		text-align: center;
		vertical-align: middle;
		width: 2.6rem;
		word-break: break-all;
	}

	/* Fixed width for text link */
	.link--typeicon {
		width: 4rem;
		text-align: center;
		padding: 0.8rem 0.7rem;
	}

	.quick-links__list {
		display: inline-flex;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.quick-links__li {
		flex: 0 1 auto;
	}

	.quick-links__link {
		padding: 1rem;
		display: inline-block;
		color: white;
		font-size: 2rem;
		font-weight: bold;
		line-height: 1;
		text-decoration: none;
		text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
		opacity: 0.5;
		transition: all 200ms;
	}

	.quick-links__link:hover {
		color: white;
		opacity: 1;
		-ms-transform: translateY(-5px);
		transform: translateY(-5px);
	}

	.quick-links__link::after {
		content: attr(title);
		position: absolute;
		left: 50%;
		bottom: -1.5rem;
		transform: translateX(-50%);
		font-size: 0.7em;
		font-weight: normal;
		white-space: nowrap;
		transition: all 200ms;
		visibility: hidden;
		opacity: 0;
		filter: none;
	}

	.quick-links__link:hover::after {
		visibility: visible;
		opacity: 1;
	}
</style>

<ul id="quicklinks" class="quick-links__list">
	{#each quicklinks as link (link.id)}

	<li class="quick-links__li" id="link-{link.id}">
		<a href="{link.url}" class="quick-links__link mdi {link.icon}" title="{link.title}">
			{#if link.typeicon }
			<span class="typeicon">{link.typeicon}</span>
			{/if}
		</a>
	</li>
	{/each}
</ul>

<script>
	/* © 2019 int3ractive.com
	 * @author Thanh
	 */
	import { activeQuicklinks } from '../stores/settings';
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

	$: quicklinks = quicklinkInfo.filter(link => $activeQuicklinks[link.id]);
</script>
