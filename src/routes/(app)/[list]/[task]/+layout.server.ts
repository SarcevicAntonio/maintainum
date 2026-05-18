import { catch_pb_error, pb_to_sk_error } from '$lib/data/pb'
import type { Task } from '$lib/data/Task'
import { redirect, error as sk_error } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals, params }) => {
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
