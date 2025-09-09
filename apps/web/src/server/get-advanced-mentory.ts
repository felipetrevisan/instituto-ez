'use server'

import { sanityFetch } from '@ez/web/client/fetch'
import { advancedMentoryQuery } from '@ez/web/client/queries/advanced-mentory'
import type { AdvancedMentory } from '@ez/web/types/advanced-mentory'

export async function getAdvancedMentory() {
  return sanityFetch<AdvancedMentory>({ query: advancedMentoryQuery })
}
