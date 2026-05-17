import { expect, test } from '$lib/e2e/test'

test.describe('/login', () => {
	test('can login', async ({ page, user }) => {
		await user.create()
		await page.goto('/')
		await page.waitForURL('**/login')
		await page.getByRole('textbox', { name: 'email' }).fill(user.email)
		await page
			.getByRole('textbox', { name: 'password', exact: true })
			.fill(user.password)
		await page.getByRole('button', { name: 'login' }).click()
		await page.waitForURL('**/')
		expect(page.getByRole('heading', { name: 'maintainum' })).toBeVisible()
	})
})
