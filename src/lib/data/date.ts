export function day_string(date?: Date | string): string {
	if (!date) date = new Date()
	if (typeof date === 'string') date = new Date(date)
	return date.toISOString().substring(0, 10)
}
