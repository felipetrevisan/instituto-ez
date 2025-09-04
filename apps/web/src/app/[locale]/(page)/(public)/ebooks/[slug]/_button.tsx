'use client'

import { cn } from '@ez/shared/lib/utils'
import { useIsMobile } from '@ez/web/hooks/use-mobile'
import { motion } from 'motion/react'
import { useState } from 'react'

type AnimatedValue = {
  [key: string]: {
    initial: number | string
    hovered: number | string
  }
}

type AnimatedButtonProps = {
  label?: string
  icon?: React.ReactNode
  width?: number
  justify?: 'center' | 'start' | 'end'
  animateMaps: AnimatedValue
  className?: string
  onClickAction?: () => void
}

export function AnimatedButton({
  label = 'Voltar para o Catálogo',
  icon = null,
  width = 160,
  justify = 'start',
  animateMaps,
  className,
  onClickAction,
}: AnimatedButtonProps) {
  const [hovered, setHovered] = useState(false)
  const isMobile = useIsMobile(640)

  function getAnimationState(map: AnimatedValue, hovered: boolean) {
    return Object.fromEntries(
      Object.entries(map).map(([key, values]) => [key, hovered ? values.hovered : values.initial]),
    )
  }

  return (
    <motion.button
      className={cn(
        'flex w-full cursor-pointer items-center overflow-hidden rounded-full border-primary bg-white py-3 font-bold text-primary shadow-lg sm:w-auto',
        className,
      )}
      style={{ justifyContent: isMobile ? 'center' : justify, width }}
      initial={{ width: isMobile ? '100%' : 48, paddingLeft: isMobile ? 0 : 20, scale: 1 }}
      animate={getAnimationState(animateMaps, hovered)}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onClickAction}
    >
      {icon && (
        <motion.div
          animate={{ margin: hovered ? 0 : -7 }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 20,
            bounce: 0.4,
            delay: 0.05,
          }}
        >
          {icon}
        </motion.div>
      )}
      <motion.span
        className="ml-2 overflow-hidden whitespace-nowrap"
        animate={{
          opacity: hovered || isMobile ? 1 : 0,
          x: hovered ? 0 : -10,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 20,
          bounce: 0.4,
          delay: 0.05,
        }}
      >
        {label}
      </motion.span>
    </motion.button>
  )
}
