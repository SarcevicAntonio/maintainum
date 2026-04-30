import { catch_pb_error, pb_error_to_fail } from '$lib/data/pb'
import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) redirect(307, '/')
}

export const actions: Actions = {
	async login({ locals, request }) {
		const data = await request.formData()
		const email = String(data.get('email'))
		const password = String(data.get('password'))
		if (!email || !password) {
			return fail(400, { error: 'Missing data: email and password required' })
		}

		const { error } = await catch_pb_error(
			locals.pb.collection('users').authWithPassword(email, password)
		)
		if (error) return pb_error_to_fail(error)

		redirect(303, '/')
	},
	async register({ locals, request }) {
		const data = await request.formData()
		const email = String(data.get('email'))
		const password = String(data.get('password'))
		const password_repeat = String(data.get('password-repeat'))
		const bad_form_data = !email || !password || !password_repeat
		if (bad_form_data) {
			return fail(400, {
				error: 'Missing data: email, password and password_repeat required',
			})
		}

		const { error } = await catch_pb_error(async () => {
			await locals.pb
				.collection('users')
				.create({ email, password, passwordConfirm: password_repeat })
			await locals.pb.collection('users').authWithPassword(email, password)
		})
		if (error) return pb_error_to_fail(error)

		redirect(303, '/')
	},
}
