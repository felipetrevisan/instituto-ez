import type { SanityAsset } from '@ez/shared/types/assets'
import type { Button } from '@ez/shared/types/global'
import type { PortableTextBlock } from 'next-sanity'

export type CompanyService = {
  id: string
  title: {
    [key: string]: string
  }
  content: {
    [key: string]: PortableTextBlock[]
  }
  background: SanityAsset
  button: Button
}
