'use server'

import { sanityFetch } from '@ez/web/client/fetch'
import { pageQuery, pageQueryWithSlug } from '@ez/web/client/queries/page'
import type { Page } from '@ez/web/types/page'

export async function getPageBySlug(slug: string, locale: string) {
  return sanityFetch<Page>({ query: pageQueryWithSlug, params: { slug, locale } })
}

export async function getPages() {
  return sanityFetch<Page[]>({ query: pageQuery })
}
