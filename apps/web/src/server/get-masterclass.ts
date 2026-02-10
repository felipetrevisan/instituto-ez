'use server'

import { sanityFetch } from '@ez/web/client/fetch'
import { masterclassQuery, masterclassQueryBySlug } from '@ez/web/client/queries/masterclass'
import type { Masterclass } from '@ez/web/types/masterclass'

export async function getMasterclasses() {
  return sanityFetch<Masterclass[]>({ query: masterclassQuery })
}

export async function getMasterclassBySlug(slug: string, locale: string) {
  const data = await sanityFetch<Masterclass>({
    query: masterclassQueryBySlug,
    params: { slug, locale },
  })

  if (data) return data

  return sanityFetch<Masterclass>({
    query: masterclassQueryBySlug,
    params: { slug, locale },
    perspective: 'previewDrafts',
  })
}
