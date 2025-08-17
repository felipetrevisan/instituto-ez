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

type BlobBottomButtonProps = {
  label?: string
  icon?: React.ReactNode
  className?: string
  onClick?: () => void
}

export function BlobBottomButton({ label, icon, className, onClick }: BlobBottomButtonProps) {
  return (
    <>
      <motion.button
        className={cn(
          'after:-z-2 relative rounded-4xl bg-transparent px-6 py-3 font-semibold text-white transition-colors before:absolute before:top-0 before:left-0 before:z-1 before:h-full before:w-full before:rounded-4xl before:border-2 before:border-cyan-400 after:absolute after:top-[calc(2px*1.5)] after:left-[calc(2px*1.5)] after:h-full after:w-full after:rounded-4xl after:transition-all after:duration-[0.3s_0.2s] hover:rounded-4xl hover:text-zinc-500 hover:after:top-0 hover:after:left-0 hover:after:rounded-4xl hover:after:transition-all hover:after:duration-300',
          className,
        )}
        onClick={onClick}
      >
        <span className="relative z-10 flex text-sm">
          {icon && <div>{icon}</div>}
          <span className="ml-2 overflow-hidden whitespace-nowrap">{label}</span>
        </span>
        <span className='-z-1 absolute top-0 left-0 h-full w-full overflow-hidden rounded-4xl bg-white'>
          <span className="filter-[url('#goo')] relative block h-full">
            <span className="translate-3d hover:translate-z-0 supports-[filter:url('#goo')]:hover:translate-z-0 absolute top-[2px] left-[calc(0*(120%/4))] h-full w-[calc(100%/4)] translate-x-0 translate-y-[150%] rounded-full bg-cyan-300 transition-transform delay-[calc(0*0.08s)] duration-450 hover:scale-[1.7] supports-[filter:url('#goo')]:translate-x-0 supports-[filter:url('#goo')]:translate-y-[150%] supports-[filter:url('#goo')]:hover:scale-[1.4]:" />
            <span className="translate-3d hover:translate-z-0 supports-[filter:url('#goo')]:hover:translate-z-0 absolute top-[2px] left-[calc(1*(120%/4))] h-full w-[calc(100%/4)] translate-x-0 translate-y-[150%] rounded-full bg-cyan-300 transition-transform delay-[calc(1*0.08s)] duration-450 hover:scale-[1.7] supports-[filter:url('#goo')]:translate-x-0 supports-[filter:url('#goo')]:translate-y-[150%] supports-[filter:url('#goo')]:hover:scale-[1.4]:" />
            <span className="translate-3d hover:translate-z-0 supports-[filter:url('#goo')]:hover:translate-z-0 absolute top-[2px] left-[calc(2*(120%/4))] h-full w-[calc(100%/4)] translate-x-0 translate-y-[150%] rounded-full bg-cyan-300 transition-transform delay-[calc(2*0.08s)] duration-450 hover:scale-[1.7] supports-[filter:url('#goo')]:translate-x-0 supports-[filter:url('#goo')]:translate-y-[150%] supports-[filter:url('#goo')]:hover:scale-[1.4]:" />
            <span className="translate-3d hover:translate-z-0 supports-[filter:url('#goo')]:hover:translate-z-0 absolute top-[2px] left-[calc(3*(120%/4))] h-full w-[calc(100%/4)] translate-x-0 translate-y-[150%] rounded-full bg-cyan-300 transition-transform delay-[calc(3*0.08s)] duration-450 hover:scale-[1.7] supports-[filter:url('#goo')]:translate-x-0 supports-[filter:url('#goo')]:translate-y-[150%] supports-[filter:url('#goo')]:hover:scale-[1.4]:" />
          </span>
        </span>
      </motion.button>
      {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7"
              result="goo"
            />
            <feBlend in2="goo" in="SourceGraphic" result="mix" />
          </filter>
        </defs>
      </svg>
    </>
  )
}
