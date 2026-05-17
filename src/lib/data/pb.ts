import { error, fail, type ActionFailure } from '@sveltejs/kit'
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

		const is_relative_url_fetch_error =
			error instanceof Error &&
			error.message.match(/Cannot use relative URL \((.+)\) with global fetch/)
		if (is_relative_url_fetch_error) {
			throw new Error(RELATIVE_URL_FETCH_ERROR, { cause: error })
		}

		throw error
	}
}

export function pb_to_sk_error(pb_error: ClientResponseError): never {
	error(pb_error.status, { message: pb_error.message })
}

export function pb_error_to_fail(error: ClientResponseError): ActionFailure<{
	error: string
}> {
	return fail(error.status, { error: error.message })
}

const RELATIVE_URL_FETCH_ERROR = `maintainum: pocketbase tries to use global \
fetch with relative URL.
Make sure you have copied the .env.example file, and your .env file contains a \
valid "PUBLIC_POCKETBASE_URL".`
