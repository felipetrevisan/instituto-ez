import { env } from '@ez/web/config/env'
import { adminBucket, isFirebaseAdminConfigured } from '@ez/web/lib/firebase/admin'

export const isStorageConfigured = Boolean(
  isFirebaseAdminConfigured && env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
)

/** Lê um objeto do Storage (null se não existir). */
export async function readObject(key: string) {
  try {
    const [contents] = await adminBucket().file(key).download()
    return contents
  } catch (error) {
    if ((error as { code?: number }).code === 404) return null
    throw error
  }
}

/** Link temporário de download (padrão: 5 minutos), com nome de arquivo sugerido. */
export async function signedDownloadUrl(key: string, filename: string, expiresInSeconds = 300) {
  const [url] = await adminBucket()
    .file(key)
    .getSignedUrl({
      version: 'v4',
      action: 'read',
      expires: Date.now() + expiresInSeconds * 1000,
      responseDisposition: `attachment; filename*=UTF-8''${encodeURIComponent(filename)}`,
    })
  return url
}
