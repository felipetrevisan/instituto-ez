'use server'

import { sanityFetch } from '@ez/web/client/fetch'
import { immersionQuery } from '@ez/web/client/queries/immersion'
import type { Immersion } from '@ez/web/types/immersion'

export async function getImmersion() {
  return sanityFetch<Immersion>({ query: immersionQuery })
}
