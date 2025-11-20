'use server'

import { sanityFetch } from '@ez/web/client/fetch'
import {
  pageQuery,
  pageQueryWithSlug,
  pageSettingsQueryWithSlug,
} from '@ez/web/client/queries/page'
import type { Page } from '@ez/web/types/page'
import type { Navigation } from '@ez/web/types/site'

export async function getPageBySlug(slug: string, locale: string) {
  return sanityFetch<Page>({ query: pageQueryWithSlug, params: { slug, locale } })
}

export async function getPages() {
  return sanityFetch<Page[]>({ query: pageQuery })
}

export async function getLandingPageSettingsBySlug(slug: string, locale: string) {
  return sanityFetch<{ type: string; key: string; navigation?: Navigation }>({
    query: pageSettingsQueryWithSlug,
    params: { slug, locale },
  })
}
