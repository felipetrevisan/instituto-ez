'use client'

import { cn, getLink } from '@ez/shared/lib/utils'
import { Button } from '@ez/shared/ui/button'
import { Card, CardFooter, type CardProps } from '@ez/shared/ui/card'
import { Carousel, CarouselContent, CarouselItem } from '@ez/shared/ui/carousel'
import { ButtonLink } from '@ez/web/components/app'
import { urlForImage } from '@ez/web/config/image'
import type { Service } from '@ez/web/types/service'
import { getLocalizedLink } from '@ez/web/utils/get-localized-link'
import Autoplay from 'embla-carousel-autoplay'
import ClassNames from 'embla-carousel-class-names'
import { motion } from 'motion/react'
import { useLocale } from 'next-intl'

type Props = {
  item: Service
} & CardProps

const MotionCard = motion(Card)

export function ServiceCard({ item: { image, title, button, disabled }, className }: Props) {
  const locale = useLocale()
  const backgroundClass = image ? `url('${urlForImage(image.asset)}')` : 'transparent'

  const link = !disabled ? getLink(button) : false

  const CardRender = () => (
    <MotionCard
      variant="ghost"
      className={cn(
        'relative flex h-[400px] w-[70vw] shrink items-end justify-center rounded-xl bg-card bg-cover! shadow-2xl md:w-160 md:shrink-0',
        {
          'pointer-events-none select-none opacity-80 grayscale-100': disabled,
        },
        className,
      )}
      style={{
        background: backgroundClass,
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      animate={{
        transition: { duration: 0.4, ease: 'easeInOut' },
      }}
    >
      <CardFooter className='flex h-20 w-full flex-col justify-center gap-4 rounded-2xl bg-black/50 p-4 font-oswald backdrop-blur-2xl'>
        <Carousel
          opts={{ loop: true, duration: 30 }}
          plugins={[ClassNames(), Autoplay({ playOnInit: true, delay: 3000 })]}
        >
          <CarouselContent>
            <CarouselItem className='flex basis-full items-center justify-center'>
              <span className='text-center font-semibold text-orange-400 text-xl'>{title}</span>
            </CarouselItem>
            {button.visible && (
              <CarouselItem className='flex basis-full items-center justify-center'>
                <Button
                  variant="default"
                  theme="tertiary"
                  rounded="xl"
                  size="2xl"
                  className='w-full font-bold uppercase'
                  disabled={button.disabled}
                  effect="none"
                  scaleEffect={false}
                >
                  {button.label}
                </Button>
              </CarouselItem>
            )}
          </CarouselContent>
        </Carousel>
      </CardFooter>
    </MotionCard>
  )

  return (
    <>
      {link ? (
        <ButtonLink href={getLocalizedLink(locale, link)}  passHref>
          <CardRender />
        </ButtonLink>
      ) : (
        <CardRender />
      )}
    </>
  )
}
