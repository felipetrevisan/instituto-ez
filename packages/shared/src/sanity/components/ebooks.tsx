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
  ebooks: Ebook[] | undefined
  title: string | undefined
  LinkComponent: React.ComponentType<LinkComponentProps>
  ImageComponent: React.ComponentType<ImageComponentProps>
  imageBuilder: (assets: SanityImageSource) => ImageUrlBuilder
}

const EbooksComponent = ({ value }: { value: EbooksType }) => {
  const { type, appareance, theme, ebooks, title, LinkComponent, ImageComponent, imageBuilder } = value

  if (!ebooks || ebooks.length === 0) return null

  if (type === 'grid') {
    return (
      <EbookGridComponent
        ebooks={ebooks}
        theme={theme}
        appareance={appareance}
        title={title}
        LinkComponent={LinkComponent}
        ImageComponent={ImageComponent}
        imageBuilder={imageBuilder}
      />
    )
  }

  if (type === 'carousel') {
    return (
      <EbookCarouselComponent
        ebooks={ebooks}
        theme={value.theme}
        appareance={value.appareance}
        title={title}
        LinkComponent={LinkComponent}
        ImageComponent={ImageComponent}
        imageBuilder={imageBuilder}
      />
    )
  }
}

const EbookGridComponent = ({
  ebooks,
  theme,
  appareance,
  title,
  TitleComponent = Title,
  LinkComponent,
  ImageComponent,
  imageBuilder,
}: {
  ebooks: Ebook[] | undefined
  theme: EbooksType['theme']
  appareance: EbooksType['appareance']
  title?: string | undefined
  TitleComponent?: React.ComponentType<{ children: React.ReactNode }>
  LinkComponent: React.ComponentType<LinkComponentProps>
  ImageComponent: React.ComponentType<ImageComponentProps>
  imageBuilder: (assets: SanityImageSource) => ImageUrlBuilder
}) => {
  return (
    <div className="flex flex-col w-full h-full space-y-14">
      <div className="flex flex-col justify-center gap-10">
        {ebooks && (
          <>
            {title && <TitleComponent>{title}</TitleComponent>}
            <div
              className={cn('grid gap-12 gap-y-12 place-items-center grid-cols-1', {
                'md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2': appareance === 'full',
                'md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4': appareance === 'small',
              })}
            >
              {ebooks?.map((ebook, _index) => (
                <EbookCard
                  item={ebook}
                  full={appareance === 'full'}
                  key={ebook.id}
                  theme={theme}
                  LinkComponent={LinkComponent}
                  ImageComponent={ImageComponent}
                  imageBuilder={imageBuilder}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

const EbookCarouselComponent = ({
  ebooks,
  theme,
  appareance,
  title,
  TitleComponent = Title,
  LinkComponent,
  ImageComponent,
  imageBuilder,
}: {
  ebooks: Ebook[] | undefined
  theme: EbooksType['theme']
  appareance: EbooksType['appareance']
  title?: string | undefined
  TitleComponent?: React.ComponentType<{ children: React.ReactNode }>
  LinkComponent: React.ComponentType<LinkComponentProps>
  ImageComponent: React.ComponentType<ImageComponentProps>
  imageBuilder: (assets: SanityImageSource) => ImageUrlBuilder
}) => {
  return (
    <div className="flex flex-col w-full h-full space-y-14">
      <div className="flex flex-col justify-center gap-10">
        {title && <TitleComponent>{title}</TitleComponent>}
        <Carousel plugins={[ClassNames()]} className="overflow-visible">
          <CarouselContent className="gap-4" rootClassName="overflow-visible">
            {ebooks?.map((ebook) => (
              <CarouselItem
                key={ebook.id}
                className="basis-full md:basis-1/2 lg:basis-1/2 xl:basis-1/2"
              >
                <EbookCard
                  item={ebook}
                  full={appareance === 'full'}
                  theme={theme}
                  LinkComponent={LinkComponent}
                  ImageComponent={ImageComponent}
                  imageBuilder={imageBuilder}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselDots theme={theme} className="mt-4" />
        </Carousel>
      </div>
    </div>
  )
}

export { EbooksComponent }
