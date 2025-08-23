import type { PortableTextBlock } from '@portabletext/react'
import type { SanityReference } from 'next-sanity'

export type Testimonial = {
  id: string
  author: {
    name: string
  }
  testimonial: PortableTextBlock[]
  category: string[]
  ebook_page?: SanityReference
}
