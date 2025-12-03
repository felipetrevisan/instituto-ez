import type { SanityAsset } from '@ez/shared/types/assets'

export type Banner = {
  id: string
  title: Record<string, string>
  subtitle: Record<string, string>
  image: SanityAsset
}
