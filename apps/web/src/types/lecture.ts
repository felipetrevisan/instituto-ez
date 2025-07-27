import type { SanityAsset } from '@ez/shared/types/assets'
import type { Button } from '@ez/shared/types/global'
import type { PortableTextBlock } from 'next-sanity'

export type Lecture = {
  id: string
  title: string
  content: PortableTextBlock[]
  background: SanityAsset
  button: Button
}
