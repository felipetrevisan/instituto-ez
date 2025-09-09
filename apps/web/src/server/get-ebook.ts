'use server'

import { sanityFetch } from '@ez/web/client/fetch'
import {
  ebookQuery,
  ebookQueryBySlug,
  ebooksCollectionQuery,
  ebooksCollectionQueryByCollection,
} from '@ez/web/client/queries/ebooks'
import type { Ebook, EbookCollection } from '@ez/web/types/ebook'

export async function getEbooks() {
  return sanityFetch<Ebook[]>({ query: ebookQuery })
}

export async function getEbookBySlug(slug: string, locale: string) {
  return sanityFetch<Ebook>({ query: ebookQueryBySlug, params: { slug, locale } })
}

export async function getEbooksCollection() {
  return sanityFetch<EbookCollection[]>({
    query: ebooksCollectionQuery,
  })
}

export async function getEbooksByCollection(collectionId: string) {
  return sanityFetch<EbookCollection>({
    query: ebooksCollectionQueryByCollection,
    params: { id: collectionId },
  })
}
