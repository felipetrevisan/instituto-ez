'use client'

import { Title } from '@ez/shared/ui/title'
import { urlForImage } from '@ez/web/config/image'
import { useLandingPageSettings } from '@ez/web/hooks/use-landing-page-settings'
import { motion } from 'motion/react'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'

const MotionTitle = motion(Title)

export default function GuaranteeSection() {
  const { data } = useLandingPageSettings()
  const locale = useLocale()

  const t = useTranslations('Ebooks')

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 lg:container">
      <motion.h2
        className="font-bold text-3xl text-gray-900 tracking-tight md:text-4xl"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <MotionTitle
          className="after:-bottom-1 after:-translate-x-1/2 relative text-center font-questrial font-semibold text-[var(--primary-c)] after:absolute after:left-1/2 after:h-[2px] after:w-[40%] after:rounded-xl after:bg-[var(--primary-c)]/60 after:transition-all"
          size="2xl"
        >
          {t('guaranteeSeals')}
        </MotionTitle>
      </motion.h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 lg:gap-8">
        {data?.seals?.[locale].map((seal, i) => (
          <motion.div
            className="relative flex size-40 flex-col items-center lg:size-64 lg:p-8"
            initial={{ opacity: 0, y: 40 }}
            // biome-ignore lint/suspicious/noArrayIndexKey: using index as key is acceptable here
            key={i}
            transition={{ delay: i * 0.2, type: 'spring', stiffness: 400, damping: 10 }}
            whileHover={{ scale: 1.1 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <Image
              alt=""
              fill
              src={urlForImage(seal.seal.image.asset).format('webp').quality(80).url()}
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
