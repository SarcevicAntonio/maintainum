<script lang="ts">
	import { resolve } from '$app/paths'
	import type { PageProps } from './$types'

	let { form }: PageProps = $props()
</script>

{#if form?.error}<p>{form.error}</p>{/if}

<form method="POST">
	<label for="label">Label</label>
	<input type="label" name="label" id="label" required />
	<br />
	<button>create new list</button>
</form>
<br />
<a href={resolve('/')}>see other lists</a>
