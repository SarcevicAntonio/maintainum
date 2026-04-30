<script lang="ts">
	import { resolve } from '$app/paths'
	import { page } from '$app/state'
	import favicon from '$lib/assets/favicon.svg'
	import './styles.css'

	let { children } = $props()

	let title = $derived(page.data.title)
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>{!title ? 'maintainum' : `${title} - maintainum`}</title>
</svelte:head>

<header>
	<h1>{title || 'maintainum'}</h1>
	{#if page.data.user}
		<a href={resolve('/auth/clear')}>logout</a>
	{/if}
</header>

{@render children()}

<style>
	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	h1 {
		margin: 0;
	}
</style>
