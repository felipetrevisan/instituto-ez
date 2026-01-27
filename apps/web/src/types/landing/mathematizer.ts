import type { Button } from '@ez/shared/types'
import type { IconName } from 'lucide-react/dynamic'
import type { PortableTextBlock } from 'next-sanity'

export type SectionMathematizerWhatIs = {
  heading: Record<string, PortableTextBlock[]>
  text: Record<string, PortableTextBlock[]>
  subtext: Record<string, PortableTextBlock[]>
  _type: string
}

export type SectionMathematizerWhyCompanyNeed = {
  heading: Record<string, PortableTextBlock[]>
  subheading: Record<string, PortableTextBlock[]>
  cta?: Button
  _type: string
}

export type SectionMathematizerMathematizer = {
  heading: Record<string, PortableTextBlock[]>
  subheading: Record<string, PortableTextBlock[]>
  items: SectionMathematizerMathematizerItem[]
  cta?: Button
  _type: string
}

export type SectionMathematizerMathematizerItem = {
  title: Record<string, string>
  problems: Record<string, string>
  action: Record<string, string>
  result: Record<string, string>
  icon?: IconName
  _type: string
}

export type SectionMathematizerBenefits = {
  heading: Record<string, PortableTextBlock[]>
  subheading: Record<string, PortableTextBlock[]>
  items: SectionMathematizerBenefitsItem[]
  cta?: Button
  _type: string
}

export type SectionMathematizerBenefitsItem = {
  title: Record<string, string>
  problems: Record<string, string>
  action: Record<string, string>
  result: Record<string, string>
  icon?: IconName
  _type: string
}

export type SectionMathematizerCTA = {
  heading: Record<string, PortableTextBlock[]>
  text: Record<string, PortableTextBlock[]>
  cta?: Button[]
  _type: string
}
