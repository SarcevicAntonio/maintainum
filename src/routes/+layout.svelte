<script lang="ts">
	import { resolve } from '$app/paths'
	import { page } from '$app/state'
	import favicon from '$lib/assets/favicon.svg'
	import '@picocss/pico/css/pico.yellow.min.css'

	let { children, form } = $props()

	let title = $derived(page.data.title)
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>{!title ? 'maintainum' : `${title} - maintainum`}</title>
</svelte:head>

<header class="container">
	<nav>
		<ul><li><strong>maintainum</strong></li></ul>
		{#if page.data.user}
			<a href={resolve('/auth/clear')}>logout</a>
		{/if}
	</nav>
</header>

<main class="container">
	<h1>{title}</h1>
	{#if form?.error}
		<article>
			<header>Form Error:</header>
			<p>{form.error}</p>
		</article>
	{/if}
	{@render children()}
</main>

<style>
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
