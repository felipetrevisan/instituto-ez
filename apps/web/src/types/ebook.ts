import type { SanityAsset } from '@ez/shared/types/assets'
import type { Button } from '@ez/shared/types/global'
import type { IconName } from 'lucide-react/dynamic'
import type { PortableTextBlock } from 'next-sanity'

export type Ebook = {
  id: string
  title: Record<string, string>
  subtitle?: Record<string, string>
  slug: Record<string, { current: string }>
  description?: Record<string, string>
  price: Price
  seo: {
    description: Record<string, string>
    keywords: Record<string, string>
  }
  download: {
    disabled: boolean
    label: Record<string, string>
    url: Record<string, string>
  }
  overview: {
    title?: Record<string, string>
    description?: Record<string, string>
  }
  index: {
    title?: Record<string, string>
    description?: Record<string, PortableTextBlock[]>
    video: {
      title?: Record<string, string>
      url?: Record<string, string>
    }
  }
  badges: Badge[]
  metadata: Metadata[]
  chapter: {
    cover?: Record<string, { cover: SanityAsset }>
    chapters: Chapter[]
  }
  authors: Author[]
  theme: ThemeEbook
  image: Record<
    string,
    {
      background?: SanityAsset
      preview: SanityAsset
      large: SanityAsset
      footer: SanityAsset
    }
  >
  questions?: Question[]
  disabled: boolean
  button?: Button
  type: 'EBOOK' | 'WEBINAR'
  category: Category
}

export type Color = {
  alpha: number
  hex: string
  hsl: { _type: 'hslaColor'; a: number; h: number; l: number; s: number }
  hsv: { _type: 'hsvaColor'; a: number; h: number; s: number; v: number }
  rgb: { _type: 'rgbaColor'; a: number; r: number; g: number; b: number }
}

// export type EbookCollection = {
//   id: string
//   title: string
//   ebooks?: Ebook[]
// }

export type Category = {
  id: string
  title: string
}

export type Metadata = {
  _key: string
  title: Record<string, string>
  type: 'string' | 'number'
  text?: Record<string, string>
  value?: number
  prefix?: Record<string, string>
  suffix?: Record<string, string>
  media: Media
}

export type Badge = {
  _key: string
  type: 'string' | 'number' | 'star'
  text?: Record<string, string>
  value?: number
  prefix?: Record<string, string>
  suffix?: Record<string, string>
  icon?: IconName
}

export type Chapter = {
  content: Record<string, PortableTextBlock[]>
}

export type Author = {
  _key: string
  name: string
  background?: SanityAsset
  photo?: SanityAsset
  content: Record<string, PortableTextBlock[]>
}

export type Media = {
  type: 'none' | 'icon' | 'image'
  icon?: IconName
  image?: SanityAsset
}

export type Question = {
  _key: string
  title: Record<string, string>
  content: Record<string, string>
}

export type Price = {
  regular: {
    price: number
    text?: Record<string, string>
  }
  priceOffText: Record<string, string>
  priceByText: Record<string, string>
  hasDiscount: boolean
  discount?: {
    price: number
    text?: Record<string, string>
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

export type ThemeEbook = {
  text: Color
  primary: Color
  secondary: Color
  tertiary: Color
  footer: {
    background: Color
    text: Color
  }
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

export function mapThemeToCSSVars(theme?: ThemeEbook) {
  if (!theme) return {}

  return {
    '--primary': theme.primary?.hex,
    '--secondary': theme.secondary?.hex,
    '--tertiary': theme.tertiary?.hex,

    '--footer': theme.footer.background?.hex,
    '--footer-foreground': theme.footer.text?.hex,

    '--header-button-default-text': theme.button?.header?.default?.text?.hex,
    '--header-button-default-background': theme.button?.header?.default?.background?.hex,

    '--header-button-hover-text': theme.button?.header?.hover?.text?.hex,
    '--header-button-hover-background': theme.button?.header?.hover?.background?.hex,

    '--header-sticky-button-default-text': theme.button?.stickyHeader?.default?.text?.hex,
    '--header-sticky-button-default-background':
      theme.button?.stickyHeader?.default?.background?.hex,

    '--header-sticky-button-hover-text': theme.button?.stickyHeader?.hover?.text?.hex,
    '--header-sticky-button-hover-background': theme.button?.stickyHeader?.hover?.background?.hex,
  }
}

export const isWebinar = (ebook: Ebook) => {
  return ebook.type === 'WEBINAR'
}
