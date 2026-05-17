<script>
	import { resolve } from '$app/paths'
	const { data } = $props()
</script>

<h2>select list</h2>

{#if data.lists.totalItems}
	<ul>
		{#each data.lists.items as list (list.id)}
			<li>
				<a href={resolve(`/(app)/[list]`, { list: list.id })}>{list.label}</a>
			</li>
		{/each}
	</ul>
{:else}
	<p>no lists.</p>
{/if}

<a href={resolve('/new')}>new list</a>
