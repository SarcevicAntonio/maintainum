import { redirect } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.user) redirect(303, '/auth') // (app) guard
	return { user: locals.user }
}
