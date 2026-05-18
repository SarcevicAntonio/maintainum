import type { List } from '$lib/data/List'
import { catch_pb_error, pb_error_to_fail } from '$lib/data/pb'
import { redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) redirect(303, '/login')
}

export const actions: Actions = {
	async default({ locals, params }) {
		if (!locals.user) redirect(303, '/login')
		const { res: list, error: list_error } = await catch_pb_error<List>(
			locals.pb.collection('lists').getOne(params.list)
		)
		if (list_error) return pb_error_to_fail(list_error)

		const multiple_members = list.members.length > 1
		if (multiple_members) {
			const { error } = await catch_pb_error(
				locals.pb.collection('lists').update(list.id, {
					key: list.key,
					// leave
					'members-': locals.user.id,
				})
			)
			if (error) return pb_error_to_fail(error)
		} else {
			const { error } = await catch_pb_error(
				locals.pb.collection('lists').delete(list.id)
			)
			if (error) return pb_error_to_fail(error)
		}

		redirect(303, '/')
	},
}
