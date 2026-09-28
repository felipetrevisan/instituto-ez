// Move para o Firebase Storage as imagens que o banco ainda aponta em /public
// (/assets/…, /favicon.ico) e troca as referências por /files/….
//
// Uso: bun run storage:migrate            (só mostra o plano)
//      bun run storage:migrate --apply    (envia os arquivos e atualiza o Firestore)
//
// É idempotente: o que já está em /files/… é ignorado.
import { existsSync, readFileSync } from 'node:fs'
import { basename, extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { collections, settingsDocs } from '../src/lib/firebase/collections'
import { buildObjectKey, contentTypeByExtension, publicUrlForKey } from '../src/lib/storage-keys'
import { bucket, db, target } from './firebase-admin'

const apply = process.argv.includes('--apply')
const publicDir = fileURLToPath(new URL('../public', import.meta.url))
const uploaded = new Map<string, string>()
let planned = 0

/** Envia um arquivo local de /public e devolve a nova URL (/files/…), ou null se não se aplicar. */
async function migrate(value: unknown, folder: string): Promise<string | null> {
  if (typeof value !== 'string' || !value.startsWith('/') || value.startsWith('/files/'))
    return null
  const localPath = join(publicDir, value)
  if (!existsSync(localPath)) {
    console.warn(`  ! arquivo não encontrado em /public: ${value}`)
    return null
  }

  const extension = extname(value).slice(1).toLowerCase()
  const contentType = contentTypeByExtension[extension]
  if (!contentType) {
    console.warn(`  ! tipo não suportado: ${value}`)
    return null
  }

  const cacheKey = `${folder}|${value}`
  const cached = uploaded.get(cacheKey)
  if (cached) return cached

  const key = buildObjectKey({ kind: 'image', folder, filename: basename(value), contentType })
  const url = key && publicUrlForKey(key)
  if (!key || !url) return null

  planned++
  console.log(`  ${value}  →  ${url}`)
  if (apply) {
    await bucket()
      .file(key)
      .save(readFileSync(localPath), {
        contentType,
        metadata: { cacheControl: 'public, max-age=31536000, immutable' },
        resumable: false,
      })
  }
  uploaded.set(cacheKey, url)
  return url
}

console.log(`${apply ? 'Migrando' : 'Plano (simulação)'} — ${target}\n`)

const ebooks = await db.collection(collections.ebooks).get()
for (const doc of ebooks.docs) {
  const data = doc.data()
  const folder = `ebooks/${doc.id}`
  console.log(`ebook ${doc.id} (${data.title ?? 'sem título'})`)

  const updates: Record<string, unknown> = {}
  const cover = await migrate(data.cover, folder)
  if (cover) updates.cover = cover
  const heroImage = await migrate(data.heroImage, folder)
  if (heroImage) updates.heroImage = heroImage
  const photo = await migrate(data.author?.photo, folder)
  if (photo) updates['author.photo'] = photo

  if (Array.isArray(data.pages)) {
    let changed = false
    const pages: unknown[] = []
    for (const page of data.pages) {
      const next = await migrate(page, folder)
      changed ||= Boolean(next)
      pages.push(next ?? page)
    }
    if (changed) updates.pages = pages
  }

  if (apply && Object.keys(updates).length)
    await doc.ref.update({ ...updates, updatedAt: new Date() })
}

const siteRef = db.collection(collections.settings).doc(settingsDocs.site)
const site = (await siteRef.get()).data()
if (site) {
  console.log('configurações do site')
  const updates: Record<string, unknown> = {}
  const logo = await migrate(site.logo, 'site')
  if (logo) updates.logo = logo
  const favicon = await migrate(site.favicon, 'site')
  if (favicon) updates.favicon = favicon
  if (apply && Object.keys(updates).length)
    await siteRef.update({ ...updates, updatedAt: new Date() })
}

console.log(
  `\n${planned} arquivo(s) ${apply ? 'enviados e referências atualizadas' : 'seriam enviados'}.`,
)
if (!apply && planned) console.log('Rode novamente com --apply para executar.')
process.exit(0)
