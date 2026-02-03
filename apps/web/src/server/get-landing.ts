'use server'

import { sanityFetch } from '@ez/web/client/fetch'
import { landingPageQuery } from '@ez/web/client/queries/landing'
import type { Landing } from '@ez/web/types/landing'

export async function getLandingPage(slug: string, locale: string) {
  return sanityFetch<Landing>({ query: landingPageQuery, params: { slug, locale } })
}
