<script lang="ts">
	import { resolve } from '$app/paths'
	import type { PageProps } from './$types'

	let { form }: PageProps = $props()
</script>

{#if form?.error}<p>{form.error}</p>{/if}

<form method="POST">
	<label for="label">Label</label>
	<input type="text" name="label" id="label" required />
	<button>create new list</button>
</form>
<a href={resolve('/')}>see other lists</a>
