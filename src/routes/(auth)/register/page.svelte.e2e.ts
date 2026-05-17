import { expect, test } from '$lib/e2e/test'

test.describe('auth', () => {
	test('can sign up', async ({ page, user }) => {
		await page.goto('/')
		await page.waitForURL('**/login')
		await page.getByRole('link', { name: 'register' }).click()
		await page.getByRole('textbox', { name: 'email' }).fill(user.email)
		await page
			.getByRole('textbox', { name: 'password', exact: true })
			.fill(user.password)
		await page
			.getByRole('textbox', { name: 'confirm password' })
			.fill(user.password)
		await page.getByRole('button', { name: 'register' }).click()
		await page.waitForURL('**/')
		expect(page.getByRole('heading', { name: 'maintainum' })).toBeVisible()
	})
})
