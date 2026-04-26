import type { Handle } from '@sveltejs/kit'
import PocketBase from 'pocketbase'

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.pb = new PocketBase('http://127.0.0.1:8090')
	const cookies = event.request.headers.get('cookie') || ''
	event.locals.pb.authStore.loadFromCookie(cookies)
	try {
		if (!event.locals.pb.authStore.isValid) throw Error('invalid auth')
		await event.locals.pb.collection('users').authRefresh()
	} catch {
		event.locals.pb.authStore.clear()
	}
	const response = await resolve(event)
	const fresh_cookies = event.locals.pb.authStore.exportToCookie()
	response.headers.append('set-cookie', fresh_cookies)
	return response
}
