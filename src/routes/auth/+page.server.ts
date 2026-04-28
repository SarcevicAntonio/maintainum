import { fail, redirect } from '@sveltejs/kit'
import { ClientResponseError } from 'pocketbase'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
	// if (locals.user) redirect(307, '/')
}

export const actions: Actions = {
	login: async ({ locals, request }) => {
		const data = await request.formData()
		const email = String(data.get('email'))
		const password = String(data.get('password'))
		if (!email || !password) return fail(400, { bad_form_data: true })
		try {
			await locals.pb.collection('users').authWithPassword(email, password)
		} catch (e) {
			if (e instanceof ClientResponseError) fail(400, { e })
		}
		// redirect(303, '/')
	},
	register: async ({ locals, request }) => {
		const data = await request.formData()
		const email = String(data.get('email'))
		const password = String(data.get('password'))
		const password_repeat = String(data.get('password-repeat'))
		const bad_form_data = !email || !password || !password_repeat
		console.log({ bad_form_data })
		if (bad_form_data) return fail(400, { bad_form_data })
		try {
			await locals.pb
				.collection('users')
				.create({ email, password, passwordConfirm: password_repeat })
			await locals.pb.collection('users').authWithPassword(email, password)
			console.log('authed!')
		} catch (e) {
			console.log('fail!')
			console.log(e)
			if (e instanceof ClientResponseError) fail(400, { e })
		}
		// redirect(303, '/')
	},
}
