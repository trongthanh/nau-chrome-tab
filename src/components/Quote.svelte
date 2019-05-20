<style>
	/**
	 * Quotes
	 */
	.quotes {
		text-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
	}

	.quotes > p {
		margin: 0;
	}

	.quotes__text {
		width: 100%;
		text-align: center;
	}

	.quotes__text,
	.quotes__author {
		transition: all 500ms;
		transform: translateY(0);
	}

	.quotes:hover > .quotes__text {
		transform: translateY(-1.3em);
	}

	.quotes__text::before {
		content: '“';
	}

	.quotes__text::after {
		content: '”';
	}

	/* hidden by default */
	.quotes__author {
		visibility: hidden;
		opacity: 0;
		position: absolute;
		left: 50%;
		bottom: 0;
		transform: translateX(-50%);
		transition-duration: 500ms;
		white-space: nowrap;
	}

	.quotes:hover > .quotes__author {
		visibility: visible;
		opacity: 1;
	}
</style>

<div id="quotation" class="main__item main__item--bottom quotes">
	<p class="quotes__text">{ $quote.text }</p>
	<p class="quotes__author">{ $quote.author }</p>
</div>

<script>
	/* © 2019 int3ractive.com
	 * @author Thanh Tran
	 */
	import quote from '../stores/quote';
</script>
