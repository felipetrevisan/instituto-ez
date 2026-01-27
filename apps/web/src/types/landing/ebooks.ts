import type { Button, SanityAsset } from '@ez/shared/types'
import type { Ebook } from '@ez/web/types/ebook'
import type { PortableTextBlock } from 'next-sanity'

export type SectionEbooksHero = {
  heading: Record<string, PortableTextBlock[]>
  subheading: Record<string, PortableTextBlock[]>
  image: SanityAsset
  cta: Button[]
  _type: string
}

export type SectionEbooksCatalog = {
  heading: Record<string, PortableTextBlock[]>
  subheading: Record<string, PortableTextBlock[]>
  ebooks: Ebook[]
  _type: string
}

export type SectionEbooksCTA = {
  heading: Record<string, PortableTextBlock[]>
  subheading: Record<string, PortableTextBlock[]>
  cta: Button[]
  _type: string
}

