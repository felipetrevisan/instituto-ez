import { env } from '@ez/web/config/env'
import Stripe from 'stripe'

export const isStripeConfigured = Boolean(env.STRIPE_SECRET_KEY)

let client: Stripe | null = null

export function stripe() {
  if (!env.STRIPE_SECRET_KEY) throw new Error('Stripe não configurado: defina STRIPE_SECRET_KEY.')
  client ??= new Stripe(env.STRIPE_SECRET_KEY)
  return client
}

/** Converte o preço (ex.: 49.9) para a menor unidade da moeda (4990). */
export function toMinorUnits(value: number) {
  return Math.round(value * 100)
}
