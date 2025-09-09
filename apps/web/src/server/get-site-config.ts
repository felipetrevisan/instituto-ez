'use server'

import { sanityFetch } from '@ez/web/client/fetch'
import { siteConfigQuery } from '@ez/web/client/queries/site'
import type { Site } from '@ez/web/types/site'

export async function getSiteConfig() {
  return sanityFetch<Site>({ query: siteConfigQuery })
}
