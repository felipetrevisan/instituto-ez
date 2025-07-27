import type { PortableTextBlock } from '@portabletext/react'

export type Testimonial = {
  id: string
  author: {
    name: string
  }
  testimonial: PortableTextBlock[]
  category: string[]
}
