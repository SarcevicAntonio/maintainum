<script lang="ts">
	import { resolve } from '$app/paths'
	import Field from '$lib/Field.svelte'
	let { data, form } = $props()
</script>

{#if form?.error}<p>{form.error}</p>{/if}

<form method="POST">
	<Field label="label" value={data.task.label} required />
	<Field label="description" type="textarea" value={data.task.description} />
	<Field
		label="frequency"
		description="number of days until the task re-appears"
		type="number"
		value={data.task.frequency || 7}
		required
	/>
	<button type="submit">create new task</button>
</form>

<hr />

<a
	href={resolve('/(app)/[list]/[task]/delete_task', {
		list: data.task.list,
		task: data.task.id,
	})}
	class="secondary"
>
	delete task
</a>
<a
	href={resolve('/(app)/[list]/[task]', {
		list: data.task.list,
		task: data.task.id,
	})}
	class="secondary"
>
	back to task
</a>
<a href={resolve('/(app)/[list]', { list: data.task.list })}>back to list</a>
