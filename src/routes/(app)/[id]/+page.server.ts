import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals, params }) => {
	const list = await locals.pb.collection('lists').getOne(params.id)
	delete list.key
	return { title: list.label, list }
}
