import type { SanityAsset } from '@ez/shared/types/assets'
import type { Button } from '@ez/shared/types/global'
import type { PortableTextBlock } from 'next-sanity'

export type CompanyService = {
  id: string
  title: Record<string, string>
  content: Record<string, PortableTextBlock[]>
  background: SanityAsset
  button: Button
}
