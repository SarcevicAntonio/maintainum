<script lang="ts">
	import { resolve } from '$app/paths'
	import { page } from '$app/state'
	import { calc_remaining } from '$lib/data/Task'
	import type { PageData } from './$types'

	const { data }: { data: PageData } = $props()

	const remaining = $derived(calc_remaining(data.task))
	const done = $derived(remaining > 0)
</script>

{#if data.task.description}<p>{data.task.description}</p>{/if}
<p>
	returns every {data.task.frequency} day{data.task.frequency !== 1 ? 's' : ''}.
</p>
<p>
	{#if done}
		done! {remaining} day{remaining !== 1 ? 's' : ''} remaining until the task needs
		to be done again.
	{:else}
		currently todo.
		{#if remaining < 0}
			{Math.abs(remaining)} day{Math.abs(remaining) !== 1 ? 's' : ''} overdue!
		{/if}
	{/if}
</p>

<a href={resolve('/(app)/[list]', { list: page.params.list! })}>back to list</a>
