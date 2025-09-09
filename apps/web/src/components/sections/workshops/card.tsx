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
  const backgroundClass = background
    ? `url('${urlForImage(background.asset).format('webp').quality(80)}')`
    : 'transparent'

  const link = !disabled ? getLink(button, locale) : false

  const CardRender = () => (
    <MotionCard
      animate={{
        transition: { duration: 0.4, ease: 'easeInOut' },
      }}
      className={cn(
        'relative flex h-96 shrink-0 items-end justify-center rounded-xl bg-card bg-cover! shadow-2xl',
        {
          'pointer-events-none select-none opacity-80 grayscale-100': disabled,
        },
        className,
      )}
      style={{
        background: backgroundClass,
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      variant="ghost"
      whileHover={{ scale: disabled ? 1 : 1.1 }}
      whileTap={{ scale: disabled ? 1 : 0.9 }}
    >
      <CardFooter className="flex h-28 w-[calc(100%-10px)] flex-col items-center justify-center gap-4 rounded-2xl border border-white/40 bg-black/80 p-4 font-oswald backdrop-blur-xl">
        <span className="text-center font-bold text-orange-400 text-xl">{title?.[locale]}</span>
        {subtitle?.[locale] && (
          <span className="font-bold text-lg text-white">{subtitle?.[locale]}</span>
        )}
      </CardFooter>
    </MotionCard>
  )

  return (
    <>
      {link ? (
        <ButtonLink href={getLocalizedLink(locale, link)} passHref>
          <CardRender />
        </ButtonLink>
      ) : (
        <CardRender />
      )}
    </>
  )
}
