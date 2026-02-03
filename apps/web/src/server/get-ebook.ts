'use server'

import { sanityFetch } from '@ez/web/client/fetch'
import { ebookQuery, ebookQueryBySlug } from '@ez/web/client/queries/ebooks'
import type { Ebook } from '@ez/web/types/ebook'

export async function getEbooks() {
  return sanityFetch<Ebook[]>({ query: ebookQuery })
}

export async function getEbookBySlug(slug: string, locale: string) {
  return sanityFetch<Ebook>({ query: ebookQueryBySlug, params: { slug, locale } })
}
