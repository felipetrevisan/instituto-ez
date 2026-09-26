import { isStripeConfigured, stripe } from '@ez/web/lib/stripe'
import { getEbookById } from '@ez/web/server/catalog'

/** Confirma na Stripe que a sessão foi paga e devolve o ebook comprado. */
export async function getPaidPurchase(sessionId: string) {
  if (!isStripeConfigured || !sessionId.startsWith('cs_')) return null

  try {
    const session = await stripe().checkout.sessions.retrieve(sessionId)
    if (session.payment_status !== 'paid') return null
    const ebookId = session.metadata?.ebookId
    if (!ebookId) return null
    const ebook = await getEbookById(ebookId)
    if (!ebook) return null
    return { session, ebook }
  } catch {
    return null
  }
}
