import { describe, expect, it } from 'vitest'

import { resolveLocaleString } from './resolve-locale-string'

describe('resolveLocaleString', () => {
  it('returns string values directly', () => {
    expect(resolveLocaleString('Texto', 'pt')).toBe('Texto')
  })

  it('returns locale match when available', () => {
    expect(resolveLocaleString({ en: 'Hello', pt: 'Olá' }, 'pt')).toBe('Olá')
  })

  it('falls back to the first string value', () => {
    expect(resolveLocaleString({ en: 'Hello', pt: 'Olá' }, 'es')).toBe('Hello')
  })

  it('returns undefined for invalid values', () => {
    expect(resolveLocaleString(undefined, 'pt')).toBeUndefined()
    expect(resolveLocaleString(null, 'pt')).toBeUndefined()
  })
})
