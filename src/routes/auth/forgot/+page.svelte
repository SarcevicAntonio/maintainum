<script lang="ts">
	import { resolve } from '$app/paths'
	import type { PageProps } from './$types'

	let { form }: PageProps = $props()
</script>

<h1>Forgot password</h1>

{#if form?.error}<p>{form.error}</p>{/if}

<form method="POST">
	<label for="email">Email</label>
	<input type="email" name="email" id="email" required />
	<br />
	<button>request recovery email</button>
</form>
<br />
<a href={resolve('/auth')}>Login or sign-up instead</a>
