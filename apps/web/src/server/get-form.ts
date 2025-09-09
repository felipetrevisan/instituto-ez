'use server'

import { sanityFetch } from '@ez/web/client/fetch'
import { contactFormQuery } from '@ez/web/client/queries/contact'
import type { Form } from '@ez/web/types/form'

export async function getFormById(formId: string) {
  return sanityFetch<Form>({ query: contactFormQuery, params: { formId } })
}
