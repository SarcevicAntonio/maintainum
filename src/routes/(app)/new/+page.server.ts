import { catch_pb_error, pb_error_to_fail } from '$lib/data/pb'
import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'
import { slugify } from '$lib/data/slugify'

const reserved_ids = ['new', 'auth']

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) redirect(303, '/auth')
	return { title: 'new list' }
}

export const actions: Actions = {
	async default({ locals, request }) {
		if (!locals.user) redirect(303, '/auth')
		const data = await request.formData()
		const label = String(data.get('label')) //
		if (!label) return fail(400, { error: 'missing data: label is required' })
		const id = slugify(label)
		if (reserved_ids.includes(id)) {
			return fail(400, {
				error: 'id conflict: label leads to id that is reserved',
			})
		}
		const { res, error } = await catch_pb_error(
			locals.pb.collection('lists').create({
				label,
				id,
				members: [locals.user.id],
			})
		)
		if (error) return pb_error_to_fail(error)
		redirect(303, `/${res.id}`)
	},
}
