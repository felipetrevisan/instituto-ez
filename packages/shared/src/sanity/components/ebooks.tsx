import { useMediaQuery } from '@ez/shared/hooks/use-media-query'
import { cn } from '@ez/shared/lib/utils'
import type { Ebook } from '@ez/shared/types/ebook'
import type { Theme } from '@ez/shared/types/global'
import { Carousel, CarouselContent, CarouselDots, CarouselItem } from '@ez/shared/ui/carousel'
import { Title } from '@ez/shared/ui/title'
import type { SanityImageSource } from '@sanity/asset-utils'
import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder'
import ClassNames from 'embla-carousel-class-names'
import type * as React from 'react'
import { EbookCard } from './ebooks/card'

type LinkComponentProps = {
  href: string
  children: React.ReactNode
  className?: string
}

type ImageComponentProps = {
  fill?: boolean
  className?: string
  src: string
  alt: string
  width?: number | `${number}`
  height?: number | `${number}`
  quality?: number | `${number}`
  priority?: boolean
  loading?: 'eager' | 'lazy' | undefined
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  unoptimized?: boolean
  overrideSrc?: string
  layout?: string
  objectFit?: string
  objectPosition?: string
  lazyBoundary?: string
  lazyRoot?: string
}

export type EbooksType = {
  type: 'grid' | 'carousel'
  appareance: 'small' | 'full'
  collection?: { _ref: string; _type: string }
  theme: keyof typeof Theme
  locale: string
  ebooks: Ebook[] | undefined
  title: string | undefined
  LinkComponent: React.ComponentType<LinkComponentProps>
  ImageComponent: React.ComponentType<ImageComponentProps>
  imageBuilder: (assets: SanityImageSource) => ImageUrlBuilder
}

const EbooksComponent = ({ value }: { value: EbooksType }) => {
  const {
    type,
    appareance,
    theme,
    ebooks,
    locale,
    title,
    LinkComponent,
    ImageComponent,
    imageBuilder,
  } = value

  if (!ebooks || ebooks.length === 0) return null

  if (type === 'grid') {
    return (
      <EbookGridComponent
        appareance={appareance}
        ebooks={ebooks}
        ImageComponent={ImageComponent}
        imageBuilder={imageBuilder}
        LinkComponent={LinkComponent}
        locale={locale}
        TitleComponent={Title}
        theme={theme}
        title={title}
      />
    )
  }

  if (type === 'carousel') {
    return (
      <EbookCarouselComponent
        appareance={value.appareance}
        ebooks={ebooks}
        ImageComponent={ImageComponent}
        imageBuilder={imageBuilder}
        LinkComponent={LinkComponent}
        locale={locale}
        theme={value.theme}
        title={title}
      />
    )
  }
}

const EbookGridComponent = ({
  ebooks,
  theme,
  appareance,
  locale,
  title,
  TitleComponent = Title,
  LinkComponent,
  ImageComponent,
  imageBuilder,
}: {
  ebooks: Ebook[] | undefined
  theme: EbooksType['theme']
  appareance: EbooksType['appareance']
  locale: string
  title?: string | undefined
  TitleComponent?: React.ComponentType<React.ComponentProps<typeof Title>>
  LinkComponent: React.ComponentType<LinkComponentProps>
  ImageComponent: React.ComponentType<ImageComponentProps>
  imageBuilder: (assets: SanityImageSource) => ImageUrlBuilder
}) => {
  const isMobile = useMediaQuery()
  const isTablet = useMediaQuery(1179)

  return (
    <div className="flex h-full w-full flex-col space-y-14">
      <div className="flex flex-col justify-center gap-10">
        {ebooks && (
          <div className="flex flex-wrap gap-10">
            {title && <TitleComponent variant={theme}>{title}</TitleComponent>}
            {ebooks?.map((ebook, _index) => (
              <div
                className={cn('w-full flex-none bg-white dark:bg-accent', {
                  'w-[48%]': !isMobile && !isTablet && appareance === 'full',
                })}
                key={ebook.id}
              >
                <EbookCard
                  full={appareance === 'full'}
                  ImageComponent={ImageComponent}
                  imageBuilder={imageBuilder}
                  item={ebook}
                  LinkComponent={LinkComponent}
                  locale={locale}
                  theme={theme}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const EbookCarouselComponent = ({
  ebooks,
  theme,
  appareance,
  locale,
  title,
  TitleComponent = Title,
  LinkComponent,
  ImageComponent,
  imageBuilder,
}: {
  ebooks: Ebook[] | undefined
  theme: EbooksType['theme']
  appareance: EbooksType['appareance']
  locale: string
  title?: string | undefined
  TitleComponent?: React.ComponentType<React.ComponentProps<typeof Title>>
  LinkComponent: React.ComponentType<LinkComponentProps>
  ImageComponent: React.ComponentType<ImageComponentProps>
  imageBuilder: (assets: SanityImageSource) => ImageUrlBuilder
}) => {
  return (
    <div className="flex h-full w-full flex-col space-y-14">
      <div className="flex flex-col gap-10">
        {title && <TitleComponent variant={theme}>{title}</TitleComponent>}
        <Carousel className="overflow-visible" plugins={[ClassNames()]}>
          <CarouselContent className="gap-4" rootClassName="overflow-visible">
            {ebooks?.map((ebook) => (
              <CarouselItem
                className="basis-full md:basis-1/2 lg:basis-1/2 xl:basis-1/2"
                key={ebook.id}
              >
                <EbookCard
                  full={appareance === 'full'}
                  ImageComponent={ImageComponent}
                  imageBuilder={imageBuilder}
                  item={ebook}
                  LinkComponent={LinkComponent}
                  locale={locale}
                  theme={theme}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselDots className="mt-4" theme={theme} />
        </Carousel>
      </div>
    </div>
  )
}

export { EbooksComponent }
