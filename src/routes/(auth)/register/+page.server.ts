import { catch_pb_error, pb_error_to_fail } from '$lib/data/pb'
import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) redirect(303, '/')
}

export const actions: Actions = {
	async default({ locals, request }) {
		const data = await request.formData()
		const email = String(data.get('email'))
		const password = String(data.get('password'))
		const passwordConfirm = String(data.get('confirm-password'))
		const missing_data = !email || !password || !passwordConfirm
		if (missing_data) {
			const error =
				'missing data: email, password and confirm-password are required'
			return fail(400, { error })
		}
		if (password !== passwordConfirm) {
			const error =
				'invalid data: "password" and "confirm password" are not equivalent'
			return fail(400, { error })
		}

		const { error } = await catch_pb_error(async () => {
			await locals.pb
				.collection('users')
				.create({ email, password, passwordConfirm })
			await locals.pb.collection('users').authWithPassword(email, password)
		})
		if (!error) redirect(303, '/')
		if (error.message === 'Failed to create record.') {
			const error = 'failed to create user. is the email already in use?'
			return fail(400, { error })
		}
		return pb_error_to_fail(error)
	},
}
