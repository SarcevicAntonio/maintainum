<script lang="ts">
	import { resolve } from '$app/paths'
	import { calc_remaining } from '$lib/data/Task'
	import type { PageData } from './$types'

	const { data }: { data: PageData } = $props()
</script>

{#if !data.list.tasks?.length}
	<p>no tasks yet!</p>
{:else}
	<ol>
		{#each data.list.tasks.sort((a, b) => calc_remaining(a) - calc_remaining(b)) as task (task.id)}
			<li>
				<a
					href={resolve('/(app)/[list]/[task]', {
						list: data.list.id,
						task: task.id,
					})}
				>
					{task.label}
				</a>
			</li>
		{/each}
	</ol>
{/if}

<a href={resolve('/(app)/[list]/new', { list: data.list.id })}>
	create new task
</a>
<a href={resolve('/')}>see other lists</a>

<!-- <pre><code>{JSON.stringify(data.list, null, 2)}</code></pre> -->

<style>
	ol {
		list-style: none;
		padding: 0px;
	}
</style>
