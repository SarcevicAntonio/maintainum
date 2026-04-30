import { fail, type ActionFailure } from '@sveltejs/kit'
import { ClientResponseError } from 'pocketbase'

export async function catch_pb_error<T>(
	pb_crud_promise: Promise<T> | (() => Promise<T>)
): Promise<
	{ res: T; error?: never } | { res?: never; error: ClientResponseError }
> {
	try {
		const res =
			typeof pb_crud_promise === 'function'
				? pb_crud_promise()
				: pb_crud_promise
		return { res: await res }
	} catch (error) {
		if (error instanceof ClientResponseError) return { error }
		throw error
	}
}

export function pb_error_to_fail(error: ClientResponseError): ActionFailure<{
	error: string
}> {
	return fail(error.status, { error: error.message })
}
