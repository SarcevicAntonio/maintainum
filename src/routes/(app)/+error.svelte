<script lang="ts">
	import { resolve } from '$app/paths'
	import { page } from '$app/state'
</script>

<h2>{page.status}: {page.error?.message}</h2>

<a href={resolve('/')}>view lists</a>
