'use client'

import { cn, getLink } from '@ez/shared/lib/utils'
import type { Theme } from '@ez/shared/types/global'
import { Button } from '@ez/shared/ui/button'
import { Card, CardContent, CardHeader, type CardProps } from '@ez/shared/ui/card'
import { ScrollArea } from '@ez/shared/ui/scroll-area'
import { ButtonLink } from '@ez/web/components/app'
import { urlForImage } from '@ez/web/config/image'
import type { Ebook } from '@ez/web/types/ebook'
import { motion } from 'framer-motion'
import Image from 'next/image'

import './styles.css'

type Props = {
  item: Ebook
  full?: boolean
  theme: keyof typeof Theme
} & CardProps

const MotionCard = motion(Card)

export function EbookCard({
  item: { image, slug, title, subtitle, description, button, disabled },
  full = false,
  theme,
  className,
}: Props) {
  const backgroundClass = image.preview
    ? `url('${urlForImage(image.preview.asset)}') no-repeat center center / cover`
    : 'transparent'

  const link = !disabled && button ? getLink(button) : false

  const CardRender = () => (
    <div className="relative w-fit">
      {disabled && (
        <div
          className={cn('text-base font-bold text-white ribbon filter-none', {
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
          'flex flex-col md:flex-row items-end justify-center shrink md:shrink-0 bg-card w-[70vw] md:w-80 lg:w-80 h-96 relative shadow-2xl',
          {
            'grayscale-100 opacity-80 select-none pointer-events-none': disabled,
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
      ? `url('${urlForImage(image.background.asset)}') repeat`
      : 'transparent'

    return (
      <div className="relative w-full">
        <div
          className={cn(
            'flex justify-center item-center ribbon text-base font-bold uppercase -mt-7 p-5 text-center',
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
            'flex flex-col md:flex-row justify-center shrink md:shrink-0 relative shadow-xl w-full h-full md:min-h-[400px] md:h-[400px] md:max-h-[400px]border-1! border-primary/50 overflow-hidden',
            {
              'grayscale-[85%] opacity-80 select-none pointer-events-none': disabled,
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
                'relative h-[40vh] md:h-full overflow-visible p-0 aspect-[2/3] md:aspect-[1/2] lg:aspect-[2/3]',
                { 'bg-[#f5f5f5] md:w-full': !description },
              )}
              style={{
                background: backgroundClass,
                backgroundSize: 'contain',
              }}
            >
              <motion.div
                className={cn('absolute inset-0 overflow-visible md:w-full md:h-full', {
                  'md:w-full': !description,
                })}
                variants={{
                  hover: { scale: 1.2 },
                  initial: { scale: 1 },
                }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              >
                <Image
                  src={urlForImage(image.preview.asset).url()}
                  alt=""
                  fill
                  placeholder="blur"
                  blurDataURL={image.preview.metadata.lqip}
                  className={cn('object-cover md:object-contain h-max rounded-xl')}
                />
              </motion.div>
            </CardHeader>
          )}
          <CardContent className="relative flex flex-col p-0 gap-4 w-full">
            {description && (
              <ScrollArea className="md:max-h-[315px] overflow-auto">
                <div className="absolute bottom-0 h-6 w-full pointer-events-none bg-gradient-to-t from-white/90 to-transparent z-10" />
                <div className="p-5 text-justify">{description}</div>
              </ScrollArea>
            )}

            {button && (
              <>
                {link && (
                  <ButtonLink href={`/ebooks/${slug}`} passHref>
                    <div className="flex justify-center item-center overflow-hidden">
                      <Button
                        disabled={disabled}
                        theme={theme}
                        fullWidth
                        size="xl"
                        className="mb-10 md:m-0 md:absolute md:bottom-5 md:left-1/2 md:-translate-x-1/2 w-3/4"
                        rounded="2xl"
                        scaleEffect={false}
                      >
                        {!disabled ? button.label : 'Em breve'}
                      </Button>
                    </div>
                  </ButtonLink>
                )}
                {!link && (
                  <div className="flex justify-center item-center overflow-hidden">
                    <Button
                      disabled={disabled}
                      theme={theme}
                      fullWidth
                      size="xl"
                      className="mb-10 md:m-0 md:absolute md:bottom-5 md:left-1/2 md:-translate-x-1/2 w-3/4"
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
        <ButtonLink href={`/ebooks/${slug}`} passHref>
          <CardRender />
        </ButtonLink>
      ) : (
        <>{full ? <CardFullRender /> : <CardRender />}</>
      )}
    </>
  )
}
