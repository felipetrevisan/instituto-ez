import type { PortableTextBlock } from '@portabletext/react'
import type { SanityReference } from '@sanity/asset-utils'

export type Testimonial = {
  id: string
  author: {
    name: string
    role?: string
  }
  rating?: number
  showStars?: boolean
  testimonial: PortableTextBlock[]
  category?: string[]
  categories?: string[]
  displayAreas?: Array<'home' | 'masterclass' | 'ebook'>
  ebook_page?: SanityReference
}
