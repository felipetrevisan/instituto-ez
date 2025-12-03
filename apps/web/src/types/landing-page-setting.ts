import type { SanityAsset } from '@ez/shared/types/assets'
import type { Section } from './sections'

export type LandingPageSetting = {
  sections: Section[]
  seals: Record<string, SealItem[]>
}

export type SealItem = {
  seal: {
    image: SanityAsset
  }
}
