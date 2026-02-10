'use client'

import { cn } from '@ez/shared/lib/utils'
import { Carousel, CarouselContent, CarouselDots, CarouselItem } from '@ez/shared/ui/carousel'
import { Title } from '@ez/shared/ui/title'
import type { Ebook } from '@ez/web/types/ebook'
import ClassNames from 'embla-carousel-class-names'
import { useTranslations } from 'next-intl'
import { AuthorCard } from './_authors/card'

export function Authors({ data }: { data: Ebook }) {
  const t = useTranslations('Ebooks')
  const authors = data.authors ?? []

  if (!authors.length) return null

  return (
    <section
      className={cn(
        'relative mt-10 flex min-h-[500px] w-screen flex-row gap-4 bg-gradient-to-b from-slate-100 via-slate-200 to-white px-6',
      )}
    >
      <div className="mt-20 flex flex-col items-center justify-center gap-20 md:container">
        <div className="flex flex-col items-center justify-center gap-8">
          <Title
            className="after:-bottom-1 after:-translate-x-1/2 relative text-center font-questrial font-semibold text-[var(--primary)] after:absolute after:left-1/2 after:h-[2px] after:w-[40%] after:rounded-xl after:bg-[var(--primary)]/60 after:transition-all"
            size="2xl"
          >
            {authors.length === 1 ? t('aboutAuthor') : t('aboutAuthors')}
          </Title>
          <div className="mt-20 flex w-full justify-center">
            <div className="w-full md:hidden">
              <Carousel plugins={[ClassNames()]} theme="custom">
                <CarouselContent>
                  {authors.map((author, index) => (
                    <CarouselItem className="basis-full" key={author._key}>
                      <AuthorCard author={author} index={index} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselDots rootClassName="mt-10" theme="custom" />
              </Carousel>
            </div>
            <div className="hidden w-full gap-6 space-y-24 md:grid md:grid-cols-1">
              {authors.map((author, index) => (
                <AuthorCard author={author} index={index} key={author._key} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
