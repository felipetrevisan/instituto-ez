import type { Button, SanityAsset } from '@ez/shared/types'
import type { Ebook } from '@ez/web/types/ebook'
import type { Webinar } from '@ez/web/types/webinar'
import type { PortableTextBlock } from 'next-sanity'

export type SectionDigitalProductsHero = {
  heading: Record<string, PortableTextBlock[]>
  subheading: Record<string, PortableTextBlock[]>
  footer: Record<string, PortableTextBlock[]>
  image: SanityAsset
  cta: Button[]
  _type: string
}

export type SectionDigitalProductsEbooksCatalog = {
  heading: Record<string, PortableTextBlock[]>
  subheading: Record<string, PortableTextBlock[]>
  ebooks: Ebook[]
  _type: string
}

export type SectionDigitalProductsWebinarCatalog = {
  heading: Record<string, PortableTextBlock[]>
  subheading: Record<string, PortableTextBlock[]>
  webinar: Webinar[]
  _type: string
}

export type SectionDigitalProductsCTA = {
  heading: Record<string, PortableTextBlock[]>
  subheading: Record<string, PortableTextBlock[]>
  cta: Button[]
  _type: string
}
