'use client'

import { Badge, Card, CardTitle, PageHeader, Spinner } from '@ez/web/components/admin/ui'
import {
  getIntegrationStatus,
  getPaymentSettings,
  type IntegrationStatus,
  useEbooks,
  useTestimonials,
} from '@ez/web/lib/admin/data'
import type { PaymentSettings } from '@ez/web/types/catalog'
import { ArrowRight, BookOpen, CreditCard, MessageSquareQuote } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

function StatCard({
  href,
  label,
  value,
  detail,
  icon: Icon,
}: {
  href: string
  label: string
  value: number | string
  detail: string
  icon: typeof BookOpen
}) {
  return (
    <Link
      className="group rounded-2xl border border-white/[0.07] bg-[#0c1120] p-5 transition hover:border-[#f2b544]/40"
      href={href}
    >
      <div className="flex items-center justify-between">
        <span className="grid size-10 place-items-center rounded-xl bg-[#f2b544]/12 text-[#f6c566]">
          <Icon aria-hidden className="size-5" />
        </span>
        <ArrowRight
          aria-hidden
          className="size-4 text-white/30 transition group-hover:translate-x-1 group-hover:text-white"
        />
      </div>
      <p className="mt-5 font-semibold text-3xl text-white">{value}</p>
      <p className="mt-1 text-sm text-white/60">{label}</p>
      <p className="mt-3 text-white/40 text-xs">{detail}</p>
    </Link>
  )
}

export default function DashboardPage() {
  const ebooks = useEbooks()
  const testimonials = useTestimonials()
  const [status, setStatus] = useState<IntegrationStatus | null>(null)
  const [settings, setSettings] = useState<PaymentSettings | null>(null)

  useEffect(() => {
    getIntegrationStatus().then(setStatus)
    getPaymentSettings().then(setSettings)
  }, [])

  if (ebooks.loading || testimonials.loading) return <Spinner />

  const ebookList = ebooks.items ?? []
  const testimonialList = testimonials.items ?? []
  const published = ebookList.filter((ebook) => ebook.published).length

  return (
    <>
      <PageHeader
        description="Gerencie o catálogo de ebooks, os depoimentos e os pagamentos do site."
        title="Painel"
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          detail={`${published} publicado(s) · ${ebookList.length - published} rascunho(s)`}
          href="/admin/ebooks"
          icon={BookOpen}
          label="Ebooks"
          value={ebookList.length}
        />
        <StatCard
          detail={`${testimonialList.filter((item) => item.published).length} visível(is) no site`}
          href="/admin/depoimentos"
          icon={MessageSquareQuote}
          label="Depoimentos"
          value={testimonialList.length}
        />
        <StatCard
          detail={settings ? `Moeda: ${settings.currency.toUpperCase()}` : '—'}
          href="/admin/pagamentos"
          icon={CreditCard}
          label="Formas de pagamento ativas"
          value={
            settings
              ? Number(settings.stripeEnabled && status?.stripe) + Number(settings.hotmartEnabled)
              : '—'
          }
        />
      </div>

      <Card className="mt-6">
        <CardTitle
          description="Credenciais configuradas no servidor (variáveis de ambiente)."
          title="Integrações"
        />
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <li className="flex items-center justify-between rounded-xl border border-white/[0.07] px-4 py-3">
            <span className="text-sm text-white/80">Stripe</span>
            {status === null ? (
              <Badge>…</Badge>
            ) : status.stripe ? (
              <Badge tone={status.stripeMode === 'live' ? 'success' : 'warning'}>
                {status.stripeMode === 'live' ? 'Produção' : 'Modo teste'}
              </Badge>
            ) : (
              <Badge tone="danger">Sem chave</Badge>
            )}
          </li>
          <li className="flex items-center justify-between rounded-xl border border-white/[0.07] px-4 py-3">
            <span className="text-sm text-white/80">Hotmart</span>
            <Badge tone={settings?.hotmartEnabled ? 'success' : 'neutral'}>
              {settings?.hotmartEnabled ? 'Ativo' : 'Desativado'}
            </Badge>
          </li>
          <li className="flex items-center justify-between rounded-xl border border-white/[0.07] px-4 py-3">
            <span className="text-sm text-white/80">E-mail (Resend)</span>
            {status === null ? (
              <Badge>…</Badge>
            ) : (
              <Badge tone={status.email ? 'success' : 'danger'}>
                {status.email ? 'Configurado' : 'Sem chave'}
              </Badge>
            )}
          </li>
          <li className="flex items-center justify-between rounded-xl border border-white/[0.07] px-4 py-3">
            <span className="text-sm text-white/80">Arquivos (R2)</span>
            {status === null ? (
              <Badge>…</Badge>
            ) : (
              <Badge tone={status.storage ? 'success' : 'neutral'}>
                {status.storage ? 'Upload ativo' : 'Só links'}
              </Badge>
            )}
          </li>
        </ul>
      </Card>
    </>
  )
}
