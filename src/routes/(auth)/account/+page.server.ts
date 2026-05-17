import { catch_pb_error, pb_error_to_fail } from '$lib/data/pb'
import { redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) redirect(303, '/login')
}

export const actions: Actions = {
	async reset_password({ locals }) {
		if (!locals.user) redirect(303, '/login')
		const { error } = await catch_pb_error(
			locals.pb.collection('users').requestPasswordReset(locals.user.email)
		)
		if (error) return pb_error_to_fail(error)
		return { reset_password: true }
	},
	async logout({ locals }) {
		locals.pb.authStore.clear()
		redirect(303, '/')
	},
}
