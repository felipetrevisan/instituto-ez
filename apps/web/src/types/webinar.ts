import type { SanityAsset } from '@ez/shared/types/assets'
import type { Button } from '@ez/shared/types/global'
import type { Color } from '@ez/web/types/ebook'
import type { IconName } from 'lucide-react/dynamic'
import type { PortableTextBlock } from 'next-sanity'

export type WebinarStatus = 'draft' | 'upcoming' | 'live' | 'ended'

export type WebinarCard = {
  title?: Record<string, string>
  description?: Record<string, string>
  badge?: Record<string, string>
  image?: SanityAsset
}

export type WebinarSeo = {
  title?: Record<string, string>
  description?: Record<string, string>
  keywords?: Record<string, string>
  image?: SanityAsset
}

export type WebinarSectionSettings = {
  id?: string
  enabled?: boolean
  variant?: string
  background?: Color
}

export type WebinarSectionHero = {
  settings?: WebinarSectionSettings
  heading?: Record<string, PortableTextBlock[]>
  subheading?: Record<string, PortableTextBlock[]>
  description?: Record<string, PortableTextBlock[]>
  image?: SanityAsset
  cta?: Button[]
  _type: string
}

export type WebinarForWhoItem = {
  title?: Record<string, string>
  description?: Record<string, PortableTextBlock[]>
  icon?: IconName
}

export type WebinarSectionForWho = {
  settings?: WebinarSectionSettings
  heading?: Record<string, PortableTextBlock[]>
  text?: Record<string, PortableTextBlock[]>
  items?: WebinarForWhoItem[]
  _type: string
}

export type WebinarProblemItem = {
  title?: Record<string, string>
  description?: Record<string, PortableTextBlock[]>
  icon?: IconName
}

export type WebinarSectionProblem = {
  settings?: WebinarSectionSettings
  heading?: Record<string, PortableTextBlock[]>
  text?: Record<string, PortableTextBlock[]>
  items?: WebinarProblemItem[]
  _type: string
}

export type WebinarTransformationItem = {
  title?: Record<string, string>
  description?: Record<string, PortableTextBlock[]>
  icon?: IconName
}

export type WebinarSectionTransformation = {
  settings?: WebinarSectionSettings
  heading?: Record<string, PortableTextBlock[]>
  text?: Record<string, PortableTextBlock[]>
  items?: WebinarTransformationItem[]
  _type: string
}

export type WebinarContentItem = {
  title?: Record<string, string>
  description?: Record<string, PortableTextBlock[]>
  meta?: Record<string, string>
}

export type WebinarSectionContent = {
  settings?: WebinarSectionSettings
  heading?: Record<string, PortableTextBlock[]>
  text?: Record<string, PortableTextBlock[]>
  items?: WebinarContentItem[]
  _type: string
}

export type WebinarFormatItem = {
  label?: Record<string, string>
  value?: Record<string, string>
  icon?: IconName
}

export type WebinarSectionFormat = {
  settings?: WebinarSectionSettings
  heading?: Record<string, PortableTextBlock[]>
  text?: Record<string, PortableTextBlock[]>
  items?: WebinarFormatItem[]
  _type: string
}

export type WebinarExpertSocial = {
  label?: string
  url?: string
}

export type WebinarExpert = {
  name?: string
  role?: Record<string, string>
  bio?: Record<string, PortableTextBlock[]>
  photo?: SanityAsset
  socials?: WebinarExpertSocial[]
}

export type WebinarSectionExpert = {
  settings?: WebinarSectionSettings
  heading?: Record<string, PortableTextBlock[]>
  text?: Record<string, PortableTextBlock[]>
  experts?: WebinarExpert[]
  _type: string
}

export type WebinarSectionFinalCta = {
  settings?: WebinarSectionSettings
  heading?: Record<string, PortableTextBlock[]>
  text?: Record<string, PortableTextBlock[]>
  subtext?: Record<string, PortableTextBlock[]>
  image?: SanityAsset
  cta?: Button[]
  _type: string
}

export type WebinarSection =
  | WebinarSectionHero
  | WebinarSectionForWho
  | WebinarSectionProblem
  | WebinarSectionTransformation
  | WebinarSectionContent
  | WebinarSectionFormat
  | WebinarSectionExpert
  | WebinarSectionFinalCta

export type Webinar = {
  id: string
  title: Record<string, string>
  slug: Record<string, { current: string }>
  template: {
    id: string
  }
  enabled?: boolean
  status?: WebinarStatus
  startAt?: string
  duration?: string
  timezone?: string
  location?: string
  seo?: WebinarSeo
  card?: WebinarCard
  sections?: WebinarSection[]
}
