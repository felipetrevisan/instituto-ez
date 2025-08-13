'use client'

import { cn, getLink } from '@ez/shared/lib/utils'
import type { Ebook } from '@ez/shared/types/ebook'
import type { Theme } from '@ez/shared/types/global'
import { Button } from '@ez/shared/ui/button'
import { Card, CardContent, CardHeader, type CardProps } from '@ez/shared/ui/card'
import { ScrollArea } from '@ez/shared/ui/scroll-area'
import type { SanityImageSource } from '@sanity/asset-utils'
import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder'
import { motion } from 'framer-motion'

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
  const backgroundClass = image.preview
    ? `url('${imageBuilder(image.preview.asset)}') no-repeat center center / cover`
    : 'transparent'

  const link = !disabled && button ? getLink(button) : false

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
        variant="ghost"
        theme={theme}
        className={cn(
          'relative flex h-96 w-[70vw] shrink flex-col items-end justify-center bg-card shadow-2xl md:w-80 md:shrink-0 md:flex-row lg:w-80',
          {
            'pointer-events-none select-none opacity-80 grayscale-100': disabled,
          },
          className,
        )}
        style={{
          background: backgroundClass,
        }}
        whileHover={{ scale: disabled ? 1 : 1.1 }}
        whileTap={{ scale: disabled ? 1 : 0.9 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        animate={{
          transition: { duration: 0.4, ease: 'easeInOut' },
        }}
      />
    </div>
  )

  const CardFullRender = () => {
    const backgroundClass = image.background
      ? `url('${imageBuilder(image.background.asset)}') repeat`
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
          {title}
        </div>
        <MotionCard
          variant="ghost"
          theme={theme}
          className={cn(
            'relative flex h-full w-full shrink flex-col justify-center overflow-hidden border-primary/50 shadow-xl md:h-[400px] md:max-h-[400px]border-1! md:min-h-[400px] md:shrink-0 md:flex-row',
            {
              'pointer-events-none select-none opacity-80 grayscale-[85%]': disabled,
              'md:flex-col': !description,
              'rounded-t-2xl': button,
              'rounded-2xl': !button,
            },
            className,
          )}
        >
          {image.preview && (
            <CardHeader
              className={cn(
                'relative aspect-[2/3] h-[40vh] overflow-visible p-0 md:aspect-[1/2] md:h-full lg:aspect-[2/3]',
                { 'bg-[#f5f5f5] md:w-full': !description },
              )}
              style={{
                background: backgroundClass,
                backgroundSize: 'contain',
              }}
            >
              <motion.div
                className={cn('absolute inset-0 overflow-visible md:h-full md:w-full', {
                  'md:w-full': !description,
                })}
                variants={{
                  hover: { scale: 1.2 },
                  initial: { scale: 1 },
                }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              >
                <ImageComponent
                  src={imageBuilder(image.preview.asset).url()}
                  alt=""
                  fill
                  placeholder="blur"
                  blurDataURL={image.preview.metadata.lqip}
                  className={cn('h-max rounded-xl object-cover md:object-contain')}
                />
              </motion.div>
            </CardHeader>
          )}
          <CardContent className='relative flex w-full flex-col gap-4 p-0'>
            {description && (
              <ScrollArea className='overflow-auto md:max-h-[315px]'>
                <div className='pointer-events-none absolute bottom-0 z-10 h-6 w-full bg-gradient-to-t from-white/90 to-transparent' />
                <div className="p-5 text-justify">{description}</div>
              </ScrollArea>
            )}
            {button && (
              <>
                {link && (
                  <LinkComponent href={`/${locale}/ebooks/${slug}`}>
                    <div className='item-center flex justify-center overflow-hidden'>
                      <Button
                        disabled={disabled}
                        theme={theme}
                        fullWidth
                        size="xl"
                        className='md:-translate-x-1/2 mb-10 w-3/4 md:absolute md:bottom-5 md:left-1/2 md:m-0'
                        rounded="2xl"
                        scaleEffect={false}
                      >
                        {!disabled ? button.label : 'Em breve'}
                      </Button>
                    </div>
                  </LinkComponent>
                )}
                {!link && (
                  <div className='item-center flex justify-center overflow-hidden'>
                    <Button
                      disabled={disabled}
                      theme={theme}
                      fullWidth
                      size="xl"
                      className='md:-translate-x-1/2 mb-10 w-3/4 md:absolute md:bottom-5 md:left-1/2 md:m-0'
                      rounded="2xl"
                      scaleEffect={false}
                    >
                      {!disabled ? button.label : 'Em breve'}
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
        <LinkComponent href={`/${locale}/ebooks/${slug}`}>
          <CardRender />
        </LinkComponent>
      ) : (
        <>{full ? <CardFullRender /> : <CardRender />}</>
      )}
    </>
  )
}
