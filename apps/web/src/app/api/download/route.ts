import { isR2Configured, presignDownload } from '@ez/web/lib/r2'
import { getPaidPurchase } from '@ez/web/server/purchase'

/**
 * Libera o PDF somente para sessões Stripe pagas: gera um link temporário do R2
 * (5 min) ou, na falta de arquivo enviado, redireciona para o link externo.
 */
export async function GET(request: Request) {
  const sessionId = new URL(request.url).searchParams.get('session_id') ?? ''
  const purchase = await getPaidPurchase(sessionId)
  if (!purchase) return Response.json({ error: 'Download indisponível' }, { status: 404 })

  const { file, downloadUrl } = purchase.ebook
  const location =
    file && isR2Configured ? await presignDownload(file.key, file.name) : downloadUrl || null

  if (!location) return Response.json({ error: 'Download indisponível' }, { status: 404 })

  return new Response(null, {
    status: 302,
    headers: { Location: location, 'Cache-Control': 'private, no-store' },
  })
}
