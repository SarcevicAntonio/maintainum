<script lang="ts">
	import { resolve } from '$app/paths'
	import { calc_remaining } from '$lib/data/Task'
	import type { PageData } from './$types'

	const { data }: { data: PageData } = $props()
</script>

{#if !data.list.tasks?.length}
	<p>no tasks yet...</p>
{:else}
	<ul>
		{#each data.list.tasks.sort((a, b) => calc_remaining(a) - calc_remaining(b)) as task (task.id)}
			{@const remaining = calc_remaining(task)}
			{@const done = remaining > 0}
			{@const href = resolve('/(app)/[list]/[task]', {
				list: data.list.id,
				task: task.id,
			})}
			{#snippet item()}
				<a {href} class="raw">{task.label}</a>
			{/snippet}
			<li>
				{#if done}
					<s>{@render item()}</s>
					<small>
						<i>
							(returns in {remaining} day{remaining !== 1 ? 's' : ''})
						</i>
					</small>
				{:else}
					{@render item()}
				{/if}
			</li>
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
	href={resolve('/(app)/[list]/edit_list', { list: data.list.id })}
	class="secondary"
>
	edit list
</a>
<a href={resolve('/')} class="secondary"> view lists </a>

<style>
	ul li {
		margin-bottom: var(--pico-typography-spacing-vertical);
	}
</style>
