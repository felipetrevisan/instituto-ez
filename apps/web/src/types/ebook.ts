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
    description: Record<string, string> | string
    image?: SanityAsset
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
  category: Category
}

export type Color = {
  alpha: number
  hex: string
  hsl: { _type: 'hslaColor'; a: number; h: number; l: number; s: number }
  hsv: { _type: 'hsvaColor'; a: number; h: number; s: number; v: number }
  rgb: { _type: 'rgbaColor'; a: number; r: number; g: number; b: number }
}

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
}

export type ThemeEbook = {
  text: Color
  primary: Color
  secondary: Color
}

const parseHexChannel = (value: string) => Number.parseInt(value, 16) / 255

const isLightColor = (hex?: string) => {
  if (!hex || !hex.startsWith('#') || (hex.length !== 7 && hex.length !== 4)) return false
  const normalized =
    hex.length === 4
      ? `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`
      : hex
  const r = parseHexChannel(normalized.slice(1, 3))
  const g = parseHexChannel(normalized.slice(3, 5))
  const b = parseHexChannel(normalized.slice(5, 7))
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b
  return luminance > 0.6
}

export function mapThemeToCSSVars(theme?: ThemeEbook) {
  if (!theme) return {}

  const primary = theme.primary?.hex
  const secondary = theme.secondary?.hex ?? primary
  const text = theme.text?.hex
  const primaryForeground = isLightColor(primary) ? '#0f172a' : '#f8fafc'
  const secondaryForeground = isLightColor(secondary) ? '#0f172a' : '#f8fafc'

  return {
    '--primary': primary,
    '--secondary': secondary,
    '--tertiary': secondary ?? primary,
    '--text': text,
    '--primary-foreground': primaryForeground,
    '--secondary-foreground': secondaryForeground,
    '--footer': primary,
    '--footer-foreground': primaryForeground,
    '--header-button-default-text': primaryForeground,
    '--header-button-default-background': primary,
    '--header-button-hover-text': secondaryForeground,
    '--header-button-hover-background': secondary ?? primary,
    '--header-sticky-button-default-text': primaryForeground,
    '--header-sticky-button-default-background': primary,
    '--header-sticky-button-hover-text': secondaryForeground,
    '--header-sticky-button-hover-background': secondary ?? primary,
  }
}
