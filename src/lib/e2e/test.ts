import { test as base } from '@playwright/test'
import { randomUUID } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { parseEnv } from 'node:util'
import PocketBase from 'pocketbase'

const env = parseEnv(readFileSync('./.env', { encoding: 'utf8', flag: 'r' }))
const E2E_PASSWORD = 'e2e_test_password'

class User {
	pb: PocketBase
	email: string
	password: string = E2E_PASSWORD

	constructor() {
		this.pb = new PocketBase(env.PUBLIC_POCKETBASE_URL)
		this.email = `${randomUUID()}@e2e.test`
	}

	async create() {
		try {
			await this.pb.collection('users').create({
				email: this.email,
				password: this.password,
				passwordConfirm: this.password,
			})
			await this.pb
				.collection('users')
				.authWithPassword(this.email, this.password)
		} catch (cause) {
			throw new Error('error while creating test user', { cause })
		}
	}
	async delete() {
		try {
			const response = await this.pb
				.collection('users')
				.authWithPassword(this.email, this.password)
			await this.pb.collection('users').delete(response.record.id)
		} catch (cause) {
			throw new Error('error while deleting test user', { cause })
		}
	}
}

export const test = base.extend<{ user: User }>({
	// eslint-disable-next-line no-empty-pattern
	user: async ({}, use) => {
		const user = new User()
		await use(user)
		await user.delete()
	},
})
export { expect } from '@playwright/test'
