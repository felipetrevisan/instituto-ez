import type { SanityAsset } from '@ez/shared/types/assets'
import type { Button } from '@ez/shared/types/global'

export type Ebook = {
  id: string
  title: string
  subtitle?: string
  slug: string
  description?: string
  seo: {
    description: string
    keywords: string
  }
  overview: {
    title?: string
    description?: string
  }
  index: {
    title?: string
    description?: string
  }
  metadata: Metadata[]
  chapters: Chapter[]
  theme: {
    text: string
    primary: Color
    secondary: Color
  }
  image: {
    background?: SanityAsset
    preview: SanityAsset
    large: SanityAsset
  }
  questions?: Question[]
  disabled: boolean
  button?: Button
}

export type Color = {
  alpha: number
  hex: string
  hsl: { _type: 'hslaColor'; a: number; h: number; l: number; s: number }
  hsv: { _type: 'hsvaColor'; a: number; h: number; s: number; v: number }
  rgb: { _type: 'rgbaColor'; a: number; r: number; g: number; b: number }
}

export type EbookCollection = {
  id: string
  title: string
  ebooks?: Ebook[]
}

export type Metadata = {
  title: string
  type: 'string' | 'number'
  text?: string
  value?: number
  prefix?: string
  suffix?: string
  media: Media
}

export type Chapter = {
  title: string
  text: string
  media: Media
}

export type Media = {
  type: 'none' | 'icon' | 'image'
  icon?: { name: string }
  image?: SanityAsset
}

export type Question = {
  title: string
  text: string
}