import { describe, it, expect } from 'vitest'
import { slugify } from './slugify'

describe('slugify', () => {
	it('returns a slug', () => {
		expect(slugify('Svelte')).toBe('svelte')
		expect(slugify('a b')).toBe('a-b')
		expect(slugify('a!b')).toBe('aexclamation-markb')
		expect(slugify('a+b')).toBe('ab')
		expect(slugify('a#b')).toBe('anumberb')
		expect(slugify('asdfasdf asdfasdf 23423asdfg')).toBe(
			'asdfasdf-asdfasdf-23423asdfg'
		)
		expect(
			slugify(
				'asdfasdfasdf23451q23 asdfasdfqw3r q23wasfasdfas#düföas#dü+föca#sdfawsef'
			)
		).toBe(
			'asdfasdfasdf23451q23-asdfasdfqw3r-q23wasfasdfasnumberdufoasnumberdufocanumbersdfawsef'
		)
		expect(slugify('!@#$%^*')).toBe(
			'exclamation-markatnumberdollarpercentcaretstar'
		)
	})
})
