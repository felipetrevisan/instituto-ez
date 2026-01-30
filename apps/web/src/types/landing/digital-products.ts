import type { Button, SanityAsset } from '@ez/shared/types'
import type { Ebook } from '@ez/web/types/ebook'
import type { Masterclass } from '@ez/web/types/masterclass'
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

export type SectionDigitalProductsMasterclassCatalog = {
  heading: Record<string, PortableTextBlock[]>
  subheading: Record<string, PortableTextBlock[]>
  masterclass: Masterclass[]
  _type: string
}

export type SectionDigitalProductsCTA = {
  heading: Record<string, PortableTextBlock[]>
  subheading: Record<string, PortableTextBlock[]>
  cta: Button[]
  _type: string
}
