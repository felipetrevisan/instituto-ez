import { env } from '@ez/web/config/env'
import { isStorageConfigured } from '@ez/web/lib/storage'
import { isStripeConfigured } from '@ez/web/lib/stripe'
import { unauthorized, verifyAdminRequest } from '@ez/web/server/admin-auth'

/** Informa ao painel quais integrações têm credenciais no servidor (sem expor valores). */
export async function GET(request: Request) {
  if (!(await verifyAdminRequest(request))) return unauthorized()

  return Response.json({
    stripe: isStripeConfigured,
    stripeMode: env.STRIPE_SECRET_KEY?.startsWith('sk_live_') ? 'live' : 'test',
    email: Boolean(env.RESEND_API_KEY),
    storage: isStorageConfigured,
  })
}
