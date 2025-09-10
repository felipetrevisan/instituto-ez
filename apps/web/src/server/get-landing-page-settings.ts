'use server'

import { sanityFetch } from '@ez/web/client/fetch'
import { landingPageSettingsQuery } from '@ez/web/client/queries/landing-page'
import type { LandingPageSetting } from '../types/landing-page-setting'

export async function getLandingPageSettings() {
  return sanityFetch<LandingPageSetting>({ query: landingPageSettingsQuery })
}
