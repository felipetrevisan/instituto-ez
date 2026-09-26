'use client'

import { firebase } from '@ez/web/lib/firebase/client'
import {
  imageTypes,
  MAX_IMAGE_BYTES,
  MAX_PDF_BYTES,
  pdfTypes,
  type UploadKind,
} from '@ez/web/lib/storage-keys'
import { useEffect, useState } from 'react'
import { getIntegrationStatus } from './data'

let storageStatus: Promise<boolean> | null = null

/** O upload só aparece quando o servidor tem o R2 configurado. */
export function useStorageEnabled() {
  const [enabled, setEnabled] = useState(false)
  useEffect(() => {
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
 * Envia um arquivo ao R2: pede ao servidor um link assinado (só admins) e faz o
 * PUT direto do navegador, reportando o progresso (0–1).
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
  const token = await firebase().auth.currentUser?.getIdToken()
  const response = await fetch('/api/admin/uploads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      kind,
      folder,
      filename: file.name,
      contentType: file.type,
      size: file.size,
    }),
  })
  const data = (await response.json()) as {
    uploadUrl?: string
    key?: string
    url?: string | null
    error?: string
  }
  if (!response.ok || !data.uploadUrl || !data.key)
    throw new Error(data.error ?? 'Falha ao preparar o envio.')

  await new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('PUT', data.uploadUrl as string)
    xhr.setRequestHeader('Content-Type', file.type)
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) onProgress?.(event.loaded / event.total)
    }
    xhr.onload = () =>
      xhr.status >= 200 && xhr.status < 300
        ? resolve()
        : reject(new Error(`Envio recusado (${xhr.status}).`))
    xhr.onerror = () => reject(new Error('Falha de conexão durante o envio.'))
    xhr.send(file)
  })

  return { key: data.key, url: data.url ?? null }
}
