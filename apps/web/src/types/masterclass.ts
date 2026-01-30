import type { SanityAsset } from '@ez/shared/types/assets'
import type { Button } from '@ez/shared/types/global'
import type { Color } from '@ez/web/types/ebook'
import type { IconName } from 'lucide-react/dynamic'
import type { PortableTextBlock } from 'next-sanity'

export type MasterclassStatus = 'draft' | 'upcoming' | 'live' | 'ended'

export type MasterclassCard = {
  title?: Record<string, string>
  description?: Record<string, string>
  badge?: Record<string, string>
  image?: SanityAsset
}

export type MasterclassSeo = {
  title?: Record<string, string>
  description?: Record<string, string>
  keywords?: Record<string, string>
  image?: SanityAsset
}

export type MasterclassSectionSettings = {
  id?: string
  enabled?: boolean
  variant?: string
  background?: Color
}

export type MasterclassSectionHero = {
  settings?: MasterclassSectionSettings
  heading?: Record<string, PortableTextBlock[]>
  subheading?: Record<string, PortableTextBlock[]>
  description?: Record<string, PortableTextBlock[]>
  image?: SanityAsset
  cta?: Button[]
  _type: string
}

export type MasterclassForWhoItem = {
  title?: Record<string, string>
  description?: Record<string, PortableTextBlock[]>
  icon?: IconName
}

export type MasterclassSectionForWho = {
  settings?: MasterclassSectionSettings
  heading?: Record<string, PortableTextBlock[]>
  text?: Record<string, PortableTextBlock[]>
  items?: MasterclassForWhoItem[]
  _type: string
}

export type MasterclassProblemItem = {
  title?: Record<string, string>
  description?: Record<string, PortableTextBlock[]>
  icon?: IconName
}

export type MasterclassSectionProblem = {
  settings?: MasterclassSectionSettings
  heading?: Record<string, PortableTextBlock[]>
  text?: Record<string, PortableTextBlock[]>
  items?: MasterclassProblemItem[]
  _type: string
}

export type MasterclassTransformationItem = {
  title?: Record<string, string>
  description?: Record<string, PortableTextBlock[]>
  icon?: IconName
}

export type MasterclassSectionTransformation = {
  settings?: MasterclassSectionSettings
  heading?: Record<string, PortableTextBlock[]>
  text?: Record<string, PortableTextBlock[]>
  items?: MasterclassTransformationItem[]
  _type: string
}

export type MasterclassContentItem = {
  title?: Record<string, string>
  description?: Record<string, PortableTextBlock[]>
  meta?: Record<string, string>
}

export type MasterclassSectionContent = {
  settings?: MasterclassSectionSettings
  heading?: Record<string, PortableTextBlock[]>
  text?: Record<string, PortableTextBlock[]>
  items?: MasterclassContentItem[]
  _type: string
}

export type MasterclassFormatItem = {
  label?: Record<string, string>
  value?: Record<string, string>
  icon?: IconName
}

export type MasterclassSectionFormat = {
  settings?: MasterclassSectionSettings
  heading?: Record<string, PortableTextBlock[]>
  text?: Record<string, PortableTextBlock[]>
  items?: MasterclassFormatItem[]
  _type: string
}

export type MasterclassExpertSocial = {
  label?: string
  url?: string
}

export type MasterclassExpert = {
  name?: string
  role?: Record<string, string>
  bio?: Record<string, PortableTextBlock[]>
  photo?: SanityAsset
  socials?: MasterclassExpertSocial[]
}

export type MasterclassSectionExpert = {
  settings?: MasterclassSectionSettings
  heading?: Record<string, PortableTextBlock[]>
  text?: Record<string, PortableTextBlock[]>
  experts?: MasterclassExpert[]
  _type: string
}

export type MasterclassSectionFinalCta = {
  settings?: MasterclassSectionSettings
  heading?: Record<string, PortableTextBlock[]>
  text?: Record<string, PortableTextBlock[]>
  subtext?: Record<string, PortableTextBlock[]>
  image?: SanityAsset
  cta?: Button[]
  _type: string
}

export type MasterclassSection =
  | MasterclassSectionHero
  | MasterclassSectionForWho
  | MasterclassSectionProblem
  | MasterclassSectionTransformation
  | MasterclassSectionContent
  | MasterclassSectionFormat
  | MasterclassSectionExpert
  | MasterclassSectionFinalCta

export type Masterclass = {
  id: string
  title: Record<string, string>
  slug: Record<string, { current: string }>
  template: {
    id: string
  }
  enabled?: boolean
  status?: MasterclassStatus
  startAt?: string
  duration?: string
  timezone?: string
  location?: string
  seo?: MasterclassSeo
  card?: MasterclassCard
  sections?: MasterclassSection[]
}
