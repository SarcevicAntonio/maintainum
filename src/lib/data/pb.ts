import { ClientResponseError } from "pocketbase";

export async function catch_pb_error(
	pb_crud_promise: Promise<unknown> | (() => Promise<unknown>)
): Promise<{ res?: unknown; error?: ClientResponseError }> {
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
