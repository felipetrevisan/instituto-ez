import { isStorageConfigured, signedDownloadUrl } from '@ez/web/lib/storage'
import { getPaidPurchase } from '@ez/web/server/purchase'

/**
 * Libera o PDF somente para sessões Stripe pagas: gera um link temporário do
 * Storage (5 min) ou, na falta de arquivo enviado, redireciona para o link externo.
 */
export async function GET(request: Request) {
  const sessionId = new URL(request.url).searchParams.get('session_id') ?? ''
  const purchase = await getPaidPurchase(sessionId)
  if (!purchase) return Response.json({ error: 'Download indisponível' }, { status: 404 })

  const { file, downloadUrl } = purchase.ebook
  const location =
    file && isStorageConfigured ? await signedDownloadUrl(file.key, file.name) : downloadUrl || null

  if (!location) return Response.json({ error: 'Download indisponível' }, { status: 404 })

  return new Response(null, {
    status: 302,
    headers: { Location: location, 'Cache-Control': 'private, no-store' },
  })
}
