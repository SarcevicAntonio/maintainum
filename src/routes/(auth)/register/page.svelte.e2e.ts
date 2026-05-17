import { test } from '@playwright/test'
import { readFileSync } from 'fs'
import PocketBase from 'pocketbase'
import { parseEnv } from 'util'

const env = parseEnv(readFileSync('./.env', { encoding: 'utf8', flag: 'r' }))
const pb = new PocketBase(env.PUBLIC_POCKETBASE_URL)

const test_user = {
	email: 'signup@e2e.test',
	password: 'asdfghjkl123',
	delete: async () => {
		try {
			const response = await pb
				.collection('users')
				.authWithPassword(test_user.email, test_user.password)
			await pb.collection('users').delete(response.record.id)
		} catch {
			// no-op
		}
	},
}

test.describe('auth', () => {
	test.beforeEach(test_user.delete)
	test.afterEach(test_user.delete)

	test('can sign up', async ({ page }) => {
		await page.goto('/')
		await page.waitForURL('**/login')
		await page.getByRole('link', { name: 'register' }).click()
		await page.getByRole('textbox', { name: 'email' }).fill(test_user.email)
		await page
			.getByRole('textbox', { name: 'password', exact: true })
			.fill(test_user.password)
		await page
			.getByRole('textbox', { name: 'confirm password' })
			.fill(test_user.password)
		await page.getByRole('button', { name: 'register' }).click()
		await page.waitForURL('**/', { timeout: 500 })
	})
})
