import { catch_pb_error, pb_error_to_fail } from '$lib/data/pb'
import { day_string } from '$lib/data/Task'
import { fail, redirect } from '@sveltejs/kit'
import { subDays } from 'date-fns'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) redirect(303, '/login')
	return { title: 'new task' }
}

export const actions: Actions = {
	async default({ locals, request, params }) {
		if (!locals.user) redirect(303, '/login')
		const data = await request.formData()
		const label = String(data.get('label') || '').trim()
		const description = String(data.get('description') || '').trim()
		const frequency = Number(data.get('frequency') || 0)
		if (!label || !frequency)
			return fail(400, {
				error: 'missing data: label and frequency are required',
			})
		const { error } = await catch_pb_error(
			locals.pb.collection('tasks').create({
				label,
				description,
				frequency,
				done: day_string(subDays(new Date(), frequency)),
				list: params.list,
			})
		)
		if (error) return pb_error_to_fail(error)
		redirect(303, `/${params.list}`)
	},
}
