'use client'

import { env } from '@ez/web/config/env'
import { firebase } from '@ez/web/lib/firebase/client'
import {
  buildObjectKey,
  imageTypes,
  MAX_IMAGE_BYTES,
  MAX_PDF_BYTES,
  pdfTypes,
  publicUrlForKey,
  type UploadKind,
} from '@ez/web/lib/storage-keys'
import { ref, uploadBytesResumable } from 'firebase/storage'
import { useEffect, useState } from 'react'
import { getIntegrationStatus } from './data'

let storageStatus: Promise<boolean> | null = null

/** O upload só aparece quando o Storage está configurado no servidor e no navegador. */
export function useStorageEnabled() {
  const [enabled, setEnabled] = useState(false)
  useEffect(() => {
    if (!env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET) return
    storageStatus ??= getIntegrationStatus().then((status) => Boolean(status?.storage))
    storageStatus.then(setEnabled)
  }, [])
  return enabled
}

export const acceptByKind: Record<UploadKind, string> = {
  image: Object.keys(imageTypes).join(','),
  pdf: Object.keys(pdfTypes).join(','),
}

export function validateFile(file: File, kind: UploadKind) {
  const allowed = kind === 'image' ? imageTypes : pdfTypes
  if (!(file.type in allowed)) {
    return kind === 'image' ? 'Use PNG, JPG, WebP, GIF, AVIF, SVG ou ICO.' : 'Envie um arquivo PDF.'
  }
  const limit = kind === 'image' ? MAX_IMAGE_BYTES : MAX_PDF_BYTES
  if (file.size > limit) return `O arquivo excede ${limit / 1024 / 1024} MB.`
  return null
}

/**
 * Envia um arquivo ao Firebase Storage. As regras de segurança exigem login de
 * admin, o tipo e o tamanho corretos; o progresso é reportado de 0 a 1.
 */
export async function uploadToStorage({
  kind,
  folder,
  file,
  onProgress,
}: {
  kind: UploadKind
  folder: string
  file: File
  onProgress?: (progress: number) => void
}): Promise<{ key: string; url: string | null }> {
  const key = buildObjectKey({ kind, folder, filename: file.name, contentType: file.type })
  if (!key) throw new Error('Tipo de arquivo ou pasta não permitidos.')

  const task = uploadBytesResumable(ref(firebase().storage, key), file, { contentType: file.type })

  await new Promise<void>((resolve, reject) => {
    task.on(
      'state_changed',
      (snapshot) => onProgress?.(snapshot.bytesTransferred / snapshot.totalBytes),
      (error) =>
        reject(
          new Error(
            error.code === 'storage/unauthorized'
              ? 'Envio recusado pelas regras do Storage (sessão de admin, tipo ou tamanho).'
              : 'Falha no envio do arquivo.',
          ),
        ),
      () => resolve(),
    )
  })

  return { key, url: publicUrlForKey(key) }
}
