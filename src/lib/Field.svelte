<script lang="ts">
	import type { Snippet } from 'svelte'
	import type {
		HTMLInputAttributes,
		HTMLTextareaAttributes,
	} from 'svelte/elements'

	type Props = {
		label: string
		description?: string
		output?: Snippet
	} & (
		| ({
				type?: 'text' | 'email' | 'password' | 'number' | 'date'
		  } & HTMLInputAttributes)
		| ({ type: 'textarea' } & HTMLTextareaAttributes)
	)

	let {
		label,
		type = 'text',
		description,
		output,
		value = $bindable(),
		...rest
	}: Props = $props()

	const id = $derived(label.toLowerCase().replaceAll(/\s+/g, '-'))
	const description_id = $derived(`${id}-description`)
</script>

<label for={id}>{label}</label>

{#if type === 'textarea'}
	<textarea
		bind:value
		{id}
		name={id}
		aria-describedby={description ? description_id : undefined}
		{...rest as HTMLTextareaAttributes}
	></textarea>
{:else}
	<input
		bind:value
		{type}
		{id}
		name={id}
		aria-describedby={description ? description_id : undefined}
		{...rest as HTMLInputAttributes}
	/>
{/if}

{#if description}<small id={description_id}>{description}</small>{/if}

{#if output}<small> <output for={id}>{@render output()}</output></small>{/if}
