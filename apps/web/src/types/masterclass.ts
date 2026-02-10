import type { SanityAsset } from '@ez/shared/types/assets'
import type { Button } from '@ez/shared/types/global'
import type { IconName } from 'lucide-react/dynamic'
import type { PortableTextBlock } from 'next-sanity'

export type MasterclassCard = {
  title?: Record<string, string>
  description?: Record<string, string>
  badge?: Record<string, string>
  image?: SanityAsset
}

export type MasterclassSeo = {
  title?: Record<string, string>
  description?: Record<string, string>
  image?: SanityAsset
}

export type MasterclassHeroVideo = {
  url?: string
  duration?: string
  caption?: string
}

export type MasterclassHero = {
  badge?: string
  heading?: PortableTextBlock[]
  video?: MasterclassHeroVideo
}

export type MasterclassPillarTheme = 'coral' | 'violet' | 'cyan' | 'amber' | 'emerald' | 'primary'

export type MasterclassPillarOrbitItem = {
  label?: string
  icon?: IconName
}

export type MasterclassPillarCore = {
  label?: string
  icon?: IconName
}

export type MasterclassPillar = {
  number?: string
  title?: string
  subtitle?: string
  label?: string
  heading?: PortableTextBlock[]
  body?: PortableTextBlock[]
  icon?: IconName
  theme?: MasterclassPillarTheme
  cta?: Button
  core?: MasterclassPillarCore
  orbitItems?: MasterclassPillarOrbitItem[]
}

export type MasterclassPillars = {
  badge?: string
  heading?: PortableTextBlock[]
  subheading?: PortableTextBlock[]
  items?: MasterclassPillar[]
  cta?: Button
}

export type MasterclassTestimonials = {
  badge?: string
  heading?: PortableTextBlock[]
  description?: string
}

export type MasterclassWhyItem = {
  title?: string
  description?: string
}

export type MasterclassWhy = {
  badge?: string
  statement?: PortableTextBlock[]
  items?: MasterclassWhyItem[]
  body?: PortableTextBlock[]
  closing?: PortableTextBlock[]
  cta?: Button
}

export type MasterclassAuthorHighlight = {
  icon?: IconName
  label?: string
  text?: string
}

export type MasterclassAuthorInfo = {
  name?: string
  role?: string
  bio?: string
  image?: SanityAsset
}

export type MasterclassAuthor = {
  badge?: string
  heading?: PortableTextBlock[]
  author?: MasterclassAuthorInfo
  highlights?: MasterclassAuthorHighlight[]
}

export type MasterclassOfferSeal = {
  _key?: string
  label?: string
  image?: SanityAsset
}

export type MasterclassOfferPrice = {
  original?: string
  prefix?: string
  current?: string
}

export type MasterclassOffer = {
  badge?: string
  heading?: string
  subheading?: string
  sealsHeading?: string
  seals?: MasterclassOfferSeal[]
  price?: MasterclassOfferPrice
  cta?: Button
}

export type MasterclassFinalDetail = {
  icon?: IconName
  label?: string
}

export type MasterclassFinal = {
  heading?: string
  summary?: string
  benefits?: string[]
  cta?: Button
  details?: MasterclassFinalDetail[]
}

export type Masterclass = {
  id: string
  title: Record<string, string>
  slug: Record<string, { current: string }>
  enabled?: boolean
  seo?: MasterclassSeo
  card?: MasterclassCard
  hero?: MasterclassHero
  pillars?: MasterclassPillars
  testimonials?: MasterclassTestimonials
  why?: MasterclassWhy
  author?: MasterclassAuthor
  offer?: MasterclassOffer
  final?: MasterclassFinal
}
