import type { SanityAsset } from '@ez/shared/types/assets'
import type { Button } from '@ez/shared/types/global'
import type { PortableTextBlock } from 'next-sanity'

export type Immersion = {
  id: string
  title: string
  content: PortableTextBlock[]
  background: SanityAsset
  button: Button
  ribbon: {
    show: boolean
    text: string
  }
}
