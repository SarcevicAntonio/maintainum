<script>
	import { resolve } from '$app/paths'
	const { data } = $props()
</script>

{#if data.lists.totalItems}
	<ul>
		{#each data.lists.items as item (item.id)}
			<li>
				<a href={resolve(`/(app)/[id]`, { id: item.id })}>{item.label}</a>
			</li>
		{/each}
	</ul>
{:else}
	<p>no lists.</p>
{/if}

<a href={resolve('/new')}>create new list</a>
