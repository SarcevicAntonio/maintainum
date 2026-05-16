<script lang="ts">
	import { resolve } from '$app/paths'
	import { page } from '$app/state'
	import type { PageProps } from './$types'

	let { form }: PageProps = $props()
</script>

{#if form?.error}<p>{form.error}</p>{/if}

<form method="POST">
	<label for="label">Label</label>
	<input type="text" name="label" id="label" required />
	<br />
	<label for="description">Description</label>
	<textarea name="description" id="description"></textarea>
	<br />
	<label for="frequency">Frequency</label>
	<input
		value="7"
		type="number"
		name="frequency"
		id="frequency"
		aria-describedby="frequency-desc"
		required
	/>
	<p id="frequency-desc">
		Number of days until the task needs to be done again.
	</p>
	<button>create new task</button>
</form>
<br />
<a href={resolve('/(app)/[list]', { list: page.params.list! })}>back to list</a>
