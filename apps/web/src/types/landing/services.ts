import type { Button } from '@ez/shared/types'
import type { IconName } from 'lucide-react/dynamic'
import type { PortableTextBlock } from 'next-sanity'

export type SectionServicesAssessment = {
  heading: Record<string, PortableTextBlock[]>
  text: Record<string, PortableTextBlock[]>
  _type: string
}

export type SectionServicesBenefits = {
  heading: Record<string, PortableTextBlock[]>
  subheading: Record<string, PortableTextBlock[]>
  items: SectionServicesBenefitsItem[]
  _type: string
}

export type SectionServicesBenefitsItem = {
  title: Record<string, string>
  icon?: IconName
  _type: string
}

export type SectionServicesWhoIsItFor = {
  heading: Record<string, PortableTextBlock[]>
  text: Record<string, PortableTextBlock[]>
  footer?: Record<string, PortableTextBlock[]>
  cta: Button[]
  _type: string
}

export type SectionServicesMethodSessions = {
  heading: Record<string, PortableTextBlock[]>
  subheading: Record<string, PortableTextBlock[]>
  items: SectionServicesMethodSessionsItem[]
  footer?: Record<string, PortableTextBlock[]>
  cta?: Button[]
  _type: string
}

export type SectionServicesMethodSessionsItem = {
  title: Record<string, string>
  description: Record<string, string>
  icon?: IconName
  _type: string
}

export type SectionServicesCTA = {
  heading: Record<string, PortableTextBlock[]>
  text: Record<string, PortableTextBlock[]>
  footer?: Record<string, PortableTextBlock[]>
  cta: Button[]
  _type: string
}