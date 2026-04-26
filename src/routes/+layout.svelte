<script lang="ts">
	import { page } from '$app/state'
	import favicon from '$lib/assets/favicon.svg'
	import './styles.css'

	let { children } = $props()
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

<pre>
data: {JSON.stringify(page.data, null, 3)}
</pre>
