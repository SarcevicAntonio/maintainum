import adapter from '@sveltejs/adapter-auto'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		// force runes mode for project (except node_modules, can be removed in svelte 6)
		runes: ({ filename }) =>
			filename.split(/[/\\]/).includes('node_modules') ? undefined : true,
	},
	kit: {
		adapter: adapter(),
		csrf: {
			trustedOrigins: process.env.DISABLE_CSRF ? ['*'] : undefined,
		},
	},
}

export default config
