import type { PaymentProvider, TestimonialArea } from '@ez/web/types/catalog'

export const providerLabels: Record<PaymentProvider, string> = {
  none: 'Contato',
  hotmart: 'Hotmart',
  stripe: 'Stripe',
  both: 'Hotmart + Stripe',
}

export const areaLabels: Record<TestimonialArea, string> = {
  home: 'Home',
  immersion: 'Imersão',
  ebooks: 'Páginas de ebook',
}
