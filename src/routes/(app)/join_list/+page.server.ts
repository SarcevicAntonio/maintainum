import { catch_pb_error, pb_error_to_fail } from '$lib/data/pb'
import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals, url }) => {
	const list_id = url.searchParams.get('list')
	const key = url.searchParams.get('key')
	if (!list_id || !key) redirect(303, '/')
	const { res } = await catch_pb_error(
		locals.pb.collection('lists').getOne(list_id)
	)
	if (res) redirect(303, `/${list_id}`)
}

export const actions: Actions = {
	async default({ locals, url }) {
		if (!locals.user) redirect(303, `/login${url.search}`)
		const list_id = url.searchParams.get('list')
		const key = url.searchParams.get('key')
		if (!list_id || !key)
			return fail(400, { error: 'missing data: you need a list and key' })
		const { error } = await catch_pb_error(
			locals.pb.collection('lists').update(list_id, {
				key: key,
				// join
				'members+': locals.user.id,
			})
		)
		if (error) return pb_error_to_fail(error)
		redirect(303, `/${list_id}`)
	},
}
