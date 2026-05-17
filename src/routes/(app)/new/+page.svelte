<script lang="ts">
	import { resolve } from '$app/paths'
	import Field from '$lib/Field.svelte'
	import type { PageProps } from './$types'

	let { form }: PageProps = $props()
</script>

{#if form?.error}<p>{form.error}</p>{/if}

<form method="POST">
	<Field label="label" required />
	<button type="submit">create new list</button>
</form>
<a href={resolve('/')}>view lists</a>
