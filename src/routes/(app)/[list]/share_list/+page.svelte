<script lang="ts">
	import { browser } from '$app/environment'
	import { resolve } from '$app/paths'
	import Field from '$lib/Field.svelte'

	const { data } = $props()

	const share_link = $derived(
		`${data.origin}/join_list?list=${data.list.id}&key=${data.list.key}`
	)

	function share() {
		if (!navigator.share) return
		navigator.share({ url: share_link })
	}

	let copied_to_clipboard = $state(false)
	function copy() {
		navigator.clipboard.writeText(share_link)
		copied_to_clipboard = true
	}
</script>

<p>
	to let others join the list "{data.list.label}", copy the link below and send
	it to them. they need to authenticate, and can then join this list.
</p>

<p>
	<strong>note: please only share this with people you trust</strong>, as they
	can edit and delete tasks or the whole list, just like you can.
</p>

<Field label="share link" value={share_link} readonly />

{#if browser}
	{#if !!navigator.share}
		<button onclick={share}>share</button>
	{:else}
		<div class="row">
			<button onclick={copy}>copy</button>
			{#if copied_to_clipboard}
				<p>copied the link to your clipboard!</p>
			{/if}
		</div>
	{/if}
{/if}

<hr />

<a href={resolve('/(app)/[list]', { list: data.list.id })}>back to list</a>

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
