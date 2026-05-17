<script lang="ts">
	import { resolve } from '$app/paths'

	let { data, form } = $props()
</script>

<h2>account</h2>

<p>logged in as {data.user?.email}</p>

{#if !form?.reset_password}
	<form method="POST" action="?/reset_password">
		<button type="submit">request password reset</button>
	</form>
{:else}
	<p>a password reset email will be send shortly</p>
{/if}

<form method="POST" action="?/logout">
	<button type="submit">logout</button>
</form>

<hr />

<a href={resolve('/')}>view lists</a>
