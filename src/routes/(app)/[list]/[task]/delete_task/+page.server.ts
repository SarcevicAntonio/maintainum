import { catch_pb_error, pb_error_to_fail } from '$lib/data/pb'
import { redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) redirect(303, '/login')
}

export const actions: Actions = {
	async default({ locals, params }) {
		if (!locals.user) redirect(303, '/login')
		const { error } = await catch_pb_error(
			locals.pb.collection('tasks').delete(params.task)
		)
		if (error) return pb_error_to_fail(error)
		redirect(303, `/${params.list}`)
	},
}
