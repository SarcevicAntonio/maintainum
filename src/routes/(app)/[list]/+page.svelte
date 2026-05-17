<script lang="ts">
	import { resolve } from '$app/paths'
	import { calc_remaining } from '$lib/data/Task'
	import type { PageData } from './$types'

	const { data }: { data: PageData } = $props()
</script>

{#if !data.list.tasks?.length}
	<p>no tasks yet!</p>
{:else}
	<ul>
		{#each data.list.tasks.sort((a, b) => calc_remaining(a) - calc_remaining(b)) as task (task.id)}
			{@const href = resolve('/(app)/[list]/[task]', {
				list: data.list.id,
				task: task.id,
			})}
			<li><a {href}>{task.label}</a></li>
		{/each}
	</ul>
{/if}

<hr />

<a
	href={resolve('/(app)/[list]/new_task', { list: data.list.id })}
	class="secondary"
>
	new task
</a>
<a
	href={resolve('/(app)/[list]/edit', { list: data.list.id })}
	class="secondary"
>
	edit list
</a>
<a href={resolve('/')} class="secondary"> view lists </a>
