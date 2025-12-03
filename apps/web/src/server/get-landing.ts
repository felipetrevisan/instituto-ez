'use server'

import { sanityFetch } from '@ez/web/client/fetch'
import { landingPageQuery } from '@ez/web/client/queries/landing'
import { pageQuery } from '@ez/web/client/queries/page'
import type { Landing } from '@ez/web/types/landing'
import type { Page } from '@ez/web/types/page'

export async function getLandingPage(slug: string, locale: string) {
  return sanityFetch<Landing>({ query: landingPageQuery, params: { slug, locale } })
}

export async function getPages() {
  return sanityFetch<Page[]>({ query: pageQuery })
}
