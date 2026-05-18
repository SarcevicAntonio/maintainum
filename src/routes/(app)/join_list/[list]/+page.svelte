<script lang="ts">
	import { resolve } from '$app/paths'

	const { data } = $props()
</script>

<p>you have been invited to join a task list on maintainum.</p>
{#if !data.user}
	<p>to join the list, you need to first authenticate.</p>

	TODO: add back query params and redirect in load functions
	<a href={resolve('/login')}>login</a>
	<a href={resolve('/register')}>register</a>
{:else}
	TODO: add join handler
	<form method="POST">
		<button type="submit">join list</button>
	</form>
{/if}
