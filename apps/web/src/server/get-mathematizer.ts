'use server'

import { sanityFetch } from '@ez/web/client/fetch'
import { mathematizerQuery } from '@ez/web/client/queries'
import type { Mathematizer } from '@ez/web/types/mathematizer'

export async function getMathematizers() {
  return sanityFetch<Mathematizer[]>({ query: mathematizerQuery })
}
