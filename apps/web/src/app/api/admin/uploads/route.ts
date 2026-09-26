import { isR2Configured, presignUpload } from '@ez/web/lib/r2'
import {
  buildObjectKey,
  MAX_IMAGE_BYTES,
  MAX_PDF_BYTES,
  publicUrlForKey,
} from '@ez/web/lib/storage-keys'
import { unauthorized, verifyAdminRequest } from '@ez/web/server/admin-auth'
import { z } from 'zod'

const bodySchema = z.object({
  kind: z.enum(['image', 'pdf']),
  folder: z.string(),
  filename: z.string().min(1).max(200),
  contentType: z.string(),
  size: z.number().int().positive(),
})

/** Gera um link assinado para o painel enviar o arquivo direto ao R2. */
export async function POST(request: Request) {
  if (!(await verifyAdminRequest(request))) return unauthorized()
  if (!isR2Configured)
    return Response.json({ error: 'Armazenamento não configurado' }, { status: 503 })

  const parsed = bodySchema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) return Response.json({ error: 'Requisição inválida' }, { status: 400 })

  const { kind, folder, filename, contentType, size } = parsed.data
  const limit = kind === 'image' ? MAX_IMAGE_BYTES : MAX_PDF_BYTES
  if (size > limit) {
    return Response.json({ error: `Arquivo acima de ${limit / 1024 / 1024} MB` }, { status: 413 })
  }

  const key = buildObjectKey({ kind, folder, filename, contentType })
  if (!key)
    return Response.json({ error: 'Tipo de arquivo ou pasta não permitidos' }, { status: 400 })

  return Response.json({
    uploadUrl: await presignUpload(key),
    key,
    url: publicUrlForKey(key),
  })
}
