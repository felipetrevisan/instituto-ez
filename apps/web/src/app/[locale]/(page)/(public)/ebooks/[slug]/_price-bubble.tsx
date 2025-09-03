'use client'

import { cn } from '@ez/shared/lib/utils'
import { CountingNumber } from '@ez/shared/ui/animated/counter'
import type { Price } from '@ez/web/types/ebook'
import { motion } from 'motion/react'

export default function PriceBubble({ price }: { price: Price }) {
  const isFree =
    typeof price?.regular === 'number' && (price?.regular === 0 || price?.priceWithDiscount === 0)

  return (
    <div className="relative flex items-center justify-center">
      <motion.div
        className="relative"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.1, 1], rotate: [0, 5, -5, 0] }}
        transition={{
          duration: 0.8,
          ease: 'easeInOut',
          repeat: 1,
        }}
      >
        {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="256"
          height="256"
          viewBox="0 0 200 200"
          className="relative size-[400px] drop-shadow-2xl"
        >
          <defs>
            <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              {isFree ? (
                <>
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </>
              ) : (
                <>
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#facc15" />
                </>
              )}
            </linearGradient>
          </defs>

          <motion.polygon
            points="100,5 114,47 148,18 139,61 182,53 153,86 195,100 153,114 182,148 139,139 148,182 114,153 100,195 86,153 52,182 61,139 18,148 47,114 5,100 47,86 18,53 61,61 52,18 86,47"
            fill="url(#starGradient)"
            stroke={isFree ? '#92ff8a' : '#000'}
            strokeWidth="3"
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: 'circInOut' }}
          />
        </motion.svg>
        <div className="-translate-1/2 absolute top-1/2 left-1/2 flex flex-col gap-4">
          {price?.hasDiscount && typeof price?.priceWithDiscount === 'number' && (
            <motion.span
              className={cn(
                'flex flex-row items-center justify-center gap-2 text-center font-bold font-oswald text-3xl text-black drop-shadow-xl [--tw-drop-shadow-color:_var(--secondary-c)] [-webkit-text-fill-color:_#000] [-webkit-text-stroke:_1px_var(--primary-c)]',
                {
                  'text-white drop-shadow-xl [--tw-drop-shadow-color:_#92ff8a] [-webkit-text-fill-color:_#92ff8a] [-webkit-text-stroke:_1px_#98b41e]':
                    isFree,
                },
              )}
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.1] }}
              transition={{ type: 'spring', stiffness: 150, damping: 22 }}
            >
              <span className="text-left text-lg">DE</span>
              <span className="relative w-auto text-right text-xl">
                R${' '}
                <CountingNumber
                  number={Number(price.regular)}
                  decimalPlaces={2}
                  decimalSeparator=","
                />
                <motion.span
                  className="-rotate-12 absolute top-1/2 left-0 h-[3px] w-full bg-red-600"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                />
              </span>
            </motion.span>
          )}
          {typeof price?.regular === 'number' && (
            <div className="flex h-full w-full justify-center">
              {price?.hasDiscount && (
                <motion.span
                  className={cn(
                    'flex flex-col items-center justify-center gap-2 text-center font-bold font-oswald text-3xl text-black drop-shadow-xl [--tw-drop-shadow-color:_var(--secondary-c)] [-webkit-text-fill-color:_#000] [-webkit-text-stroke:_1px_var(--primary-c)]',
                    {
                      'text-white drop-shadow-xl [--tw-drop-shadow-color:_#92ff8a] [-webkit-text-fill-color:_#92ff8a] [-webkit-text-stroke:_1px_#98b41e]':
                        isFree,
                    },
                  )}
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.1] }}
                  transition={{ type: 'spring', stiffness: 150, damping: 22 }}
                >
                  {isFree ? (
                    <motion.span
                      className="text-4xl"
                      animate={{ y: [0, -10, 0] }}
                      transition={{
                        duration: 0.6,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: 'loop',
                        ease: 'easeInOut',
                      }}
                    >
                      Grátis
                    </motion.span>
                  ) : (
                    <>
                      <span className="text-xl">POR</span>
                      <span className="w-[300px] text-3xl">
                        R${' '}
                        <CountingNumber
                          number={Number(price.priceWithDiscount)}
                          decimalPlaces={2}
                          decimalSeparator=","
                        />
                      </span>
                    </>
                  )}
                </motion.span>
              )}
              {!price?.hasDiscount && (
                <motion.span
                  className={cn(
                    'flex flex-col items-center justify-center gap-2 text-center font-bold font-oswald text-3xl text-black drop-shadow-xl [--tw-drop-shadow-color:_var(--secondary-c)] [-webkit-text-fill-color:_#000] [-webkit-text-stroke:_1px_var(--primary-c)]',
                    {
                      'text-white drop-shadow-xl [--tw-drop-shadow-color:_#92ff8a] [-webkit-text-fill-color:_#92ff8a] [-webkit-text-stroke:_1px_#98b41e]':
                        isFree,
                    },
                  )}
                >
                  {isFree ? (
                    <motion.span className="text-4xl">Grátis</motion.span>
                  ) : (
                    <>
                      <span className="text-3xl">Apenas</span>
                      <span className="w-[300px]">
                        R${' '}
                        <CountingNumber
                          number={price.regular}
                          decimalPlaces={2}
                          decimalSeparator=","
                        />
                      </span>
                    </>
                  )}
                </motion.span>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
