import { differenceInCalendarDays } from 'date-fns'
import type { RecordModel } from 'pocketbase'

export interface Task extends RecordModel {
	label: string
	description: string
	frequency?: number
	done: string
}

export function calc_remaining(item: Task): number {
	if (!item.frequency || typeof item.done === 'boolean') return 0
	const difference = differenceInCalendarDays(new Date(), new Date(item.done))
	return item.frequency - difference
}

export function day_string(date?: Date | string): string {
	if (!date) date = new Date()
	if (typeof date === 'string') date = new Date(date)
	return date.toISOString().substring(0, 10)
}
