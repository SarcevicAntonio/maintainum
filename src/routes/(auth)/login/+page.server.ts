import { catch_pb_error, pb_error_to_fail } from '$lib/data/pb'
import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) redirect(303, '/')
}

export const actions: Actions = {
	async default({ locals, request, url }) {
		const data = await request.formData()
		const email = String(data.get('email') || '').trim()
		const password = String(data.get('password') || '').trim()
		if (!email || !password) {
			return fail(400, { error: 'missing data: email and password required' })
		}
		const { error } = await catch_pb_error(
			locals.pb.collection('users').authWithPassword(email, password)
		)
		if (error) return pb_error_to_fail(error)
		if (url.searchParams.get('list') && url.searchParams.get('key')) {
			redirect(303, `/join_list${url.search}`)
		}
		redirect(303, '/')
	},
}
