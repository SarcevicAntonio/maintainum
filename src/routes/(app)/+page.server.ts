import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
	const lists = await locals.pb.collection('lists').getList() // TODO: pagination
	return { lists }
}
