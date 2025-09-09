'use server'

import { sanityFetch } from '@ez/web/client/fetch'
import { workshopQuery } from '@ez/web/client/queries/workshop'
import type { Workshop } from '@ez/web/types/workshop'

export async function getWorkshops() {
  return sanityFetch<Workshop[]>({ query: workshopQuery })
}
