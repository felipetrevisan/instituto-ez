import { seedEbooks } from '@ez/web/content/ebooks'
import { seedTestimonials } from '@ez/web/content/testimonials'
import { adminDb, isFirebaseAdminConfigured } from '@ez/web/lib/firebase/admin'
import { collections, settingsDocs } from '@ez/web/lib/firebase/collections'
import {
  defaultPaymentSettings,
  type Ebook,
  ebookSchema,
  type PaymentSettings,
  paymentSettingsSchema,
  sortByOrder,
  type Testimonial,
  type TestimonialArea,
  testimonialSchema,
} from '@ez/web/types/catalog'
import { defaultSiteSettings, parseSiteSettings, type SiteSettings } from '@ez/web/types/site'
import { cache } from 'react'
import type { z } from 'zod'

let warned = false
function useSeed() {
  if (isFirebaseAdminConfigured) return false
  if (!warned) {
    console.warn('[catalog] Firebase Admin não configurado — usando dados de seed locais.')
    warned = true
  }
  return true
}

async function readCollection<T>(name: string, schema: z.ZodType<T, z.ZodTypeDef, unknown>) {
  const snapshot = await adminDb().collection(name).get()
  const items: T[] = []
  for (const doc of snapshot.docs) {
    const parsed = schema.safeParse({ ...doc.data(), id: doc.id })
    if (parsed.success) items.push(parsed.data)
    else console.warn(`[catalog] Documento inválido ${name}/${doc.id}:`, parsed.error.issues[0])
  }
  return items
}

export async function getEbooks({ includeDrafts = false } = {}): Promise<Ebook[]> {
  const all = useSeed() ? seedEbooks : await readCollection(collections.ebooks, ebookSchema)
  return sortByOrder(includeDrafts ? all : all.filter((ebook) => ebook.published))
}

export async function getEbookBySlug(slug: string) {
  const ebooks = await getEbooks()
  return ebooks.find((ebook) => ebook.slug === slug) ?? null
}

export async function getEbookById(id: string): Promise<Ebook | null> {
  if (useSeed()) return seedEbooks.find((ebook) => ebook.id === id) ?? null
  const doc = await adminDb().collection(collections.ebooks).doc(id).get()
  if (!doc.exists) return null
  const parsed = ebookSchema.safeParse({ ...doc.data(), id: doc.id })
  return parsed.success ? parsed.data : null
}

export async function getTestimonials(
  area: TestimonialArea,
  ebookId?: string,
): Promise<Testimonial[]> {
  const all = useSeed()
    ? seedTestimonials
    : await readCollection(collections.testimonials, testimonialSchema)

  return sortByOrder(
    all.filter(
      (item) =>
        item.published &&
        item.areas.includes(area) &&
        (area !== 'ebooks' ||
          !ebookId ||
          item.ebookIds.length === 0 ||
          item.ebookIds.includes(ebookId)),
    ),
  )
}

export async function getPaymentSettings(): Promise<PaymentSettings> {
  if (useSeed()) return defaultPaymentSettings
  const doc = await adminDb().collection(collections.settings).doc(settingsDocs.payments).get()
  const parsed = paymentSettingsSchema.safeParse({ ...defaultPaymentSettings, ...doc.data() })
  return parsed.success ? parsed.data : defaultPaymentSettings
}

/** Nome, contato, logo e ícone do site — cacheado por requisição. */
export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  if (useSeed()) return defaultSiteSettings
  const doc = await adminDb().collection(collections.settings).doc(settingsDocs.site).get()
  return parseSiteSettings(doc.data())
})
