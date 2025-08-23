import type { PortableTextBlock } from '@portabletext/react'
import type { SanityReference } from '@sanity/asset-utils'

export type Testimonial = {
  id: string
  author: {
    name: string
  }
  testimonial: PortableTextBlock[]
  category: string[]
  ebook_page?: SanityReference
}
