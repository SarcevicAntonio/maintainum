import { day_string } from '$lib/data/date'
import { differenceInCalendarDays, subDays } from 'date-fns'

export type Task = {
	id: string // PK
	list_id: string // FK
	label: string
	description: string
	frequency?: number
	done: string | boolean
}

export function create_raw_item(
	frequency?: number
): Omit<Task, 'id' | 'list_id'> {
	return {
		label: '',
		description: '',
		frequency: frequency,
		done: frequency ? day_string(subDays(new Date(), frequency)) : false,
	}
}

export function calc_remaining(item: Task): number {
	if (!item.frequency || typeof item.done === 'boolean') return 0
	const difference = differenceInCalendarDays(new Date(), new Date(item.done))
	return item.frequency - difference
}
