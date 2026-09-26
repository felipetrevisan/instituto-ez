'use client'

import {
  Badge,
  Button,
  Card,
  CardTitle,
  Field,
  PageHeader,
  Select,
  Spinner,
  Switch,
} from '@ez/web/components/admin/ui'
import {
  getIntegrationStatus,
  getPaymentSettings,
  type IntegrationStatus,
  revalidateSite,
  savePaymentSettings,
  useEbooks,
} from '@ez/web/lib/admin/data'
import { providerLabels } from '@ez/web/lib/admin/labels'
import { type PaymentSettings, resolveCheckoutOptions } from '@ez/web/types/catalog'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function PaymentsPage() {
  const [settings, setSettings] = useState<PaymentSettings | null>(null)
  const [status, setStatus] = useState<IntegrationStatus | null>(null)
  const [saving, setSaving] = useState(false)
  const ebooks = useEbooks()

  useEffect(() => {
    getPaymentSettings().then(setSettings)
    getIntegrationStatus().then(setStatus)
  }, [])

  if (!settings) return <Spinner />

  const update = (patch: Partial<PaymentSettings>) => setSettings({ ...settings, ...patch })

  const onSave = async () => {
    setSaving(true)
    try {
      await savePaymentSettings(settings)
      await revalidateSite()
      toast.success('Configurações de pagamento salvas.')
    } catch {
      toast.error('Não foi possível salvar.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <PageHeader
        actions={
          <Button loading={saving} onClick={onSave}>
            Salvar
          </Button>
        }
        description="Ative as formas de pagamento do site. A escolha por ebook fica na aba “Venda” de cada ebook."
        title="Pagamentos"
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <div className="mb-5 flex items-center justify-between">
            <CardTitle
              description="Checkout no próprio site com cartão e demais métodos habilitados na sua conta Stripe."
              title="Stripe"
            />
            {status &&
              (status.stripe ? (
                <Badge tone={status.stripeMode === 'live' ? 'success' : 'warning'}>
                  {status.stripeMode === 'live' ? 'Chave de produção' : 'Chave de teste'}
                </Badge>
              ) : (
                <Badge tone="danger">Sem chave</Badge>
              ))}
          </div>
          <Switch
            checked={settings.stripeEnabled}
            description="Mostra o botão de pagamento com cartão nos ebooks configurados com Stripe."
            label="Ativar Stripe"
            onChange={(value) => update({ stripeEnabled: value })}
          />
          <div className="mt-5 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 text-sm text-white/60 leading-relaxed">
            <p className="font-medium text-white/85">Como configurar</p>
            <ol className="mt-2 list-decimal space-y-1 pl-5">
              <li>
                Na Stripe, acesse <em>Developers → API keys</em> e copie a <em>Secret key</em>.
              </li>
              <li>
                Defina a variável <code className="text-[#f6c566]">STRIPE_SECRET_KEY</code> no
                servidor (Vercel → Settings → Environment Variables) e faça um novo deploy.
              </li>
              <li>
                Envie o PDF de cada ebook na aba “Venda”: ele é liberado ao cliente após o
                pagamento.
              </li>
            </ol>
            <p className="mt-3 text-white/45 text-xs">
              Por segurança, a chave secreta nunca é salva no banco de dados nem exibida no painel.
            </p>
          </div>
        </Card>

        <Card>
          <CardTitle
            description="Venda pela plataforma Hotmart, que cuida do pagamento e da entrega."
            title="Hotmart"
          />
          <Switch
            checked={settings.hotmartEnabled}
            description="Mostra o botão da Hotmart nos ebooks configurados com Hotmart."
            label="Ativar Hotmart"
            onChange={(value) => update({ hotmartEnabled: value })}
          />
          <div className="mt-5 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 text-sm text-white/60 leading-relaxed">
            <p className="font-medium text-white/85">Como configurar</p>
            <ol className="mt-2 list-decimal space-y-1 pl-5">
              <li>Cadastre o ebook como produto na Hotmart.</li>
              <li>
                Em <em>Ferramentas → Links de divulgação</em>, copie o link do checkout
                (pay.hotmart.com).
              </li>
              <li>Cole o link na aba “Venda” do ebook correspondente.</li>
            </ol>
          </div>
        </Card>

        <Card>
          <CardTitle
            description="Usada nos preços do site e no checkout da Stripe."
            title="Moeda"
          />
          <Field label="Moeda">
            {(id) => (
              <Select
                id={id}
                onChange={(event) =>
                  update({ currency: event.target.value as PaymentSettings['currency'] })
                }
                value={settings.currency}
              >
                <option value="brl">Real (BRL)</option>
                <option value="usd">Dólar (USD)</option>
                <option value="eur">Euro (EUR)</option>
              </Select>
            )}
          </Field>
        </Card>

        <Card>
          <CardTitle
            description="Como cada ebook está sendo vendido agora (considerando as opções acima)."
            title="Resumo por ebook"
          />
          {ebooks.loading ? (
            <Spinner />
          ) : (
            <ul className="grid gap-2">
              {(ebooks.items ?? []).map((ebook) => {
                const options = resolveCheckoutOptions(ebook, settings, Boolean(status?.stripe))
                const active = [options.stripe && 'Stripe', options.hotmartUrl && 'Hotmart'].filter(
                  Boolean,
                )
                return (
                  <li
                    className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.07] px-4 py-3"
                    key={ebook.id}
                  >
                    <Link
                      className="min-w-0 truncate text-sm text-white hover:underline"
                      href={`/admin/ebooks/${ebook.id}`}
                    >
                      {ebook.title}
                    </Link>
                    <span className="flex shrink-0 items-center gap-2">
                      <span className="text-white/40 text-xs">
                        {providerLabels[ebook.payment.provider]}
                      </span>
                      <Badge tone={active.length ? 'success' : 'neutral'}>
                        {active.length ? active.join(' + ') : 'Contato'}
                      </Badge>
                    </span>
                  </li>
                )
              })}
            </ul>
          )}
        </Card>
      </div>
    </>
  )
}
