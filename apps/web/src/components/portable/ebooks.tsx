'use client'

import { EbooksComponent, type EbooksType } from '@ez/shared/sanity/components/ebooks'
import { Skeleton } from '@ez/web/components/sections/ebooks/skeleton'
import { urlForImage } from '@ez/web/config/image'
import { useEbookByCollection, useEbooks } from '@ez/web/hooks/use-ebook'
import type { Ebook, EbookCollection } from '@ez/web/types/ebook'
import Image from 'next/image'
import Link from 'next/link'

import '@ez/web/components/sections/ebooks/styles.css'
import { useLocale } from 'next-intl'

export const EbooksWrapper = ({ value }: { value: Omit<EbooksType, 'ebooks' | 'title'> }) => {
  const locale = useLocale()
  const { appareance, theme, type, collection } = value
  // biome-ignore lint/correctness/useHookAtTopLevel: <explanation>
  const { data, isLoading } = collection ? useEbookByCollection(collection._ref) : useEbooks()

  if (isLoading) return <Skeleton />

  const ebooks = collection ? (data as EbookCollection).ebooks : (data as Ebook[])
  const title = collection ? (data as EbookCollection).title : undefined

  return (
    <EbooksComponent
      value={{
        type,
        appareance,
        theme,
        locale,
        ebooks,
        title,
        LinkComponent: Link,
        ImageComponent: Image,
        imageBuilder: urlForImage,
      }}
    />
  )
}
