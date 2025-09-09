import type { SanityAsset } from '@ez/shared/types/assets'
import type { Button } from '@ez/shared/types/global'
import type { PortableTextBlock } from '@portabletext/react'
import type { IconName } from 'lucide-react/dynamic'

export type Ebook = {
  id: string
  title: {
    [key: string]: string
  }
  subtitle?: {
    [key: string]: string
  }
  slug: {
    [key: string]: {
      current: string
    }
  }
  description?: {
    [key: string]: string
  }
  price: Price
  seo: {
    description: {
      [key: string]: string
    }
    keywords: {
      [key: string]: string
    }
  }
  download: {
    disabled: boolean
    label: {
      [key: string]: string
    }
    url: {
      [key: string]: string
    }
  }
  overview: {
    title?: {
      [key: string]: string
    }
    description?: {
      [key: string]: string
    }
  }
  index: {
    title?: {
      [key: string]: string
    }
    description?: {
      [key: string]: PortableTextBlock[]
    }
    video: {
      title?: {
        [key: string]: string
      }
      url?: {
        [key: string]: string
      }
    }
  }
  badges: Badge[]
  metadata: Metadata[]
  chapter: {
    cover?: {
      [key: string]: SanityAsset
    }
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
    [key: string]: {
      background?: SanityAsset
      preview: SanityAsset
      large: SanityAsset
      footer: SanityAsset
    }
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
  title: {
    [key: string]: string
  }
  type: 'string' | 'number'
  text?: {
    [key: string]: string
  }
  value?: number
  prefix?: {
    [key: string]: string
  }
  suffix?: {
    [key: string]: string
  }
  media: Media
}

export type Badge = {
  type: 'string' | 'number' | 'star'
  text?: {
    [key: string]: string
  }
  value?: number
  prefix?: {
    [key: string]: string
  }
  suffix?: {
    [key: string]: string
  }
  icon?: IconName
}

export type Chapter = {
  content: {
    [key: string]: PortableTextBlock[]
  }
}

export type Media = {
  type: 'none' | 'icon' | 'image'
  icon?: IconName
  image?: SanityAsset
}

export type Question = {
  title: {
    [key: string]: string
  }
  content: {
    [key: string]: string
  }
}

export type Price = {
  regular: {
    price: number
    text?: {
      [key: string]: string
    }
  }
  priceOffText: {
    [key: string]: string
  }
  priceByText: {
    [key: string]: string
  }
  hasDiscount: boolean
  discount?: {
    price: number
    text?: {
      [key: string]: string
    }
  }
  theme: {
    regular: PriceTheme
    free: PriceTheme
  }
}

export type PriceTheme = {
  background: {
    primary: Color
    secondary: Color
  }
  border: Color
  text: {
    stroke: Color
    fill: Color
  }
}
