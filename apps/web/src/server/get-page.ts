'use server'

import { sanityFetch } from '@ez/web/client/fetch'
import { pageQuery, pageQueryWithSlug } from '@ez/web/client/queries'
import type { Page } from '@ez/web/types/page'

export async function getPageBySlug(slug: string) {
  return sanityFetch<Page>({ query: pageQueryWithSlug, params: { slug } })
}

export async function getPages() {
  return sanityFetch<Page[]>({ query: pageQuery })
}
