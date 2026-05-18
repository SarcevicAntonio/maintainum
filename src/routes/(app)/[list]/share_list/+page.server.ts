import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals, parent, url }) => {
	if (!locals.user) redirect(303, '/login')
	const data = await parent()
	return { title: `share "${data.list.label}"`, origin: url.origin }
}
