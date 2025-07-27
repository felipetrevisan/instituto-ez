'use server'

import { sanityFetch } from '@ez/web/client/fetch'
import { testimonialsQuery } from '@ez/web/client/queries'
import type { Testimonial } from '@ez/web/types/testimonial'

export async function getTestimonials(category: string) {
  return sanityFetch<Testimonial[]>({
    query: testimonialsQuery,
    params: { category },
  })
}
