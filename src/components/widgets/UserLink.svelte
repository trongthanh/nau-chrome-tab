<style>
	.user-link {
		display: inline-block;
		padding: 1rem 0.5rem;
		margin-right: 1rem;
	}

	.icon-selector {
		position: relative;
	}

	.icon-selector__select {
		display: block;
		position: absolute;
		width: 20px;
		height: 20px;
		top: 0;
		left: 0;
		z-index: 1;
		appearance: none;
		opacity: 0;
		cursor: pointer;
	}

	.icon-selector__select:focus + .mdi {
		outline: 1px white dotted;
	}

	.user-link__input {
		appearance: none;
		background: transparent;
		border: 1px solid #999;
		border-radius: 2px;
		color: white;
		padding: 2px;
		width: 18ch;
	}
	.user-link__input:focus {
		outline: 1px solid #977857;
	}

	.user-link__input--title {
		width: 16ch;
	}
	.user-link__input--url:invalid {
		outline: 1px solid red;
	}
</style>

<div class="user-link">
	<input
		type="checkbox"
		name="user-link-active"
		bind:checked="{active}"
		on:change="{handleChange}"
	/>
	<label class="icon-selector" title="Click to select icon">
		<select
			name="user-link-icon"
			bind:value="{icon}"
			class="icon-selector__select"
			on:change="{handleChange}"
		>
			<option value="mdi--wordpress">Blog</option>
			<option value="mdi--newspaper">News</option>
			<option value="mdi--book">Book</option>
			<option value="mdi--shopping">Shop</option>
			<option value="mdi--video-vintage">Movie</option>
			<option value="mdi--headphones">Music</option>
			<option value="mdi--account-group">Social</option>
			<option value="mdi--gamepad-variant">Gaming</option>
			<option value="mdi--food">Food</option>
			<option value="mdi--train-car">Transport</option>
			<option value="mdi--briefcase">Work</option>
			<option value="mdi--earth">Globe</option>
		</select>
		<i class="{`mdi ${icon}`}"></i>
	</label>
	<input
		type="text"
		class="user-link__input user-link__input--title"
		name="user-link-title"
		maxlength="15"
		placeholder="Site Title"
		bind:value="{title}"
		on:change="{handleChange}"
	/>
	<input
		type="url"
		class="user-link__input user-link__input--url"
		name="user-link-url"
		placeholder="http://example.com"
		pattern="https?://.*"
		bind:value="{url}"
		on:change="{handleChange}"
	/>
</div>

<script>
	export let id = '';
	export let icon = '';
	export let title = '';
	export let url = '';
	export let active = false;
	export let onChange;

	function handleChange() {
		if (typeof onChange === 'function') {
			onChange({ id, active, icon, title, url });
		}
	}
</script>
