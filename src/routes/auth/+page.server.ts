import { fail, redirect, type ActionFailure } from '@sveltejs/kit'
import { ClientResponseError } from 'pocketbase'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) redirect(307, '/')
}

export const actions: Actions = {
	async login({ locals, request }) {
		const data = await request.formData()
		const email = String(data.get('email'))
		const password = String(data.get('password'))
		if (!email || !password) return fail(400, { bad_form_data: true })

		const { fail } = await catch_pb_error(
			locals.pb.collection('users').authWithPassword(email, password)
		)
		if (fail) return fail

		redirect(303, '/')
	},
	async register({ locals, request }) {
		const data = await request.formData()
		const email = String(data.get('email'))
		const password = String(data.get('password'))
		const password_repeat = String(data.get('password-repeat'))
		const bad_form_data = !email || !password || !password_repeat
		if (bad_form_data) return fail(400, { bad_form_data })

		await locals.pb
			.collection('users')
			.create({ email, password, passwordConfirm: password_repeat })
		await locals.pb.collection('users').authWithPassword(email, password)

		// const ={fail} = catch_pb_error(e)
		redirect(303, '/')
	},
}

async function catch_pb_error(
	pb_crud_promise: Promise<unknown> | (() => Promise<unknown>)
): Promise<{ res?: unknown; fail?: ActionFailure<{ error: string }> }> {
	try {
		const res =
			typeof pb_crud_promise === 'function'
				? pb_crud_promise()
				: pb_crud_promise
		return { res: await res }
	} catch (e) {
		if (e instanceof ClientResponseError) {
			return {
				fail: fail(400, { error: e.message }),
			}
		}
		throw e
	}
}
