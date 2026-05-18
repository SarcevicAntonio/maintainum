<script>
	import { resolve } from '$app/paths'

	const { data, form } = $props()
</script>

<p>
	you can delete the tasks by pressing the button below.<br />
	<strong>note: this can not be undone.</strong>
</p>

{#if form?.error}<p>{form.error}</p>{/if}

<form
	method="POST"
	onsubmit={(e) => {
		if (!confirm('are you sure?')) e.preventDefault()
	}}
>
	<button type="submit"> delete task </button>
</form>

<hr />

<a
	href={resolve('/(app)/[list]/[task]', {
		list: data.task.list,
		task: data.task.id,
	})}
	class="secondary"
>
	back to task
</a>
<a href={resolve('/(app)/[list]', { list: data.list.id })}>back to list</a>
