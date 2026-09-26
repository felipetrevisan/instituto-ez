// Importa o conteúdo inicial (ebook e depoimentos do site original) para o Firestore.
// Uso: bun run firebase:seed [--force]   (--force sobrescreve documentos existentes)
import { seedEbooks } from '../src/content/ebooks'
import { seedTestimonials } from '../src/content/testimonials'
import { collections, settingsDocs } from '../src/lib/firebase/collections'
import { defaultPaymentSettings } from '../src/types/catalog'
import { defaultSiteSettings } from '../src/types/site'
import { db, target } from './firebase-admin'

const force = process.argv.includes('--force')
let written = 0
let skipped = 0

async function upsert(collection: string, id: string, data: object) {
  const ref = db.collection(collection).doc(id)
  if (!force && (await ref.get()).exists) {
    skipped++
    return
  }
  await ref.set({ ...data, updatedAt: new Date() })
  written++
}

for (const { id, ...ebook } of seedEbooks) await upsert(collections.ebooks, id, ebook)
for (const { id, ...testimonial } of seedTestimonials)
  await upsert(collections.testimonials, id, testimonial)
await upsert(collections.settings, settingsDocs.payments, defaultPaymentSettings)
await upsert(collections.settings, settingsDocs.site, defaultSiteSettings)

console.log(`✔ Seed concluído em ${target}: ${written} gravado(s), ${skipped} já existente(s).`)
if (skipped && !force) console.log('  Use --force para sobrescrever os existentes.')
process.exit(0)
