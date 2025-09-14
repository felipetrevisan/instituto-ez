'use client'

import { useMediaQuery } from '@ez/shared/hooks/use-media-query'
import { DownloadIcon } from '@ez/shared/icons'
import BlobButton from '@ez/shared/ui/animated/button/blob-button'
import { Title } from '@ez/shared/ui/title'
import type { Ebook } from '@ez/web/types/ebook'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { PortableText } from 'next-sanity'

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false })

export function Index({ data }: { data: Ebook }) {
  const isMobile = useMediaQuery()
  const locale = useLocale()

  const { index, download } = data

  return (
    <section className="relative flex w-screen flex-row gap-4 px-6 pt-12">
      <div className="flex flex-col items-center justify-center gap-8 md:container">
        <Title
          className="after:-bottom-1 after:-translate-x-1/2 relative text-center font-questrial font-semibold text-[var(--primary-c)] after:absolute after:left-1/2 after:h-[2px] after:w-[40%] after:rounded-xl after:bg-[var(--primary-c)]/60 after:transition-all"
          size="2xl"
        >
          {index?.title?.[locale] || 'O que você vai encontrar nesse Ebook'}
        </Title>
        {index?.description && (
          <div className="mt-0 w-[90vw] font-medium font-questrial text-[var(--secondary-c)] md:w-[802px]">
            <PortableText
              components={createPortableComponents()}
              value={index.description?.[locale]}
            />
          </div>
        )}
        {index?.video?.url?.[locale] && (
          <>
            {index?.video.title?.[locale] && (
              <Title
                className="after:-bottom-1 after:-translate-x-1/2 relative text-center font-questrial font-semibold text-[var(--primary-c)] after:absolute after:left-1/2 after:h-[2px] after:w-[40%] after:rounded-xl after:bg-[var(--primary-c)]/60 after:transition-all"
                size="2xl"
              >
                {index.video.title?.[locale]}
              </Title>
            )}
            <div className="h-[200px] w-[90vw] max-w-full overflow-hidden rounded-2xl shadow-xl md:h-[450px] md:w-[802px]">
              <ReactPlayer
                controls={false}
                height="100%"
                url={index.video.url?.[locale]}
                width="100%"
              />
            </div>
          </>
        )}
        {!download?.disabled && (
          <Link
            className="w-full md:w-auto md:max-w-[500px]"
            href={download?.url?.[locale] ?? '/'}
            target="_blank"
          >
            <BlobButton
              className="w-full"
              rounded="full"
              size={isMobile ? 'xl' : '3xl'}
              theme="custom"
            >
              <DownloadIcon /> {download?.label?.[locale]}
            </BlobButton>
          </Link>
        )}
      </div>
    </section>
  )
}
