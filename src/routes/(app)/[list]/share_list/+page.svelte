<script lang="ts">
	import { browser } from '$app/environment'
	import Field from '$lib/Field.svelte'

	const { data } = $props()

	const share_link = $derived(
		`${data.origin}/join_list?list${data.list.id}&key=${data.list.key}`
	)
	let copied_to_clipboard = $state(false)

	export function share() {
		copied_to_clipboard = false
		if (navigator.share) {
			navigator.share({ url: share_link })
		} else {
			navigator.clipboard.writeText(share_link)
			copied_to_clipboard = true
		}
	}
</script>

<p>
	to let others join the list "{data.list.label}", copy the link below and send
	it to them. they need to authenticate, and can then join this list.
</p>

<Field
	label="share link"
	readonly
	value={share_link}
	description="please only share this with people you trust, as they can edit and delete
	tasks and items, just like you can."
/>

<div class="row">
	{#if browser}
		<button onclick={share}>share</button>
	{/if}
	{#if copied_to_clipboard}
		<p>copied the link to your clipboard!</p>
	{/if}
</div>

<style>
	.row {
		display: flex;
		align-items: center;
		gap: 1rem;
		p {
			margin: 0;
		}
	}
</style>
