import { fail } from '@sveltejs/kit'
import type { Actions } from './$types'

export const actions: Actions = {
	async default({ locals, request }) {
		const data = await request.formData()
		const email = String(data.get('email'))
		if (!email) return fail(400, { bad_form_data: true })
		await locals.pb.collection('users').requestPasswordReset('')
	},
}
