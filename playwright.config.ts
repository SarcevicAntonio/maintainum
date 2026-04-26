import { defineConfig } from '@playwright/test'

const url = 'http://localhost:4173'
export default defineConfig({
	webServer: {
		command: 'pnpm dev:pb & pnpm build && pnpm preview',
		env: { ORIGIN: url },
		url,
		stderr: 'pipe',
	},
	use: { baseURL: url },
	testMatch: '**/*.e2e.{ts,js}',
})
