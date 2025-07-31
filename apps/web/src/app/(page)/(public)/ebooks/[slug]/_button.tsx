import { cn } from '@ez/shared/lib/utils'
import { motion } from 'framer-motion'
import { useState } from 'react'

type AnimatedValue = {
  [key: string]: {
    initial: number
    hovered: number
  }
}

type AnimatedButtonProps = {
  label?: string
  icon?: React.ReactNode
  width?: number
  justify?: 'center' | 'start' | 'end'
  animateMaps: AnimatedValue
  className?: string
  onClick?: () => void
}

export function AnimatedButton({
  label = 'Voltar para o Catálogo',
  icon = null,
  width = 160,
  justify = 'start',
  animateMaps,
  className,
  onClick,
}: AnimatedButtonProps) {
  const [hovered, setHovered] = useState(false)

  function getAnimationState(map: AnimatedValue, hovered: boolean) {
    return Object.fromEntries(
      Object.entries(map).map(([key, values]) => [key, hovered ? values.hovered : values.initial]),
    )
  }

  return (
    <motion.button
      className={cn(
        'flex items-center bg-white text-primary border-primary font-bold py-3 rounded-full shadow-lg overflow-hidden cursor-pointer',
        className,
      )}
      style={{ width, justifyContent: justify }}
      initial={{ width: 48, paddingLeft: 20, scale: 1 }}
      animate={getAnimationState(animateMaps, hovered)}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onClick}
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
          opacity: hovered ? 1 : 0,
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
