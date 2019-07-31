<style>
	/**
	 * Greeting text
	 */
	.greeting {
		margin: 0;
		font-size: 1.8rem;
		font-weight: normal;
		white-space: nowrap;
		text-shadow: 0 0 3px rgba(0, 0, 0, 0.8);
	}

	.greeting--center {
		font-size: 3rem;
		font-weight: normal;
		white-space: normal;
		text-shadow: 0 0 25px rgba(0, 0, 0, 0.8);
	}

	.greeting--blend {
		text-shadow: none;
	}

	.greeting__name {
		display: inline-block;
		cursor: pointer;
		position: relative;
	}

	.greeting__name--active > .greeting__name__output {
		display: none;
	}

	.greeting__name__input {
		appearance: none;
		border: 0;
		border-bottom: solid 1px white;
		background: transparent;
		color: inherit;
		font-family: inherit;
		line-height: inherit;
		padding: 0;
		margin: 0;
		width: 8ch;
		position: relative;
		display: none;
		top: 0;
	}

	.greeting__name__output,
	.greeting--center .greeting__name__input {
		font-weight: 600;
	}

	/* need this for empty greeting name */
	.greeting__name__input--empty {
		position: relative;
	}

	.greeting__name__input::placeholder {
		color: inherit;
		opacity: 0.8;
	}

	.greeting__name__input:focus {
		outline: 0;
	}

	.greeting__name--active > .greeting__name__input {
		display: inline-block;
	}

	.greeting__icon {
		display: block;
		margin-top: 0.5em;
	}
</style>

<h1 class="greeting" class:greeting--center="{center}" class:greeting--blend="{blend}">
	<span>{ greetText }</span>,
	<span
		class="greeting__name"
		class:greeting__name--active="{ isInputActive }"
		on:click|stopPropagation="{handleNameClick}"
	>
		<input
			bind:this="{nameInput}"
			class="greeting__name__input"
			class:greeting__name__input--empty="{!inputValue}"
			bind:value="{inputValue}"
			placeholder="gorgeous"
			on:blur="{nameInputSubmit}"
			on:keypress="{handleKeyPress}"
		/>
		<span class="greeting__name__output">{ $greetingName }</span>
	</span>
	{#if icon}<span class="greeting__icon">{ icon }</span>{/if}
</h1>

<script>
	/* © 2019 Int3ractive.com
	 * @author Thanh Tran
	 */
	import timer from '../stores/timer';
	import tinycare from '../stores/tinycare';
	import { greetingName } from '../stores/settings';

	export let center = false;
	export let blend = false;

	let greetText = '';
	let icon = '';
	let isInputFocus = false;
	let nameInput = null; //ref

	$: isInputActive = !$greetingName || isInputFocus;
	$: inputValue = $greetingName || '';

	const { hours } = $timer;

	if (center) {
		icon = $tinycare[0];
		greetText = $tinycare[1];
	} else {
		if (hours < 12) {
			// morning
			greetText = 'Good morning';
		} else if (hours < 18) {
			// afternoon
			greetText = 'Good afternoon';
		} else if (hours < 22) {
			// evening
			greetText = 'Good evening';
		} else {
			greetText = 'Good night';
		}
	}

	function nameInputSubmit() {
		if (inputValue) {
			$greetingName = inputValue;
		} else if ($greetingName) {
			inputValue = $greetingName;
		}
		isInputFocus = false;

		document.removeEventListener('click', nameInputSubmit);
	}

	function handleKeyPress(event) {
		// enter
		if (event.charCode === 13) {
			nameInputSubmit();
		}
	}

	function handleNameClick() {
		isInputFocus = true;
		nameInput.focus();
		nameInput.setSelectionRange(0, nameInput.value.length);

		document.addEventListener('click', nameInputSubmit);
	}
</script>
