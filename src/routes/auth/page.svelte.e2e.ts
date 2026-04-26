import { test } from '@playwright/test'
import { readFileSync } from 'fs'
import PocketBase from 'pocketbase'
import { parseEnv } from 'util'

const env = parseEnv(readFileSync('./.env', { encoding: 'utf8', flag: 'r' }))
const pb = new PocketBase(env.PUBLIC_POCKETBASE_URL)
const email = 'e2e@test.com'
const password = 'asdfghjkl123'

const delete_test_user = async () => {
	try {
		console.log('')
		const response = await pb
			.collection('users')
			.authWithPassword(email, password)
		await pb.collection('users').delete(response.record.id)
	} catch {
		// nothing to do
	}
}

test.describe('auth', () => {
	test.beforeEach(delete_test_user)
	test.afterEach(delete_test_user)

	test('can sign up', async ({ page }) => {
		await page.goto('/')
		await page.waitForURL('**/auth')
		await page.locator('summary', { hasText: 'Register' }).click()
		await page.getByRole('textbox', { name: 'Email' }).fill(email)
		await page
			.getByRole('textbox', { name: 'Password', exact: true })
			.fill(password)
		await page.getByRole('textbox', { name: 'Repeat Password' }).fill(password)
		await page.getByRole('button', { name: 'Register' }).click()
		await page.waitForURL('**/', { timeout: 500 })
	})
})
