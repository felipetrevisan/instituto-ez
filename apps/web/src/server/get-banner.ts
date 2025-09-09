'use server'

import { sanityFetch } from '@ez/web/client/fetch'
import { bannerQuery } from '@ez/web/client/queries/banner'
import type { Banner } from '@ez/web/types/banner'

export async function getBanner() {
  return sanityFetch<Banner[]>({ query: bannerQuery })
}
