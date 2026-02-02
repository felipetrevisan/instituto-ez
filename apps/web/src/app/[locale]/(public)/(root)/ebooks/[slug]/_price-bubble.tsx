'use client'

import { cn } from '@ez/shared/lib/utils'
import { CountingNumber } from '@ez/shared/ui/animated/text/counter'
import type { Price, ThemeEbook } from '@ez/web/types/ebook'
import { motion } from 'motion/react'
import { useLocale, useTranslations } from 'next-intl'

type CSSVariables = {
  [key: `--${string}`]: string
}

export default function PriceBubble({ price, theme }: { price: Price; theme?: ThemeEbook }) {
  const locale = useLocale()
  const t = useTranslations('Ebooks')

  const isFree =
    typeof price?.regular.price === 'number' &&
    (price?.regular.price === 0 || (price.hasDiscount && price?.discount?.price === 0))

  const primary = theme?.primary?.hex ?? 'var(--primary, #18e2e2)'
  const secondary = theme?.secondary?.hex ?? 'var(--secondary, #06b6d4)'
  const text = 'var(--primary-foreground, #ffffff)'
  const border = theme?.text?.hex ?? 'var(--text, #0f172a)'

  const style: React.CSSProperties & CSSVariables = {
    '--price-stroke-c': text,
    '--price-fill-c': text,
    '--price-border-c': border,
  }

  return (
    <div className="relative flex items-center justify-center" style={style}>
      <motion.div
        animate={{ scale: [0, 1.1, 1], rotate: [0, 5, -5, 0] }}
        className="relative"
        initial={{ scale: 0 }}
        transition={{
          duration: 0.8,
          ease: 'easeInOut',
          repeat: 1,
        }}
      >
        <motion.svg
          className="relative size-[400px] drop-shadow-2xl"
          height="256"
          viewBox="0 0 200 200"
          width="256"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="starGradient" x1="0%" x2="100%" y1="0%" y2="100%">
              <stop offset="0%" stopColor={primary} />
              <stop offset="100%" stopColor={secondary} />
            </linearGradient>
          </defs>

          <motion.polygon
            animate={{ rotate: 360 }}
            fill="url(#starGradient)"
            points="100,5 114,47 148,18 139,61 182,53 153,86 195,100 153,114 182,148 139,139 148,182 114,153 100,195 86,153 52,182 61,139 18,148 47,114 5,100 47,86 18,53 61,61 52,18 86,47"
            stroke={border}
            strokeWidth="4"
            transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: 'circInOut' }}
          />
        </motion.svg>
        <div className="-translate-1/2 absolute top-1/2 left-1/2 flex flex-col gap-4">
          {price?.hasDiscount && typeof price?.discount?.price === 'number' && (
            <motion.span
              animate={{ scale: [0, 1.1] }}
              className={cn(
                '[--tw-drop-shadow-color:_var(--price-border-c)]] [-webkit-text-fill-color:_var(--price-fill-c)]] flex flex-row items-center justify-center gap-2 text-center font-bold font-oswald text-3xl text-white drop-shadow-2xl [-webkit-text-stroke:_1px_var(--price-stroke-c)]',
                {
                  'text-white drop-shadow-2xl [--tw-drop-shadow-color:_var(--price-border-c)] [-webkit-text-fill-color:_var(--price-fill-c)] [-webkit-text-stroke:_1px_var(--price-stroke-c)]':
                    isFree,
                },
              )}
              initial={{ scale: 0 }}
              transition={{ type: 'spring', stiffness: 150, damping: 22 }}
            >
              <span className="text-left text-lg uppercase">{price.priceOffText?.[locale]}</span>
              <span className="relative w-auto text-right text-xl">
                R${' '}
                <CountingNumber
                  decimalPlaces={2}
                  decimalSeparator=","
                  number={Number(price.regular.price)}
                />
                <motion.span
                  animate={{ scaleX: 1 }}
                  className="-rotate-12 absolute top-1/2 left-0 h-[3px] w-full bg-red-600"
                  initial={{ scaleX: 0 }}
                />
              </span>
            </motion.span>
          )}
          {typeof price?.regular.price === 'number' && (
            <div className="flex h-full w-full justify-center">
              {price?.hasDiscount && (
                <motion.span
                  animate={{ scale: [0, 1.1] }}
                  className={cn(
                    '[-webkit-text-fill-color:_var(--price-fill-c)]] flex flex-col items-center justify-center gap-2 text-center font-bold font-oswald text-3xl text-white drop-shadow-2xl [--tw-drop-shadow-color:_var(--price-border-c)] [-webkit-text-stroke:_1px_var(--price-stroke-c)]',
                    {
                      'text-white drop-shadow-2xl [--tw-drop-shadow-color:_var(--price-border-c)] [-webkit-text-fill-color:_var(--price-fill-c)] [-webkit-text-stroke:_1px_var(--price-stroke-c)]':
                        isFree,
                    },
                  )}
                  initial={{ scale: 0 }}
                  transition={{ type: 'spring', stiffness: 150, damping: 22 }}
                >
                  {isFree ? (
                    <motion.span
                      animate={{ y: [0, -10, 0] }}
                      className="text-4xl"
                      transition={{
                        duration: 0.6,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: 'loop',
                        ease: 'easeInOut',
                      }}
                    >
                      {price.discount?.text?.[locale]}
                    </motion.span>
                  ) : (
                    <>
                      <span className="text-xl uppercase">{price.priceByText?.[locale]}</span>
                      <span className="w-[300px] text-3xl">
                        R${' '}
                        <CountingNumber
                          decimalPlaces={2}
                          decimalSeparator=","
                          number={Number(price.discount?.price)}
                        />
                      </span>
                    </>
                  )}
                </motion.span>
              )}
              {!price?.hasDiscount && (
                <motion.span
                  className={cn(
                    '[-webkit-text-fill-color:_var(--price-fill-c)]] flex flex-col items-center justify-center gap-2 text-center font-bold font-oswald text-3xl text-white drop-shadow-2xl [--tw-drop-shadow-color:_var(--price-border-c)] [-webkit-text-stroke:_1px_var(--price-stroke-c)]',
                    {
                      'text-white drop-shadow-2xl [--tw-drop-shadow-color:_var(--price-border-c)] [-webkit-text-fill-color:_var(--price-fill-c)] [-webkit-text-stroke:_1px_var(--price-stroke-c)]':
                        isFree,
                    },
                  )}
                >
                  {isFree ? (
                    <motion.span className="text-4xl uppercase">
                      {price.regular.text?.[locale]}
                    </motion.span>
                  ) : (
                    <>
                      <span className="text-3xl">{t('onlyText')}</span>
                      <span className="w-[300px]">
                        R${' '}
                        <CountingNumber
                          decimalPlaces={2}
                          decimalSeparator=","
                          number={price.regular.price}
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
