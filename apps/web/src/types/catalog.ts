import { z } from 'zod'

const hexColor = z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Use uma cor hexadecimal, ex.: #e54c5b')

export const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export const paymentProviders = ['none', 'hotmart', 'stripe', 'both'] as const
export type PaymentProvider = (typeof paymentProviders)[number]

export const testimonialAreas = ['home', 'immersion', 'ebooks'] as const
export type TestimonialArea = (typeof testimonialAreas)[number]

export const ebookSchema = z.object({
  id: z.string(),
  slug: z.string().regex(slugPattern, 'Use apenas letras minúsculas, números e hífens'),
  title: z.string().trim().min(1, 'Informe o título'),
  description: z.string().trim().min(1, 'Informe a descrição'),
  accent: hexColor,
  accentSecondary: hexColor,
  cover: z.string().min(1, 'Envie a capa'),
  pages: z.array(z.string()),
  heroImage: z.string(),
  badges: z.object({
    rating: z.coerce.number().int().min(0).max(5),
    downloads: z.coerce.number().int().min(0),
    updated: z.string(),
  }),
  metadata: z.array(
    z.object({
      value: z.union([z.number(), z.string()]),
      label: z.string().min(1),
      icon: z.string(),
    }),
  ),
  index: z.object({
    title: z.string(),
    videoTitle: z.string(),
    videoId: z.string(),
    paragraphs: z.array(z.string()),
    closing: z.string(),
  }),
  questions: z.array(z.object({ question: z.string().min(1), answer: z.string().min(1) })),
  author: z.object({
    name: z.string(),
    photo: z.string(),
    paragraphs: z.array(z.string()),
    closing: z.string(),
  }),
  price: z.object({
    regular: z.coerce.number().min(0, 'Preço inválido'),
    label: z.string(),
  }),
  cta: z.string().min(1),
  payment: z.object({
    provider: z.enum(paymentProviders),
    hotmartUrl: z.union([
      z.literal(''),
      z.string().url('Informe a URL completa do checkout Hotmart'),
    ]),
  }),
  /**
   * Link do PDF entregue após pagamento via Stripe (Google Drive, Dropbox…).
   * Nunca vai para o navegador: o servidor só redireciona após confirmar o pagamento.
   */
  downloadUrl: z
    .union([z.literal(''), z.string().url('Informe o link completo (https://…)')])
    .default(''),
  /** PDF enviado ao R2 (pasta privada). Tem prioridade sobre o link externo. */
  file: z
    .object({ key: z.string().startsWith('private/'), name: z.string() })
    .nullable()
    .catch(null)
    .default(null),
  published: z.boolean(),
  order: z.coerce.number().int(),
})

export type Ebook = z.infer<typeof ebookSchema>

/** Versão enviada ao navegador — sem o link nem o arquivo privado de download. */
export type PublicEbook = Omit<Ebook, 'downloadUrl' | 'file'> & { hasDownload: boolean }

export const testimonialSchema = z.object({
  id: z.string(),
  author: z.string().trim().min(1, 'Informe o autor'),
  text: z.string().trim().min(1, 'Informe o depoimento'),
  areas: z.array(z.enum(testimonialAreas)).min(1, 'Escolha ao menos uma área'),
  /** Vazio = aparece em todos os ebooks (quando a área "ebooks" está marcada). */
  ebookIds: z.array(z.string()),
  published: z.boolean(),
  order: z.coerce.number().int(),
})

export type Testimonial = z.infer<typeof testimonialSchema>

export const paymentSettingsSchema = z.object({
  stripeEnabled: z.boolean(),
  hotmartEnabled: z.boolean(),
  currency: z.enum(['brl', 'usd', 'eur']),
})

export type PaymentSettings = z.infer<typeof paymentSettingsSchema>

export const defaultPaymentSettings: PaymentSettings = {
  stripeEnabled: true,
  hotmartEnabled: true,
  currency: 'brl',
}

export type CheckoutOptions = {
  hotmartUrl: string | null
  stripe: boolean
}

/** Combina a escolha do ebook, os interruptores globais e a disponibilidade da chave Stripe. */
export function resolveCheckoutOptions(
  ebook: Pick<Ebook, 'payment'>,
  settings: PaymentSettings,
  stripeConfigured: boolean,
): CheckoutOptions {
  const { provider, hotmartUrl } = ebook.payment
  const wantsHotmart = provider === 'hotmart' || provider === 'both'
  const wantsStripe = provider === 'stripe' || provider === 'both'

  return {
    hotmartUrl: wantsHotmart && settings.hotmartEnabled && hotmartUrl ? hotmartUrl : null,
    stripe: wantsStripe && settings.stripeEnabled && stripeConfigured,
  }
}

export function toPublicEbook({ downloadUrl, file, ...ebook }: Ebook): PublicEbook {
  return { ...ebook, hasDownload: Boolean(downloadUrl || file) }
}

export function sortByOrder<T extends { order: number }>(items: T[]) {
  return [...items].sort((a, b) => a.order - b.order)
}
