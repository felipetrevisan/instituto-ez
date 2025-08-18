'use client'

import { cn, getLink } from '@ez/shared/lib/utils'
import { Card, CardFooter, type CardProps } from '@ez/shared/ui/card'
import { ButtonLink } from '@ez/web/components/app'
import { urlForImage } from '@ez/web/config/image'
import type { Workshop } from '@ez/web/types/workshop'
import { getLocalizedLink } from '@ez/web/utils/get-localized-link'
import { motion } from 'motion/react'
import { useLocale } from 'next-intl'

type Props = {
  item: Workshop
} & CardProps

const MotionCard = motion(Card)

export function WorkshopCard({
  item: { background, title, subtitle, button, disabled },
  className,
}: Props) {
  const locale = useLocale()
  const backgroundClass = background ? `url('${urlForImage(background.asset)}')` : 'transparent'

  const link = !disabled ? getLink(button) : false

  const CardRender = () => (
    <MotionCard
      variant="ghost"
      className={cn(
        'relative flex h-96 w-[70vw] shrink items-end justify-center rounded-xl bg-card bg-cover! shadow-2xl md:w-160 md:shrink-0 lg:w-80',
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
    >
      <CardFooter className='flex h-28 w-[calc(100%-10px)] flex-col items-center justify-center gap-4 rounded-2xl border border-white/40 bg-black/80 p-4 font-oswald backdrop-blur-xl'>
        <span className='text-center font-bold text-2xl text-orange-400'>{title}</span>
        {subtitle && <span className='font-bold text-2xl text-white'>{subtitle}</span>}
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
