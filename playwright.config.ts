import { defineConfig } from '@playwright/test'

declare const process: { env: Record<string, unknown> }

const is_CI = process.env.CI

const url = !is_CI ? 'http://localhost:5173' : 'http://localhost:4173'
export default defineConfig({
	webServer: {
		reuseExistingServer: true,
		command: !is_CI
			? 'echo "reusing dev server"'
			: 'pnpm dev:pb & pnpm build && pnpm preview',
		env: { ORIGIN: url },
		url,
		stderr: 'pipe',
	},
	use: { baseURL: url },
	testMatch: '**/*.e2e.{ts,js}',
})
