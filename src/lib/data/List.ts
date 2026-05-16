import type { RecordModel } from 'pocketbase'
import type { Task } from './Task'

export interface List extends RecordModel {
	label: string
	members: string[]
	tasks: Task[]
}
