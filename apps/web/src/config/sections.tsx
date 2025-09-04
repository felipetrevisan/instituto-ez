import { About } from '@ez/web/components/sections/about'
import { AdvancedMentory } from '@ez/web/components/sections/advanced-mentory'
import { Banner } from '@ez/web/components/sections/banner'
import { CompanyService } from '@ez/web/components/sections/company-service'
import { Ebooks } from '@ez/web/components/sections/ebooks'
import { Immersion } from '@ez/web/components/sections/immersion'
import { Lectures } from '@ez/web/components/sections/lectures'
import { Services } from '@ez/web/components/sections/services'
import { Testimonials } from '@ez/web/components/sections/testimonials'
import { Workshops } from '@ez/web/components/sections/workshops'
import type { SectionKeys } from '@ez/web/types/sections'

export function getSections(): SectionKeys[] {
  return [
    {
      key: 'banner',
      component: <Banner />,
      classes: 'section relative flex w-screen lg:w-full items-center justify-center',
    },
    {
      key: 'about',
      component: <About />,
      classes: 'section relative flex w-full justify-center bg-background',
    },
    {
      key: 'service',
      component: <Services />,
      classes: 'section relative flex flex-col gap-10 w-full justify-center bg-background',
    },
    {
      key: 'testimonial',
      component: <Testimonials />,
      classes: 'section relative flex flex-col gap-10 w-full justify-center bg-background',
    },
    {
      key: 'immersion',
      component: <Immersion />,
      classes: 'section relative flex flex-col w-screen h-full justify-center',
    },
    {
      key: 'lecture',
      component: <Lectures />,
      classes: 'section relative flex flex-col gap-10 w-screen h-full justify-center',
    },
    {
      key: 'workshop',
      component: <Workshops />,
      classes: 'section relative flex flex-col gap-10 h-full justify-center bg-background w-full',
    },
    {
      key: 'advanced-mentory',
      component: <AdvancedMentory />,
      classes: 'section relative flex flex-col w-screen h-full justify-center',
    },
    {
      key: 'company-services',
      component: <CompanyService />,
      classes: 'section relative flex flex-col gap-10 w-screen h-full justify-center',
    },
    {
      key: 'ebooks',
      component: <Ebooks />,
      classes: 'section relative flex flex-col gap-10 h-full justify-center bg-background',
    },
  ]
}
