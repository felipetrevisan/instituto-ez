'use client'

import { DownloadIcon } from '@ez/shared/icons'
import BlobButton from '@ez/shared/ui/animated/button/blob-button'
import { Title } from '@ez/shared/ui/title'
import { useIsMobile } from '@ez/web/hooks/use-mobile'
import type { Ebook } from '@ez/web/types/ebook'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import Link from 'next/link'
import { PortableText } from 'next-sanity'
import ReactPlayer from 'react-player'

export function Index({ data }: { data: Ebook }) {
  const isMobile = useIsMobile(640)

  const { index, download } = data

  return (
    <section className="relative flex w-screen flex-row gap-4 px-6 py-12">
      <div className="flex flex-col items-center justify-center gap-8 md:container">
        <Title
          size="2xl"
          className="after:-bottom-1 after:-translate-x-1/2 relative text-center font-questrial font-semibold text-[var(--primary-c)] after:absolute after:left-1/2 after:h-[2px] after:w-[40%] after:rounded-xl after:bg-[var(--primary-c)]/60 after:transition-all"
        >
          {index?.title || 'O que você vai encontrar nesse Ebook'}
        </Title>
        {index?.description && (
          <div className="mt-0 font-medium font-questrial text-[var(--secondary-c)]">
            <PortableText value={index.description} components={createPortableComponents()} />
          </div>
        )}
        {index?.video?.url && (
          <>
            {index?.video.title && (
              <Title
                size="2xl"
                className="after:-bottom-1 after:-translate-x-1/2 relative text-center font-questrial font-semibold text-[var(--primary-c)] after:absolute after:left-1/2 after:h-[2px] after:w-[40%] after:rounded-xl after:bg-[var(--primary-c)]/60 after:transition-all"
              >
                {index.video.title}
              </Title>
            )}
            <div className="h-[200px] w-[90vw] max-w-full overflow-hidden rounded-2xl shadow-xl md:h-[450px] md:w-[60vw]">
              <ReactPlayer url={index.video.url} width="100%" height="100%" controls={false} />
            </div>
          </>
        )}
        {!download?.disabled && (
          <Link
            href={download?.url ?? '/'}
            target="_blank"
            className="w-full md:w-auto md:max-w-[500px]"
          >
            <BlobButton
              theme="custom"
              size={isMobile ? 'xl' : '3xl'}
              rounded="full"
              className="w-full"
            >
              <DownloadIcon /> Quero meu eBook agora
            </BlobButton>
          </Link>
        )}
      </div>
    </section>
  )
}
