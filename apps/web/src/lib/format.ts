import type { PaymentSettings } from '@ez/web/types/catalog'

const locales: Record<PaymentSettings['currency'], string> = {
  brl: 'pt-BR',
  usd: 'en-US',
  eur: 'de-DE',
}

export function formatPrice(value: number, currency: PaymentSettings['currency'] = 'brl') {
  return new Intl.NumberFormat(locales[currency], {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(value)
}
