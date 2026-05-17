import { catch_pb_error, pb_error_to_fail, pb_to_sk_error } from '$lib/data/pb'
import type { Task } from '$lib/data/Task'
import { fail, redirect, error as sk_error } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals, params }) => {
	if (!locals.user) redirect(303, '/login')
	const { res: task, error } = await catch_pb_error(
		locals.pb.collection('tasks').getOne(params.task)
	)
	if (!task) sk_error(404, { message: 'task not found.' })
	if (task.list !== params.list) redirect(303, `/${task.list}/${params.task}`)
	if (error) pb_to_sk_error(error)
	return {
		title: task.label,
		task: task as Task,
	}
}

export const actions: Actions = {
	async default({ locals, request, params }) {
		const data = await request.formData()
		const done = String(data.get('day-done') || '').trim()
		if (!done) {
			return fail(400, { error: 'missing data: day-done is required' })
		}
		const { error } = await catch_pb_error(
			locals.pb.collection('tasks').update(params.task, { done })
		)
		if (error) return pb_error_to_fail(error)
		redirect(303, `/${params.list}`)
	},
}
