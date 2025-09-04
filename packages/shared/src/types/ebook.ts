import type { SanityAsset } from '@ez/shared/types/assets'
import type { Button } from '@ez/shared/types/global'
import type { PortableTextBlock } from '@portabletext/react'
import type { IconName } from 'lucide-react/dynamic'

export type Ebook = {
  id: string
  title: string
  subtitle?: string
  slug: string
  description?: string
  price: Price
  seo: {
    description: string
    keywords: string
  }
  download: {
    disabled: boolean
    label: string
    url: string
  }
  overview: {
    title?: string
    description?: string
  }
  index: {
    title?: string
    description?: PortableTextBlock[]
    video: {
      title?: string
      url?: string
    }
  }
  metadata: Metadata[]
  badges: Badge[]
  chapter: {
    cover?: SanityAsset
    chapters: Chapter[]
  }
  theme: {
    text: string
    primary: Color
    secondary: Color
    tertiary: Color
    button: {
      header: {
        default: {
          text: Color
          background: Color
        }
        hover: {
          text: Color
          background: Color
        }
      }
      stickyHeader: {
        default: {
          text: Color
          background: Color
        }
        hover: {
          text: Color
          background: Color
        }
      }
    }
  }
  image: {
    background?: SanityAsset
    preview: SanityAsset
    large: SanityAsset
    footer: SanityAsset
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

export type Badge = {
  type: 'string' | 'number' | 'star'
  text?: string
  value?: number
  prefix?: string
  suffix?: string
  icon?: IconName
}

export type Chapter = {
  content: PortableTextBlock[]
}

export type Media = {
  type: 'none' | 'icon' | 'image'
  icon?: IconName
  image?: SanityAsset
}

export type Question = {
  title: string
  text: string
}

export type Price = {
  regular: number
  hasDiscount: boolean
  priceWithDiscount?: number
}
