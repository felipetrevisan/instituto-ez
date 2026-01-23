'use client'

import { cn, getLink } from '@ez/shared/lib/utils'
import type { Ebook } from '@ez/shared/types/ebook'
import type { Theme } from '@ez/shared/types/global'
import { Button } from '@ez/shared/ui/button'
import { Card, CardContent, CardHeader, type CardProps } from '@ez/shared/ui/card'
import { ScrollArea } from '@ez/shared/ui/scroll-area'
import type { SanityImageSource } from '@sanity/asset-utils'
import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder'
import { motion } from 'motion/react'

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

type Props = {
  item: Ebook
  full?: boolean
  theme: keyof typeof Theme
  locale: string
  LinkComponent: React.ComponentType<LinkComponentProps>
  ImageComponent: React.ComponentType<ImageComponentProps>
  imageBuilder: (assets: SanityImageSource) => ImageUrlBuilder
} & CardProps

const MotionCard = motion(Card)

export function EbookCard({
  item: { image, slug, title, description, button, disabled },
  full = false,
  theme,
  locale,
  LinkComponent,
  ImageComponent,
  imageBuilder,
  className,
}: Props) {
  const backgroundClass = image?.[locale].preview
    ? `url('${imageBuilder(image?.[locale].preview.asset)}') no-repeat center center / cover`
    : 'transparent'

  const link = !disabled && button ? getLink(button, locale) : false

  const CardRender = () => (
    <div className="relative w-fit">
      {disabled && (
        <div
          className={cn('ribbon font-bold text-base text-white filter-none', {
            'ribbon-primary': theme === 'default',
            'ribbon-secondary': theme === 'secondary',
            'ribbon-tertiary': theme === 'tertiary',
          })}
        >
          Em breve
        </div>
      )}
      <MotionCard
        animate={{
          transition: { duration: 0.4, ease: 'easeInOut' },
        }}
        className={cn(
          'relative flex h-96 w-[70vw] shrink flex-col items-end justify-center bg-card shadow-2xl md:w-80 md:shrink-0 md:flex-row lg:w-80 dark:shadow-none',
          {
            'pointer-events-none select-none opacity-80 grayscale-100': disabled,
          },
          className,
        )}
        style={{
          background: backgroundClass,
        }}
        theme={theme}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        variant="ghost"
        whileHover={{ scale: disabled ? 1 : 1.1 }}
        whileTap={{ scale: disabled ? 1 : 0.9 }}
      />
    </div>
  )

  const CardFullRender = () => {
    const backgroundClass = image?.[locale].background
      ? `url('${imageBuilder(image?.[locale].background.asset)}') repeat`
      : 'transparent'

    return (
      <div className="relative w-full">
        <div
          className={cn(
            'item-center ribbon -mt-7 flex justify-center p-5 text-center font-bold text-base uppercase',
            {
              'ribbon-primary': theme === 'default',
              'ribbon-secondary': theme === 'secondary',
              'ribbon-tertiary': theme === 'tertiary',
            },
          )}
        >
          {title?.[locale]}
        </div>
        <MotionCard
          className={cn(
            'relative flex h-full w-full shrink flex-col justify-center overflow-hidden border-primary/50 shadow-xl md:h-[400px] md:max-h-[400px]border-1! md:min-h-[400px] md:shrink-0 md:flex-row dark:shadow-none',
            {
              'pointer-events-none select-none opacity-80 grayscale-[85%]': disabled,
              'md:flex-col': !description?.[locale],
              'rounded-t-2xl': button,
              'rounded-2xl': !button,
            },
            className,
          )}
          theme={theme}
          variant="ghost"
        >
          {image?.[locale].preview && (
            <CardHeader
              className={cn(
                'relative aspect-[2/3] h-[40vh] overflow-visible p-0 md:aspect-[1/2] md:h-full lg:aspect-[2/3] lg:w-[200px] lg:w-full',
                { 'bg-[#f5f5f5] md:w-full dark:bg-gray-900': !description?.[locale] },
              )}
              style={{
                background: backgroundClass,
                backgroundSize: 'contain',
              }}
            >
              <motion.div
                className={cn('absolute inset-0 overflow-visible md:h-full md:w-full', {
                  'md:w-full': !description?.[locale],
                })}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                variants={{
                  hover: { scale: 1.2 },
                  initial: { scale: 1 },
                }}
              >
                <ImageComponent
                  alt=""
                  blurDataURL={image?.[locale].preview.metadata.lqip}
                  className={cn('h-max rounded-xl object-cover md:object-contain')}
                  fill
                  placeholder="blur"
                  priority
                  src={imageBuilder(image?.[locale].preview.asset).url()}
                />
              </motion.div>
            </CardHeader>
          )}
          <CardContent className="relative flex w-full flex-col gap-4 p-0 md:py-10">
            {description?.[locale] && (
              <ScrollArea className="overflow-auto! md:-ml-10 md:max-h-[315px]">
                <div className="pointer-events-none absolute bottom-0 z-10 h-6 w-full bg-gradient-to-t from-bg-gray-800/90 to-transparent dark:from-bg-gray-900/90" />
                <div className="p-5 text-justify dark:text-primary-foreground">
                  {description?.[locale]}
                </div>
              </ScrollArea>
            )}
            {button && (
              <>
                {link && (
                  <LinkComponent href={`/${locale}/ebooks/${slug?.[locale].current}`}>
                    <div className="item-center lg:-right-[76px] md:-right-[86px] md:-bottom-[24px] flex h-[80px] w-full justify-center overflow-hidden md:absolute">
                      <Button
                        className="md:-translate-x-1/2 mb-10 md:absolute md:bottom-5 md:left-1/2 md:m-0 lg:w-3/4"
                        disabled={disabled}
                        fullWidth
                        rounded="full"
                        scaleEffect={false}
                        size="xl"
                        theme={theme}
                      >
                        {!disabled ? button.label?.[locale] : 'Em breve'}
                      </Button>
                    </div>
                  </LinkComponent>
                )}
                {!link && (
                  <div className="item-center lg:-right-[76px] md:-right-[86px] md:-bottom-[24px] absolute flex h-[80px] w-full justify-center overflow-hidden">
                    <Button
                      disabled={disabled}
                      fullWidth
                      rounded="2xl"
                      scaleEffect={false}
                      size="lg"
                      theme={theme}
                    >
                      {!disabled ? button.label?.[locale] : 'Em breve'}
                    </Button>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </MotionCard>
      </div>
    )
  }

  return (
    <>
      {link && !full ? (
        <LinkComponent href={`/${locale}/ebooks/${slug?.[locale].current}`}>
          <CardRender />
        </LinkComponent>
      ) : full ? (
        <CardFullRender />
      ) : (
        <CardRender />
      )}
    </>
  )
}
