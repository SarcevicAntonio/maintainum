<script lang="ts">
	import type { PageProps } from './$types'

	let { form }: PageProps = $props()
</script>

<h1>Please Authenticate</h1>

{JSON.stringify(form)}

<details name="auth" open>
	<summary><h2>Login</h2></summary>
	<form method="POST" action="?/login">
		<label for="login-email">Email</label>
		<input
			required
			id="login-email"
			name="email"
			type="email"
			autocomplete="email"
		/>
		<br />
		<label for="login-password">Password</label>
		<input
			required
			id="login-password"
			name="password"
			type="password"
			autocomplete="current-password"
		/>
		<br />
		<button type="submit">Login</button>
	</form>
</details>
<details name="auth">
	<summary><h2>Register</h2></summary>
	<form method="POST" action="?/register">
		<label for="register-email">Email</label>
		<input
			required
			id="register-email"
			name="email"
			type="email"
			autocomplete="email"
		/>
		<br />
		<label for="register-password">Password</label>
		<input
			required
			id="register-password"
			name="password"
			type="password"
			autocomplete="new-password"
		/>
		<label for="register-password-repeat">Repeat Password</label>
		<input
			required
			id="register-password-repeat"
			name="password-repeat"
			type="password"
			autocomplete="off"
		/>
		<br />
		<button type="submit">Register</button>
	</form>
</details>

<style>
	h2 {
		display: inline-block;
	}
</style>
