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
	{#if page.data.user}
		<a href={resolve('/account')} class="secondary">account</a>
	{/if}
</header>

<main class="container">{@render children()}</main>

<style>
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 0.25rem dashed var(--pico-primary-border);
		gap: 1rem;

		h1 {
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
		}

		h1,
		a {
			margin: 0;
		}
	}

	:global(a) {
		display: block;
		margin-bottom: var(--pico-typography-spacing-vertical);
	}
</style>
