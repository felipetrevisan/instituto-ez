import { ThankYouPage } from '@ez/web/components/pages/thank-you'
import { getPaidPurchase } from '@ez/web/server/purchase'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Obrigado pela compra',
  robots: { index: false, follow: false },
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ session_id?: string }>
}) {
  const [{ slug }, { session_id: sessionId = '' }] = await Promise.all([params, searchParams])
  const purchase = await getPaidPurchase(sessionId)
  const valid = purchase?.ebook.slug === slug

  return (
    <ThankYouPage
      customerEmail={valid ? (purchase.session.customer_details?.email ?? null) : null}
      downloadUrl={
        valid && (purchase.ebook.file || purchase.ebook.downloadUrl)
          ? `/api/download?session_id=${encodeURIComponent(sessionId)}`
          : null
      }
      ebook={
        valid
          ? {
              title: purchase.ebook.title,
              cover: purchase.ebook.cover,
              accent: purchase.ebook.accent,
              accentSecondary: purchase.ebook.accentSecondary,
            }
          : null
      }
    />
  )
}
