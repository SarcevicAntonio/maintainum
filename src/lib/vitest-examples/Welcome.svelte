<script lang="ts">
	export function greet(name: string): string {
		return 'Hello, ' + name + '!'
	}

	let { host = 'SvelteKit', guest = 'Vitest' } = $props()
</script>

<h1>{greet(host)}</h1>
<p>{greet(guest)}</p>
