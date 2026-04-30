<script lang="ts">
	import { resolve } from '$app/paths'
	import type { PageProps } from './$types'

	let { form }: PageProps = $props()
</script>

{#if form?.error}<p>{form.error}</p>{/if}

<details name="auth" open>
	<summary><h2>login</h2></summary>
	<form method="POST" action="?/login">
		<label for="login-email">email</label>
		<input
			required
			id="login-email"
			name="email"
			type="email"
			autocomplete="email"
		/>
		<br />
		<label for="login-password">password</label>
		<input
			required
			id="login-password"
			name="password"
			type="password"
			autocomplete="current-password"
		/>
		<br />
		<button type="submit">login</button>
	</form>
	<br />
	<a href={resolve('/auth/forgot')}>forgot password?</a>
</details>
<details name="auth">
	<summary><h2>register</h2></summary>
	<form method="POST" action="?/register">
		<label for="register-email">email</label>
		<input
			required
			id="register-email"
			name="email"
			type="email"
			autocomplete="email"
		/>
		<br />
		<label for="register-password">password</label>
		<input
			required
			id="register-password"
			name="password"
			type="password"
			autocomplete="new-password"
		/>
		<label for="register-password-repeat">repeat password</label>
		<input
			required
			id="register-password-repeat"
			name="password-repeat"
			type="password"
			autocomplete="off"
		/>
		<br />
		<button type="submit">register</button>
	</form>
</details>

<style>
	h2 {
		display: inline-block;
	}
</style>
