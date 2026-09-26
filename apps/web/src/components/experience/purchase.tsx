'use client'

import { useContactDialog } from '@ez/web/hooks/use-contact-dialog'
import { cn } from '@ez/web/lib/utils'
import type { CheckoutOptions, PublicEbook } from '@ez/web/types/catalog'
import { ArrowRight, CreditCard, ExternalLink, Loader2 } from 'lucide-react'
import { useLocale } from 'next-intl'
import { useState } from 'react'
import { toast } from 'sonner'

/**
 * Ações de compra conforme o pagamento configurado no painel:
 * Stripe (checkout próprio), Hotmart (link externo), ambos, ou contato.
 */
export function PurchaseButtons({
  ebook,
  checkout,
  compact = false,
}: {
  ebook: Pick<PublicEbook, 'id' | 'title' | 'cta'>
  checkout: CheckoutOptions
  compact?: boolean
}) {
  const locale = useLocale()
  const { open } = useContactDialog()
  const [loading, setLoading] = useState(false)
  const size = compact ? '!min-h-11 !px-5 text-sm' : ''

  const startStripe = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ebookId: ebook.id, locale }),
      })
      const data = (await response.json()) as { url?: string; error?: string }
      if (!response.ok || !data.url) throw new Error(data.error)
      window.location.assign(data.url)
    } catch (error) {
      toast.error(
        error instanceof Error && error.message
          ? error.message
          : 'Não foi possível iniciar o pagamento.',
      )
      setLoading(false)
    }
  }

  if (checkout.stripe) {
    return (
      <div className={cn('flex flex-wrap items-center', compact ? 'gap-2' : 'gap-3')}>
        <button
          className={cn('ez-btn', size)}
          disabled={loading}
          onClick={startStripe}
          type="button"
        >
          {loading ? (
            <Loader2 aria-hidden className="size-4 animate-spin" />
          ) : (
            <CreditCard aria-hidden className="size-4" />
          )}
          {ebook.cta}
        </button>
        {checkout.hotmartUrl && !compact && (
          <a
            className="ez-btn-ghost"
            href={checkout.hotmartUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            Comprar pela Hotmart <ExternalLink aria-hidden className="size-4" />
          </a>
        )}
      </div>
    )
  }

  if (checkout.hotmartUrl) {
    return (
      <a
        className={cn('ez-btn', size)}
        href={checkout.hotmartUrl}
        rel="noopener noreferrer"
        target="_blank"
      >
        {ebook.cta} <ExternalLink aria-hidden className="size-4" />
      </a>
    )
  }

  return (
    <button
      className={cn('ez-btn', size)}
      onClick={() => open(`${ebook.cta} — ${ebook.title}`)}
      type="button"
    >
      {ebook.cta} <ArrowRight aria-hidden className="size-4" />
    </button>
  )
}
