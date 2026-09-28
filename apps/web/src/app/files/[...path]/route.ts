import { isStorageConfigured, readObject } from '@ez/web/lib/storage'
import { resolvePublicFile } from '@ez/web/lib/storage-keys'

/**
 * Serve as imagens públicas do Firebase Storage pelo próprio domínio (/files/…).
 * Cada upload tem nome único, então o cache pode ser permanente.
 */
export async function GET(_request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params
  const file = resolvePublicFile(path)
  if (!file || !isStorageConfigured) return new Response('Not found', { status: 404 })

  const contents = await readObject(file.key)
  if (!contents) return new Response('Not found', { status: 404 })

  return new Response(new Uint8Array(contents), {
    headers: {
      'Content-Type': file.contentType,
      'Content-Length': String(contents.byteLength),
      'Cache-Control': 'public, max-age=31536000, immutable',
      // SVG pode conter scripts: nunca executar nada servido daqui.
      'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; sandbox",
      'X-Content-Type-Options': 'nosniff',
    },
  })
}
