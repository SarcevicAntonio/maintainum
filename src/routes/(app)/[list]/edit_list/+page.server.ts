import { catch_pb_error, pb_error_to_fail } from '$lib/data/pb'
import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals, parent }) => {
	if (!locals.user) redirect(303, '/login')
	const data = await parent()
	return { title: `edit "${data.list.label}"` }
}

export const actions: Actions = {
	async update_label({ locals, request, params }) {
		const { res: list, error: list_error } = await catch_pb_error(
			locals.pb.collection('lists').getOne(params.list)
		)
		if (list_error) return pb_error_to_fail(list_error)

		const data = await request.formData()
		const new_label = String(data.get('new-label') || '').trim()
		if (!new_label) {
			return fail(400, { error: 'missing data: label is required' })
		}
		const { error } = await catch_pb_error(
			locals.pb
				.collection('lists')
				.update(list.id, { key: list.key, label: new_label })
		)
		if (error) return pb_error_to_fail(error)
		return { updated_label: true }
	},
}
