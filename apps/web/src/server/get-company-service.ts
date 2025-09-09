'use server'

import { sanityFetch } from '@ez/web/client/fetch'
import { companyServiceQuery } from '@ez/web/client/queries/company-service'
import type { CompanyService } from '@ez/web/types/company-service'

export async function getCompanyServices() {
  return sanityFetch<CompanyService[]>({ query: companyServiceQuery })
}
