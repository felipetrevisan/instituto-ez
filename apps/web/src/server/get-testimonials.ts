'use server'

import { sanityFetch } from '@ez/web/client/fetch'
import {
  testimonialsByEbookIdQuery,
  testimonialsByEbookQuery,
  testimonialsByHomeQuery,
  testimonialsByMasterclassQuery,
  testimonialsQuery,
} from '@ez/web/client/queries/testimonial'
import type { Testimonial } from '@ez/web/types/testimonial'

export async function getTestimonials(category: string) {
  return sanityFetch<Testimonial[]>({
    query: testimonialsQuery,
    params: { category },
  })
}

export async function getTestimonialsByEbook(locale: string, category: string, ebookSlug: string) {
  return sanityFetch<Testimonial[]>({
    query: testimonialsByEbookQuery,
    params: { locale, category, slug: ebookSlug },
  })
}

function buildIdParams(id: string, key: 'masterclass' | 'ebook') {
  const cleanId = id.replace(/^drafts\./, '')
  const draftId = cleanId.startsWith('drafts.') ? cleanId : `drafts.${cleanId}`
  const prefixedId = cleanId.startsWith(`${key}.`) ? cleanId : `${key}.${cleanId}`
  const prefixedDraftId = `drafts.${prefixedId}`

  return {
    [`${key}Id`]: id,
    [`${key}CleanId`]: cleanId,
    [`${key}DraftId`]: draftId,
    [`${key}PrefixedId`]: prefixedId,
    [`${key}PrefixedDraftId`]: prefixedDraftId,
  }
}

export async function getTestimonialsByHome(limit = 6) {
  return sanityFetch<Testimonial[]>({
    query: testimonialsByHomeQuery,
    params: { limit },
  })
}

export async function getTestimonialsByMasterclass(masterclassId: string) {
  const params = buildIdParams(masterclassId, 'masterclass')
  return sanityFetch<Testimonial[]>({
    query: testimonialsByMasterclassQuery,
    params,
  })
}

export async function getTestimonialsByEbookId(ebookId: string) {
  const params = buildIdParams(ebookId, 'ebook')
  return sanityFetch<Testimonial[]>({
    query: testimonialsByEbookIdQuery,
    params,
  })
}
