<script lang="ts">
	import type {
		HTMLInputAttributes,
		HTMLTextareaAttributes,
	} from 'svelte/elements'

	type Props = {
		label: string
		description?: string
	} & (
		| ({ type?: 'text' | 'email' | 'number' } & HTMLInputAttributes)
		| ({ type: 'textarea' } & HTMLTextareaAttributes)
	)

	const { label, type = 'text', description, ...rest }: Props = $props()

	const id = $derived(label.toLowerCase().replaceAll(/\s+/g, '-'))
	const description_id = $derived(`${id}-description`)
</script>

<label for={id}>{label}</label>

{#if type === 'textarea'}
	<textarea
		{id}
		name={id}
		aria-describedby={description ? description_id : undefined}
		{...rest as HTMLTextareaAttributes}
	></textarea>
{:else}
	<input
		{type}
		{id}
		name={id}
		aria-describedby={description ? description_id : undefined}
		{...rest as HTMLInputAttributes}
	/>
{/if}

{#if description}<small id={description_id}>{description}</small>{/if}
