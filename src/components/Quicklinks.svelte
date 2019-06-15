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
		text-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
		opacity: 0.8;
		transition: all 200ms;
	}

	.quick-links__link:hover {
		color: white;
		opacity: 1;
		-ms-transform: translateY(-5px);
		transform: translateY(-5px);
	}

	.quick-links__link::after {
		content: attr(data-title);
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
	{#each $quicklinks as link (link.id)}
	<li class="quick-links__li" id="link-{link.id}">
		<a
			href="{link.url}"
			class="quick-links__link mdi {link.icon}"
			data-title="{link.title}"
			title="{`Open ${link.url}`}"
		>
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
	import quicklinks from '../stores/quicklinks';
</script>
