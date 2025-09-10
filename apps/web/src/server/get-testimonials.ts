'use server'

import { sanityFetch } from '@ez/web/client/fetch'
import { testimonialsByEbookQuery, testimonialsQuery } from '@ez/web/client/queries/testimonial'
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
