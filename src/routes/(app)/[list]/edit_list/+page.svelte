<script>
	import { resolve } from '$app/paths'
	import Field from '$lib/Field.svelte'

	let { data, form } = $props()
</script>

{#if form?.error}<p>{form.error}</p>{/if}

<form method="POST" action="?/update_label">
	<Field label="new label" value={data.list.label} required />
	<button type="submit">update label</button>
</form>

<hr />

<a href={resolve('/(app)/[list]/leave_delete', { list: data.list.id })}>
	leave or delete list
</a>
<a href={resolve('/(app)/[list]', { list: data.list.id })}>back to list</a>
