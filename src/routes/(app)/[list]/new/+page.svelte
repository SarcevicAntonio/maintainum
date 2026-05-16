<script lang="ts">
	import { resolve } from '$app/paths'
	import { page } from '$app/state'
	import type { PageProps } from './$types'

	let { form }: PageProps = $props()
</script>

{#if form?.error}<p>{form.error}</p>{/if}

<form method="POST">
	<label for="label">label</label>
	<input type="text" name="label" id="label" required />
	<label for="description">description</label>
	<textarea name="description" id="description"></textarea>
	<label for="frequency">frequency</label>
	<input
		value="7"
		type="number"
		name="frequency"
		id="frequency"
		aria-describedby="frequency-desc"
		required
	/>
	<p id="frequency-desc">
		number of days until the task needs to be done again.
	</p>
	<button type="submit">create new task</button>
</form>
<a href={resolve('/(app)/[list]', { list: page.params.list! })}>back to list</a>
