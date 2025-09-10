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
import { useLocale, useTranslations } from 'next-intl'

export function Overview({ data }: { data: Ebook }) {
  const isMobile = useIsMobile(640)
  const { overview, chapter, id } = data
  const locale = useLocale()

  console.log(chapter)

  const t = useTranslations('Ebooks')

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
        <svg preserveAspectRatio="none" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
          <path
            className="fill-white"
            d="M602.45,3.86h0S572.9,116.24,281.94,120H923C632,116.24,602.45,3.86,602.45,3.86Z"
          />
        </svg>
      </div>
      <div className="container flex flex-col items-center justify-center gap-20">
        {overview?.description?.[locale] && (
          <div className="flex flex-col items-center justify-center gap-2">
            <Title
              className="after:-bottom-1 after:-translate-x-1/2 relative text-center font-questrial font-semibold text-[var(--primary-c)] after:absolute after:left-1/2 after:h-[2px] after:w-[40%] after:rounded-xl after:bg-[var(--primary-c)]/60 after:transition-all"
              size="2xl"
            >
              {overview?.title?.[locale]}
            </Title>
            <Subtitle size="lg">{overview.description?.[locale]}</Subtitle>
          </div>
        )}
        {chapter && chapter?.chapters?.length > 0 && (
          <div className="flex flex-col items-center justify-center gap-8">
            <Title
              className="after:-bottom-1 after:-translate-x-1/2 relative text-center font-questrial font-semibold text-[var(--primary-c)] after:absolute after:left-1/2 after:h-[2px] after:w-[40%] after:rounded-xl after:bg-[var(--primary-c)]/60 after:transition-all"
              size="2xl"
            >
              {t('virtualEbook')}
            </Title>
            {chapter.chapters?.length && (
              <div className="flex w-full justify-center px-4">
                <HTMLFlipBook
                  autoSize={isMobile}
                  className="open-book"
                  drawShadow
                  height={540}
                  maxHeight={1533}
                  maxShadowOpacity={0.5}
                  maxWidth={1000}
                  minHeight={400}
                  minWidth={315}
                  mobileScrollSupport
                  showCover
                  size={isMobile ? 'stretch' : 'fixed'}
                  usePortrait={isMobile}
                  width={400}
                >
                  <CoverBook cover={chapter.cover} locale={locale} />
                  {chapter.chapters?.map((chapter, index) => (
                    <PageBook
                      chapter={chapter}
                      className={cn('--hard --left', {
                        '--left': index % 2 === 0,
                        '--right': index % 2 !== 0,
                      })}
                      index={index}
                      key={`${id}-${index}`}
                    />
                  ))}
                  <CoverBook cover={chapter.cover} locale={locale} />
                </HTMLFlipBook>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
