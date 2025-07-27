'use client'

import { cn, getLink } from '@ez/shared/lib/utils'
import { Card, CardFooter, type CardProps } from '@ez/shared/ui/card'
import { ButtonLink } from '@ez/web/components/app'
import { urlForImage } from '@ez/web/config/image'
import type { Workshop } from '@ez/web/types/workshop'
import { motion } from 'framer-motion'

type Props = {
  item: Workshop
} & CardProps

const MotionCard = motion(Card)

export function WorkshopCard({
  item: { background, title, subtitle, button, disabled },
  className,
}: Props) {
  const backgroundClass = background ? `url('${urlForImage(background.asset)}')` : 'transparent'

  const link = !disabled ? getLink(button) : false

  const CardRender = () => (
    <MotionCard
      variant="ghost"
      className={cn(
        'flex items-end justify-center shrink md:shrink-0 rounded-xl bg-card w-[70vw] md:w-160 lg:w-80 h-96 relative bg-cover! shadow-2xl',
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
    >
      <CardFooter className="bg-black/80 flex flex-col justify-center items-center gap-4 p-4 w-[calc(100%-10px)] h-28 rounded-2xl font-oswald border border-white/40 backdrop-blur-xl">
        <span className="text-orange-400 font-bold text-2xl text-center">{title}</span>
        {subtitle && <span className="text-white font-bold text-2xl">{subtitle}</span>}
      </CardFooter>
    </MotionCard>
  )

  return (
    <>
      {link ? (
        <ButtonLink href={link} passHref>
          <CardRender />
        </ButtonLink>
      ) : (
        <CardRender />
      )}
    </>
  )
}
