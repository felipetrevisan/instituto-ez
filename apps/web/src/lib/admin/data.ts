'use client'

import { firebase } from '@ez/web/lib/firebase/client'
import { collections, settingsDocs } from '@ez/web/lib/firebase/collections'
import {
  defaultPaymentSettings,
  type Ebook,
  ebookSchema,
  type PaymentSettings,
  paymentSettingsSchema,
  sortByOrder,
  type Testimonial,
  testimonialSchema,
} from '@ez/web/types/catalog'
import { parseSiteSettings, type SiteSettings } from '@ez/web/types/site'
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import type { z } from 'zod'

/** Remove o id (vira o ID do documento) e marca a data de atualização. */
function toDoc<T extends { id: string }>({ id: _id, ...data }: T) {
  return { ...data, updatedAt: serverTimestamp() }
}

function parseDocs<T>(
  schema: z.ZodType<T, z.ZodTypeDef, unknown>,
  docs: { id: string; data: () => unknown }[],
) {
  const items: T[] = []
  for (const item of docs) {
    const parsed = schema.safeParse({ ...(item.data() as object), id: item.id })
    if (parsed.success) items.push(parsed.data)
  }
  return items
}

/** Assina uma coleção em tempo real e devolve os itens válidos ordenados. */
export function useCollection<T extends { order: number }>(
  name: string,
  schema: z.ZodType<T, z.ZodTypeDef, unknown>,
) {
  const [items, setItems] = useState<T[] | null>(null)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const { db } = firebase()
    return onSnapshot(
      collection(db, name),
      (snapshot) => setItems(sortByOrder(parseDocs(schema, snapshot.docs))),
      (err) => setError(err),
    )
  }, [name, schema])

  return { items, error, loading: items === null && !error }
}

export const useEbooks = () => useCollection(collections.ebooks, ebookSchema)
export const useTestimonials = () => useCollection(collections.testimonials, testimonialSchema)

export function newEbookId() {
  return doc(collection(firebase().db, collections.ebooks)).id
}

export function newTestimonialId() {
  return doc(collection(firebase().db, collections.testimonials)).id
}

export async function getEbook(id: string) {
  const snapshot = await getDoc(doc(firebase().db, collections.ebooks, id))
  if (!snapshot.exists()) return null
  const parsed = ebookSchema.safeParse({ ...snapshot.data(), id: snapshot.id })
  return parsed.success ? parsed.data : null
}

export async function isSlugTaken(slug: string, exceptId: string) {
  const snapshot = await getDocs(
    query(collection(firebase().db, collections.ebooks), where('slug', '==', slug)),
  )
  return snapshot.docs.some((item) => item.id !== exceptId)
}

export async function saveEbook(ebook: Ebook) {
  await setDoc(doc(firebase().db, collections.ebooks, ebook.id), toDoc(ebook))
}

export async function deleteEbook(id: string) {
  await deleteDoc(doc(firebase().db, collections.ebooks, id))
}

export async function saveTestimonial(testimonial: Testimonial) {
  await setDoc(doc(firebase().db, collections.testimonials, testimonial.id), toDoc(testimonial))
}

export async function deleteTestimonial(id: string) {
  await deleteDoc(doc(firebase().db, collections.testimonials, id))
}

export async function getPaymentSettings(): Promise<PaymentSettings> {
  const snapshot = await getDoc(doc(firebase().db, collections.settings, settingsDocs.payments))
  const parsed = paymentSettingsSchema.safeParse({ ...defaultPaymentSettings, ...snapshot.data() })
  return parsed.success ? parsed.data : defaultPaymentSettings
}

export async function savePaymentSettings(settings: PaymentSettings) {
  await setDoc(doc(firebase().db, collections.settings, settingsDocs.payments), {
    ...settings,
    updatedAt: serverTimestamp(),
  })
}

export async function getSiteSettingsDoc(): Promise<SiteSettings> {
  const snapshot = await getDoc(doc(firebase().db, collections.settings, settingsDocs.site))
  return parseSiteSettings(snapshot.data())
}

export async function saveSiteSettings(settings: SiteSettings) {
  await setDoc(doc(firebase().db, collections.settings, settingsDocs.site), {
    ...settings,
    updatedAt: serverTimestamp(),
  })
}

async function authorizedFetch(input: string, init?: RequestInit) {
  const token = await firebase().auth.currentUser?.getIdToken()
  return fetch(input, { ...init, headers: { ...init?.headers, Authorization: `Bearer ${token}` } })
}

/** Pede ao servidor para regenerar as páginas estáticas após uma alteração. */
export async function revalidateSite() {
  const response = await authorizedFetch('/api/admin/revalidate', { method: 'POST' })
  return response.ok
}

export type IntegrationStatus = {
  stripe: boolean
  stripeMode: 'live' | 'test'
  email: boolean
  storage: boolean
}

export async function getIntegrationStatus(): Promise<IntegrationStatus | null> {
  const response = await authorizedFetch('/api/admin/status')
  return response.ok ? response.json() : null
}
