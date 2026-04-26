import { PUBLIC_POCKETBASE_URL } from '$env/static/public'
import type { Handle } from '@sveltejs/kit'
import PocketBase from 'pocketbase'

export const handle: Handle = async ({ event, resolve }) => {
	const cookie = event.request.headers.get('cookie')
	event.locals.pb = new PocketBase(PUBLIC_POCKETBASE_URL)
	event.locals.pb.authStore.loadFromCookie(cookie || '')

	try {
		if (!event.locals.pb.authStore.isValid) throw Error('invalid auth')
		const response = await event.locals.pb.collection('users').authRefresh()
		event.locals.user = response.record
	} catch {
		event.locals.pb.authStore.clear()
		event.locals.user = undefined
	}

	const response = await resolve(event)

	const fresh_cookie = event.locals.pb.authStore.exportToCookie()
	response.headers.append('set-cookie', fresh_cookie)
	return response
}
