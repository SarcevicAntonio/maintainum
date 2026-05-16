import PocketBase, { type RecordModel } from 'pocketbase'

// reference: https://svelte.dev/docs/kit/types#app.d.ts
declare global {
	namespace App {
		interface Locals {
			pb: PocketBase
			user: RecordModel | undefined
		}
		// interface Error {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {}
