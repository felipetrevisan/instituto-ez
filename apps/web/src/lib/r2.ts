import { env } from '@ez/web/config/env'
import { AwsClient } from 'aws4fetch'

export const isR2Configured = Boolean(
  env.R2_ACCOUNT_ID && env.R2_ACCESS_KEY_ID && env.R2_SECRET_ACCESS_KEY && env.R2_BUCKET,
)

let client: AwsClient | null = null

function r2() {
  if (!isR2Configured) throw new Error('R2 não configurado: defina as variáveis R2_*.')
  client ??= new AwsClient({
    accessKeyId: env.R2_ACCESS_KEY_ID as string,
    secretAccessKey: env.R2_SECRET_ACCESS_KEY as string,
    service: 's3',
    region: 'auto',
  })
  return client
}

function objectUrl(key: string) {
  const path = key.split('/').map(encodeURIComponent).join('/')
  return `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${env.R2_BUCKET}/${path}`
}

/** Link assinado para o navegador enviar o arquivo direto ao R2 (PUT). */
export async function presignUpload(key: string, expiresInSeconds = 600) {
  const url = new URL(objectUrl(key))
  url.searchParams.set('X-Amz-Expires', String(expiresInSeconds))
  const signed = await r2().sign(new Request(url, { method: 'PUT' }), { aws: { signQuery: true } })
  return signed.url
}

/** Link temporário de download (GET), com nome de arquivo sugerido. */
export async function presignDownload(key: string, filename: string, expiresInSeconds = 300) {
  const url = new URL(objectUrl(key))
  url.searchParams.set('X-Amz-Expires', String(expiresInSeconds))
  url.searchParams.set(
    'response-content-disposition',
    `attachment; filename*=UTF-8''${encodeURIComponent(filename)}`,
  )
  const signed = await r2().sign(new Request(url, { method: 'GET' }), { aws: { signQuery: true } })
  return signed.url
}

/** Busca um objeto (usado pela rota /files para servir imagens públicas). */
export function getObject(key: string) {
  return r2().fetch(objectUrl(key))
}

export async function objectExists(key: string) {
  const response = await r2().fetch(objectUrl(key), { method: 'HEAD' })
  return response.ok
}
