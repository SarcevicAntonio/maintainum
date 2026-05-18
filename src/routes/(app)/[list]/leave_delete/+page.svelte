<script>
	import { resolve } from '$app/paths'

	const { data, form } = $props()

	const member_number = $derived(data.list.members.length)
	const multiple_members = $derived(member_number > 1)
</script>

<h2>leave or delete list</h2>

<p>
	{#if multiple_members}
		there are currently {member_number} members in the list.<br /> you can leave by
		pressing the button below.
	{:else}
		it's just you in the list.<br /> you can delete the list, including all
		tasks, by pressing the button below.<br />
		<strong>note: this can not be undone.</strong>
	{/if}
</p>

{#if form?.error}<p>{form.error}</p>{/if}

<form method="POST">
	<button type="submit">
		{#if multiple_members}
			leave list
		{:else}
			delete list
		{/if}
	</button>
</form>

<hr />

<a href={resolve('/(app)/[list]', { list: data.list.id })}>back to list</a>
