import { catch_pb_error } from '$lib/data/pb'
import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals, url }) => {
	const list_id = url.searchParams.get('list')
	const key = url.searchParams.get('key')
	if (!list_id || !key) redirect(303, '/')
	const { res } = await catch_pb_error(
		locals.pb.collection('lists').getOne(list_id)
	)
	if (res) redirect(303, `/${list_id}`)
}
