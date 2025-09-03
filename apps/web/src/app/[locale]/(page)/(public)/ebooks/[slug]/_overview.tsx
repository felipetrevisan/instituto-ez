'use client'

import { cn } from '@ez/shared/lib/utils'
import { Subtitle, Title } from '@ez/shared/ui/title'
import { urlForImage } from '@ez/web/config/image'
import { useIsMobile } from '@ez/web/hooks/use-mobile'
import type { Ebook } from '@ez/web/types/ebook'
import Image from 'next/image'
import HTMLFlipBook from 'react-pageflip'
import { PageBook } from './_chapters/chapter'
import { CoverBook } from './_chapters/cover'

import './styles.css'

export function Overview({ data }: { data: Ebook }) {
  const isMobile = useIsMobile(640)
  const { overview, chapter, id } = data

  return (
    <section
      className={cn(
        'relative mt-10 flex min-h-[500px] w-screen flex-row gap-4 bg-[auto,contain] bg-ebooks bg-gradient-to-b from-slate-100 via-slate-200 to-white px-6',
        {
          'pt-58': !overview,
          'pt-52': overview,
        },
      )}
    >
      <div className="absolute top-0 left-0 w-full rotate-180 overflow-hidden">
        {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M602.45,3.86h0S572.9,116.24,281.94,120H923C632,116.24,602.45,3.86,602.45,3.86Z"
            className="fill-white"
          />
        </svg>
      </div>
      <div className="container flex flex-col items-center justify-center gap-20">
        {overview?.description && (
          <div className="flex flex-col items-center justify-center gap-2">
            <Title
              size="2xl"
              className="after:-bottom-1 after:-translate-x-1/2 relative text-center font-questrial font-semibold text-[var(--primary-c)] after:absolute after:left-1/2 after:h-[2px] after:w-[40%] after:rounded-xl after:bg-[var(--primary-c)]/60 after:transition-all"
            >
              {overview?.title ?? 'Visão Geral'}
            </Title>
            <Subtitle size="lg">{overview.description}</Subtitle>
          </div>
        )}
        {chapter && chapter.chapters?.length > 0 && (
          <div className="flex flex-col items-center justify-center gap-8">
            <Title
              size="2xl"
              className="after:-bottom-1 after:-translate-x-1/2 relative text-center font-questrial font-semibold text-[var(--primary-c)] after:absolute after:left-1/2 after:h-[2px] after:w-[40%] after:rounded-xl after:bg-[var(--primary-c)]/60 after:transition-all"
            >
              Folheie e conheça o Ebook por dentro
            </Title>
            <div className="flex w-full justify-center px-4">
              <HTMLFlipBook
                width={400}
                height={540}
                size={isMobile ? 'stretch' : 'fixed'}
                minWidth={315}
                maxWidth={1000}
                minHeight={400}
                maxHeight={1533}
                maxShadowOpacity={0.5}
                showCover
                mobileScrollSupport
                drawShadow
                usePortrait={isMobile}
                autoSize={isMobile}
                className="open-book"
              >
                {chapter.cover && (
                  <CoverBook>
                    <Image
                      src={urlForImage(chapter.cover.asset).format('webp').quality(80).url()}
                      alt="Book Cover"
                      fill
                      className="object-cover"
                      priority
                    />
                  </CoverBook>
                )}
                {chapter.chapters?.map((chapter, index) => (
                  <PageBook
                    key={`${id}-${
                      // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                      index
                    }`}
                    className={cn('--hard --left', {
                      '--left': index % 2 === 0,
                      '--right': index % 2 !== 0,
                    })}
                    chapter={chapter}
                  />
                ))}
              </HTMLFlipBook>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
