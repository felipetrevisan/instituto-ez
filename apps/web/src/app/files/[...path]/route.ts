import { getObject, isR2Configured } from '@ez/web/lib/r2'
import { resolvePublicFile } from '@ez/web/lib/storage-keys'

/**
 * Serve as imagens públicas do R2 pelo próprio domínio (/files/…).
 * Cada upload tem nome único, então o cache pode ser permanente.
 */
export async function GET(_request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params
  const file = resolvePublicFile(path)
  if (!file || !isR2Configured) return new Response('Not found', { status: 404 })

  const object = await getObject(file.key)
  if (!object.ok || !object.body) return new Response('Not found', { status: 404 })

  return new Response(object.body, {
    headers: {
      'Content-Type': file.contentType,
      'Cache-Control': 'public, max-age=31536000, immutable',
      // SVG pode conter scripts: nunca executar nada servido daqui.
      'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; sandbox",
      'X-Content-Type-Options': 'nosniff',
      ...(object.headers.get('content-length')
        ? { 'Content-Length': object.headers.get('content-length') as string }
        : {}),
    },
  })
}
