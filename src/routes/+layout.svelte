<script lang="ts">
	import { resolve } from '$app/paths'
	import { page } from '$app/state'
	import favicon from '$lib/assets/favicon.svg'
	import '@picocss/pico/css/pico.yellow.min.css'

	let { children } = $props()

	let title = $derived(page.data.title)
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>{!title ? 'maintainum' : `${title} - maintainum`}</title>
</svelte:head>

<header class="container">
	<h1>{title || 'maintainum'}</h1>
	{#if page.data.user}<a href={resolve('/auth/clear')}>logout</a>{/if}
</header>

<main class="container">{@render children()}</main>

<style>
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;		font-weight: var(--pico-font-weight);

	}

	:global(a) {
		display: block;
		margin-bottom: var(--pico-typography-spacing-vertical);
	}
</style>
