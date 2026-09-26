import { routing } from '@ez/web/i18n/routing'
import { isStripeConfigured, stripe, toMinorUnits } from '@ez/web/lib/stripe'
import { getEbookById, getPaymentSettings } from '@ez/web/server/catalog'
import { resolveCheckoutOptions } from '@ez/web/types/catalog'
import { getLocalizedLink } from '@ez/web/utils/get-localized-link'
import { z } from 'zod'

const bodySchema = z.object({
  ebookId: z.string().min(1),
  locale: z.enum(routing.locales).default(routing.defaultLocale),
})

/** Cria uma sessão de Checkout da Stripe para o ebook — o preço vem sempre do servidor. */
export async function POST(request: Request) {
  const parsed = bodySchema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) return Response.json({ error: 'Requisição inválida' }, { status: 400 })

  const { ebookId, locale } = parsed.data
  const [ebook, settings] = await Promise.all([getEbookById(ebookId), getPaymentSettings()])
  if (!ebook?.published) return Response.json({ error: 'Ebook não encontrado' }, { status: 404 })

  const options = resolveCheckoutOptions(ebook, settings, isStripeConfigured)
  if (!options.stripe) {
    return Response.json(
      { error: 'Pagamento com cartão indisponível para este ebook' },
      { status: 409 },
    )
  }

  const origin = new URL(request.url).origin
  const pagePath = getLocalizedLink(locale, `/ebooks/${ebook.slug}`)
  const image = ebook.cover.startsWith('http') ? ebook.cover : `${origin}${ebook.cover}`

  const session = await stripe().checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: settings.currency,
          unit_amount: toMinorUnits(ebook.price.regular),
          product_data: {
            name: ebook.title,
            images: origin.startsWith('https') ? [image] : undefined,
          },
        },
      },
    ],
    metadata: { ebookId: ebook.id },
    success_url: `${origin}${pagePath}/obrigado?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}${pagePath}`,
  })

  if (!session.url) return Response.json({ error: 'Falha ao iniciar o checkout' }, { status: 502 })
  return Response.json({ url: session.url })
}
