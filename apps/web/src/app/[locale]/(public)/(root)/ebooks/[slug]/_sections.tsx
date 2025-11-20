'use client'

import type { Ebook } from '@ez/web/types/ebook'
import type { SectionKeys } from '@ez/web/types/sections'
import { Authors } from './_authors'
import Footer from './_footer'
import { Header } from './_header'
import { Index } from './_index'
import { Metadata } from './_metadata'
import { Overview } from './_overview'
import { Questions } from './_questions'
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
      component: <Questions data={data} />,
    },
    {
      key: 'author',
      component: <Authors data={data} />,
    },
    {
      key: 'footer',
      component: <Footer data={data} />,
    },
  ]
}
