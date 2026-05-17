import type { List } from '$lib/data/List'
import { catch_pb_error, pb_error_to_fail, pb_to_sk_error } from '$lib/data/pb'
import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals, params }) => {
	if (!locals.user) redirect(303, '/login')
	const { res: list, error } = await catch_pb_error(
		locals.pb.collection('lists').getOne(params.list)
	)
	if (error) pb_to_sk_error(error)
	return { title: `edit "${list.label}"`, list: list as List }
}

export const actions: Actions = {
	async update_label({ locals, request, params }) {
		const { res: list, error: fetch_error } = await catch_pb_error(
			locals.pb.collection('lists').getOne(params.list)
		)
		if (fetch_error) return pb_error_to_fail(fetch_error)

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
