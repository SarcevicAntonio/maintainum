<script lang="ts">
	import { resolve } from '$app/paths'
	import { page } from '$app/state'
	import Field from '$lib/Field.svelte'
	let { form } = $props()
</script>

<h2>login</h2>

{#if form?.error}<p>{form.error}</p>{/if}

<form method="POST">
	<Field label="email" type="email" autocomplete="email" required />
	<Field
		label="password"
		type="password"
		autocomplete="current-password"
		required
	/>
	<button type="submit">login</button>
</form>

<hr />

<a href={resolve('/recover')}>forgot password?</a>
<a href={resolve(`/register${page.url.search}`)}>register</a>
