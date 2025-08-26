'use server'

import { sanityFetch } from '@ez/web/client/fetch'
import { landingPageSettingsQuery } from '@ez/web/client/queries'
import type { Site } from '@ez/web/types/site'

export async function getLandingPageSettings() {
  return sanityFetch<Site>({ query: landingPageSettingsQuery })
}
