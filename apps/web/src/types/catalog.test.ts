import { seedEbooks } from '@ez/web/content/ebooks'
import { seedTestimonials } from '@ez/web/content/testimonials'
import { describe, expect, it } from 'vitest'
import {
  defaultPaymentSettings,
  ebookSchema,
  resolveCheckoutOptions,
  sortByOrder,
  testimonialSchema,
  toPublicEbook,
} from './catalog'

const hotmartUrl = 'https://pay.hotmart.com/ABC123'

describe('resolveCheckoutOptions', () => {
  const settings = defaultPaymentSettings

  it('sem pagamento online, nenhum checkout é oferecido', () => {
    expect(
      resolveCheckoutOptions({ payment: { provider: 'none', hotmartUrl } }, settings, true),
    ).toEqual({
      hotmartUrl: null,
      stripe: false,
    })
  })

  it('Hotmart exige o link configurado', () => {
    expect(
      resolveCheckoutOptions({ payment: { provider: 'hotmart', hotmartUrl: '' } }, settings, true)
        .hotmartUrl,
    ).toBeNull()
    expect(
      resolveCheckoutOptions({ payment: { provider: 'hotmart', hotmartUrl } }, settings, true)
        .hotmartUrl,
    ).toBe(hotmartUrl)
  })

  it('Stripe só aparece com a chave configurada no servidor', () => {
    const ebook = { payment: { provider: 'stripe' as const, hotmartUrl: '' } }
    expect(resolveCheckoutOptions(ebook, settings, false).stripe).toBe(false)
    expect(resolveCheckoutOptions(ebook, settings, true).stripe).toBe(true)
  })

  it('respeita os interruptores globais', () => {
    const ebook = { payment: { provider: 'both' as const, hotmartUrl } }
    expect(
      resolveCheckoutOptions(
        ebook,
        { ...settings, stripeEnabled: false, hotmartEnabled: false },
        true,
      ),
    ).toEqual({ hotmartUrl: null, stripe: false })
    expect(resolveCheckoutOptions(ebook, settings, true)).toEqual({ hotmartUrl, stripe: true })
  })
})

describe('dados de seed', () => {
  it('todos os ebooks são válidos pelo schema', () => {
    for (const ebook of seedEbooks) expect(ebookSchema.safeParse(ebook).success).toBe(true)
  })

  it('todos os depoimentos são válidos e têm ids únicos', () => {
    for (const item of seedTestimonials)
      expect(testimonialSchema.safeParse(item).success).toBe(true)
    const ids = seedTestimonials.map((item) => item.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})

describe('helpers', () => {
  it('toPublicEbook remove o link privado de download', () => {
    const [ebook] = seedEbooks
    const publicEbook = toPublicEbook({
      ...ebook,
      downloadUrl: 'https://drive.google.com/file/d/abc/view',
      file: { key: 'private/ebooks/x/1-e.pdf', name: 'e.pdf' },
    })
    expect(publicEbook).not.toHaveProperty('downloadUrl')
    expect(publicEbook).not.toHaveProperty('file')
    expect(publicEbook.hasDownload).toBe(true)
  })

  it('sortByOrder não altera o array original', () => {
    const items = [{ order: 2 }, { order: 1 }]
    expect(sortByOrder(items).map((item) => item.order)).toEqual([1, 2])
    expect(items[0].order).toBe(2)
  })
})
