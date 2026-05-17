<script lang="ts">
	import { resolve } from '$app/paths'
	import Field from '$lib/Field.svelte'
	let { form } = $props()
</script>

<h2>register</h2>

{#if form?.error}<p>{form.error}</p>{/if}

<form method="POST">
	<Field label="email" type="email" autocomplete="email" required />
	<Field
		label="password"
		type="password"
		autocomplete="new-password"
		required
	/>
	<Field label="confirm password" type="password" autocomplete="off" required />
	<button type="submit">register</button>
</form>

<hr />

<a href={resolve('/login')}>login</a>
