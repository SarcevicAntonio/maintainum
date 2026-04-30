<script lang="ts">
	import { resolve } from '$app/paths'
	import type { PageData } from './$types'

	const { data }: { data: PageData } = $props()
</script>

<p>new list wo!</p>

<pre><code>{JSON.stringify(data.list, null, 2)}</code></pre>

<a href={resolve('/')}>see other lists</a>
