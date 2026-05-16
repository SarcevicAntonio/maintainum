<script lang="ts">
	import { resolve } from '$app/paths'
	import type { PageProps } from './$types'

	let { form }: PageProps = $props()
</script>

{#if form?.error}<p>{form.error}</p>{/if}

<h2>recover password</h2>

<form method="POST">
	<label for="email">email</label>
	<input id="email" type="email" name="email" required />
	<button type="submit">request recovery email</button>
</form>
<a href={resolve('/auth')}>login or register instead</a>
