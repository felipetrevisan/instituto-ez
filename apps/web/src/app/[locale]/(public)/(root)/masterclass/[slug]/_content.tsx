'use client'

import type { Masterclass } from '@ez/web/types/masterclass'
import { Author } from './_author'
import { Final } from './_final'
import { Hero } from './_hero'
import { Offer } from './_offer'
import { Pillars } from './_pillars'
import { Testimonials } from './_testimonials'
import { Why } from './_why'

export function Content({ data }: { data: Masterclass }) {
  return (
    <>
      {data.hero && <Hero data={data.hero} />}
      {data.pillars && <Pillars data={data.pillars} />}
      {data.id && <Testimonials data={data.testimonials ?? {}} masterclassId={data.id} />}
      {data.why && <Why data={data.why} />}
      {data.author && <Author data={data.author} />}
      {data.offer && <Offer data={data.offer} />}
      {data.final && <Final data={data.final} />}
    </>
  )
}
