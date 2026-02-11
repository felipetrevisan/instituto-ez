import { describe, expect, it } from 'vitest'

import { getLocalizedLink } from './get-localized-link'

describe('getLocalizedLink', () => {
  it('returns hash links as-is', () => {
    expect(getLocalizedLink('pt', '#section')).toBe('#section')
    expect(getLocalizedLink('pt', 'section', false, true)).toBe('section')
  })

  it('returns external links as-is', () => {
    expect(getLocalizedLink('pt', 'https://example.com')).toBe('https://example.com')
    expect(getLocalizedLink('pt', 'mailto:test@example.com')).toBe('mailto:test@example.com')
  })

  it('builds localized internal paths', () => {
    expect(getLocalizedLink('pt', '/ebooks/abc')).toBe('/pt/ebooks/abc')
    expect(getLocalizedLink('pt', 'ebooks/abc')).toBe('/pt/ebooks/abc')
  })
})
