import { About } from '@ez/web/components/sections/about'
import { AdvancedMentory } from '@ez/web/components/sections/advancedMentory'
import { Banner } from '@ez/web/components/sections/banner'
import { Ebooks } from '@ez/web/components/sections/ebooks'
import { Immersion } from '@ez/web/components/sections/immersion'
import { Lectures } from '@ez/web/components/sections/lectures'
import { Mathematizer } from '@ez/web/components/sections/mathematizer'
import { Services } from '@ez/web/components/sections/services'
import { Testimonials } from '@ez/web/components/sections/testimonials'
import { Workshops } from '@ez/web/components/sections/workshops'
import type { Ebook } from '@ez/web/types/ebook'
import type { SectionKeys } from '@ez/web/types/sections'
import { Header } from './_header'
import { Index } from './_index'
import { Metadata } from './_metadata'
import { Overview } from './_overview'
import { Question } from './_question'
import { Testimonial } from './_testimonial'

export function getLandingPageSections(data: Ebook): SectionKeys[] {
  return [
    {
      key: 'header',
      component: <Header data={data} />,
    },
    {
      key: 'stats',
      component: <Metadata data={data} />,
    },
    {
      key: 'index',
      component: <Index data={data} />,
    },
    {
      key: 'overview',
      component: <Overview data={data} />,
    },
    {
      key: 'testimomials',
      component: <Testimonial data={data} />,
    },
    {
      key: 'question',
      component: <Question data={data} />,
    },
  ]
}
