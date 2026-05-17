<script lang="ts">
	import { browser } from '$app/environment'
	import { resolve } from '$app/paths'
	import { calc_remaining, day_string } from '$lib/data/Task'
	import Field from '$lib/Field.svelte'
	import { differenceInCalendarDays } from 'date-fns'
	import type { PageData } from './$types'

	const { data }: { data: PageData } = $props()

	const remaining = $derived(calc_remaining(data.task))
	const done = $derived(remaining > 0)
	let day_done = $state(day_string())
	const next_return = $derived(
		(data.task.frequency || 0) -
			differenceInCalendarDays(new Date(), new Date(day_done))
	)
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

<hr />

<form method="POST" class="row">
	<Field label="day done" type="date" bind:value={day_done}>
		{#snippet output()}
			{#if browser}
				{#if next_return >= 0}
					task wil return in {next_return} days.
				{:else}
					task wil be
					{#if next_return < 0}
						{Math.abs(next_return)} day{Math.abs(next_return) !== 1 ? 's' : ''}
					{/if}
					due!
				{/if}
			{/if}
		{/snippet}
	</Field>
	<button type="submit"> mark as done </button>
</form>

<hr />

<a href={resolve('/(app)/[list]', { list: data.task.list })}>back to list</a>
