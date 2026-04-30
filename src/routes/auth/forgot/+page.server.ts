import { catch_pb_error, pb_error_to_fail } from '$lib/data/pb'
import { fail } from '@sveltejs/kit'
import type { PageServerLoad } from '../$types'
import type { Actions } from './$types'

export const load: PageServerLoad = async () => {
	return { title: 'forgot password' }
}

export const actions: Actions = {
	async default({ locals, request }) {
		const data = await request.formData()
		const email = String(data.get('email'))
		if (!email) return fail(400, { bad_form_data: true })
		const { error } = await catch_pb_error(
			locals.pb.collection('users').requestPasswordReset(email)
		)
		if (error) return pb_error_to_fail(error)
	},
}
