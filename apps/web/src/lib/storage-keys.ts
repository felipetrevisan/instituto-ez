// Regras de nomes/caminhos dos arquivos no R2 — compartilhadas entre painel e servidor.
//
// Estrutura do bucket:
//   public/ebooks/<id>/…   capas e páginas de amostra   → servidas em /files/ebooks/<id>/…
//   public/site/…          logo e ícone                 → servidas em /files/site/…
//   private/ebooks/<id>/…  PDFs vendidos                → só por link temporário após pagamento

export const FILES_ROUTE = '/files'

export const imageTypes = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/avif': 'avif',
  'image/svg+xml': 'svg',
  'image/x-icon': 'ico',
  'image/vnd.microsoft.icon': 'ico',
} as const

export const pdfTypes = { 'application/pdf': 'pdf' } as const

export const MAX_IMAGE_BYTES = 15 * 1024 * 1024
export const MAX_PDF_BYTES = 100 * 1024 * 1024

/** Tipo servido por extensão — nunca confiamos no Content-Type gravado no objeto. */
export const contentTypeByExtension: Record<string, string> = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  webp: 'image/webp',
  gif: 'image/gif',
  avif: 'image/avif',
  svg: 'image/svg+xml',
  ico: 'image/x-icon',
}

export type UploadKind = 'image' | 'pdf'

const folderPattern = /^(site|ebooks\/[A-Za-z0-9_-]{1,64})$/

export function isValidFolder(folder: string) {
  return folderPattern.test(folder)
}

/** Nome de arquivo seguro: sem acentos, espaços ou caracteres especiais. */
export function safeBaseName(filename: string) {
  const withoutExtension = filename.replace(/\.[^.]*$/, '')
  const slug = withoutExtension
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
  return slug || 'arquivo'
}

/**
 * Monta a chave do objeto. O timestamp torna cada envio único, o que permite
 * cache permanente das imagens.
 */
export function buildObjectKey({
  kind,
  folder,
  filename,
  contentType,
  now = Date.now(),
}: {
  kind: UploadKind
  folder: string
  filename: string
  contentType: string
  now?: number
}) {
  if (!isValidFolder(folder)) return null
  const extension =
    kind === 'image'
      ? imageTypes[contentType as keyof typeof imageTypes]
      : pdfTypes[contentType as keyof typeof pdfTypes]
  if (!extension) return null
  if (kind === 'pdf' && !folder.startsWith('ebooks/')) return null

  const scope = kind === 'image' ? 'public' : 'private'
  return `${scope}/${folder}/${now}-${safeBaseName(filename)}.${extension}`
}

/** "public/site/1-logo.png" → "/files/site/1-logo.png" */
export function publicUrlForKey(key: string) {
  return key.startsWith('public/') ? `${FILES_ROUTE}/${key.slice('public/'.length)}` : null
}

/**
 * Valida o caminho pedido em /files/… e devolve a chave no bucket (sempre dentro
 * de public/) e o Content-Type. Qualquer coisa fora do padrão é recusada.
 */
export function resolvePublicFile(segments: string[]) {
  if (segments.length < 2 || segments.length > 3) return null
  if (!segments.every((segment) => /^[A-Za-z0-9._-]+$/.test(segment) && !segment.startsWith('.'))) {
    return null
  }
  const path = segments.join('/')
  const folder = segments.slice(0, -1).join('/')
  if (!isValidFolder(folder)) return null

  const extension = path.split('.').pop()?.toLowerCase() ?? ''
  const contentType = contentTypeByExtension[extension]
  if (!contentType) return null

  return { key: `public/${path}`, contentType }
}
