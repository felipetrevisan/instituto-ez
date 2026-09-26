import { describe, expect, it } from 'vitest'
import { defaultSiteSettings, parseSiteSettings, phoneHref, siteSettingsSchema } from './site'

describe('configurações do site', () => {
  it('os padrões são válidos', () => {
    expect(siteSettingsSchema.safeParse(defaultSiteSettings).success).toBe(true)
  })

  it('mescla dados parciais com os padrões', () => {
    const settings = parseSiteSettings({ name: 'Novo Nome', contact: { phone: '(21) 3333-4444' } })
    expect(settings.name).toBe('Novo Nome')
    expect(settings.contact.phone).toBe('(21) 3333-4444')
    expect(settings.contact.email).toBe(defaultSiteSettings.contact.email)
  })

  it('volta aos padrões quando o documento é inválido', () => {
    expect(parseSiteSettings({ contact: { email: 'não é e-mail' } })).toEqual(defaultSiteSettings)
    expect(parseSiteSettings(undefined)).toEqual(defaultSiteSettings)
  })
})

describe('phoneHref', () => {
  it.each([
    ['(11) 99920-1723', 'tel:+5511999201723'],
    ['11 3333-4444', 'tel:+551133334444'],
    ['+55 11 99920-1723', 'tel:+5511999201723'],
    ['+1 415 555 0100', 'tel:+14155550100'],
    ['', ''],
  ])('%s → %s', (input, expected) => {
    expect(phoneHref(input)).toBe(expected)
  })
})
