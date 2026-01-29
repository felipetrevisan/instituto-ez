'use server'

import { sanityFetch } from '@ez/web/client/fetch'
import { webinarQuery, webinarQueryBySlug } from '@ez/web/client/queries/webinar'
import type { Webinar } from '@ez/web/types/webinar'

export async function getWebinars() {
  return sanityFetch<Webinar[]>({ query: webinarQuery })
}

export async function getWebinarBySlug(slug: string, locale: string) {
  return sanityFetch<Webinar>({ query: webinarQueryBySlug, params: { slug, locale } })
}
