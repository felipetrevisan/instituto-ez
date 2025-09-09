'use server'

import { sanityFetch } from '@ez/web/client/fetch'
import { servicesQuery } from '@ez/web/client/queries/services'
import type { Service } from '@ez/web/types/service'

export async function getServices() {
  return sanityFetch<Service[]>({ query: servicesQuery })
}
