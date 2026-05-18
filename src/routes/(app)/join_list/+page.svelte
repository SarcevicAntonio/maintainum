<script lang="ts">
	import { resolve } from '$app/paths'
	import { page } from '$app/state'

	const { data } = $props()
</script>

<p>you have been invited to join a task list on maintainum.</p>
{#if !data.user}
	<p>to join the list, you need to first authenticate.</p>

	TODO: add back query params and redirect in actions functions
	<a href={resolve(`/login${page.url.search}`)}>login</a>
	<a href={resolve(`/register${page.url.search}`)}>register</a>
{:else}
	TODO: add join handler
	<form method="POST">
		<input type="hidden" value={page.url.searchParams.get('key')} />
		<button type="submit">join list</button>
	</form>
{/if}
