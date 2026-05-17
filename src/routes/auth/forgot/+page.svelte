<script lang="ts">
	import { resolve } from '$app/paths'
	import Field from '$lib/Field.svelte'
	import type { PageProps } from './$types'

	let { form }: PageProps = $props()
</script>

{#if form?.error}<p>{form.error}</p>{/if}

{#if form?.success}
	<p>
		success: should an account with this address exists, a recovery email will
		be send
	</p>
{/if}

<h2>recover password</h2>

<form method="POST">
	<Field label="email" required autocomplete="email" />
	<button type="submit">request recovery email</button>
</form>

<a href={resolve('/auth')}>login or register</a>
