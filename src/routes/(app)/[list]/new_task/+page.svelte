<script lang="ts">
	import { resolve } from '$app/paths'
	import { page } from '$app/state'
	import Field from '$lib/Field.svelte'
	import type { PageProps } from './$types'

	let { form }: PageProps = $props()
</script>

{#if form?.error}<p>{form.error}</p>{/if}

<form method="POST">
	<Field label="label" required />
	<Field label="description" type="textarea" />
	<Field
		label="frequency"
		description="number of days until the task re-appears"
		type="number"
		value="7"
		required
	/>
	<button type="submit">create new task</button>
</form>

<hr />

<a href={resolve('/(app)/[list]', { list: page.params.list! })}>back to list</a>
