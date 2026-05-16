<script lang="ts">
	import { resolve } from '$app/paths'
	import type { PageProps } from './$types'

	let { form }: PageProps = $props()
</script>

{#if form?.error}<p>{form.error}</p>{/if}

<h2>authenticate</h2>

<details name="auth" open>
	<summary><h3>login</h3></summary>
	<form method="POST" action="?/login">
		<label for="login-email">email</label>
		<input
			required
			id="login-email"
			name="email"
			type="email"
			autocomplete="email"
		/>
		<label for="login-password">password</label>
		<input
			required
			id="login-password"
			name="password"
			type="password"
			autocomplete="current-password"
		/>
		<button type="submit">login</button>
	</form>
	<a href={resolve('/auth/forgot')}>forgot password?</a>
</details>
<hr />
<details name="auth">
	<summary><h3>register</h3></summary>
	<form method="POST" action="?/register">
		<label for="register-email">email</label>
		<input
			required
			id="register-email"
			name="email"
			type="email"
			autocomplete="email"
		/>
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
		<button type="submit">register</button>
	</form>
</details>

<style>
	details summary {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	summary h3 {
		margin: 0rem;
		display: inline-block;
	}
</style>
