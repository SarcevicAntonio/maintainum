import type { List } from '$lib/data/List'
import { catch_pb_error, pb_to_sk_error } from '$lib/data/pb'
import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals, params }) => {
	if (!locals.user) redirect(303, '/auth')
	if (!locals.user) redirect(303, '/auth')
	const { res: list, error } = await catch_pb_error(
		locals.pb.collection('lists').getOne(params.list, {
			expand: 'tasks_via_list',
		})
	)
	if (error) pb_to_sk_error(error)
	list.tasks = list.expand?.tasks_via_list
	delete list.expand
	return { title: list.label, list: list as List }
}
