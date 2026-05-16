<script lang="ts">
	import { resolve } from '$app/paths'
	import type { PageProps } from './$types'

	let { form }: PageProps = $props()
</script>

{#if form?.error}<p>{form.error}</p>{/if}

<form method="POST">
	<label for="email">email</label>
	<input type="email" name="email" id="email" required />
	<button>request recovery email</button>
</form>
<a href={resolve('/auth')}>login or register instead</a>
