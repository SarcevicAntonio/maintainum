import { catch_pb_error, pb_error_to_fail } from '$lib/data/pb'
import { fail, redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import type { Actions } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) redirect(303, '/login')
}

export const actions: Actions = {
	async default({ locals, request, params }) {
		const data = await request.formData()
		const label = String(data.get('label') || '').trim()
		const description = String(data.get('description') || '').trim()
		const frequency = Number(data.get('frequency') || 0)
		if (!label || !frequency) {
			return fail(400, {
				error: 'missing data: label and frequency are required',
			})
		}
		const { error } = await catch_pb_error(
			locals.pb.collection('tasks').update(params.task, {
				label,
				description,
				frequency,
			})
		)
		if (error) return pb_error_to_fail(error)
		redirect(303, `/${params.list}/${params.task}`)
	},
}
