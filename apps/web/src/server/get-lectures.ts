'use server'

import { sanityFetch } from '@ez/web/client/fetch'
import { lectureQuery } from '@ez/web/client/queries/lectures'
import type { Lecture } from '@ez/web/types/lecture'

export async function getLectures() {
  return sanityFetch<Lecture[]>({ query: lectureQuery })
}
