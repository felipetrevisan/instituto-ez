'use client'

import { CallAction } from '@ez/web/components/ui/call-action-button'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import type { SectionHero } from '@ez/web/types/landing'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import { PortableText } from '@portabletext/react'
import { motion } from 'motion/react'
import { useTranslations } from 'next-intl'

export const Hero = ({ data, locale }: { data: SectionHero; locale: string }) => {
  const t = useTranslations('LandingPageMentoring')

  return (
    <StickySection
      className="relative overflow-hidden bg-gradient-hero py-24 md:py-32 lg:py-40"
      id="hero"
    >
      <div className="container relative z-10 mx-auto mt-10 px-6 md:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full bg-cyan/10 px-4 py-2 font-medium text-cyan text-sm"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <span className="flex size-2">
              <span className="absolute inline-flex size-2 animate-ping rounded-full bg-cyan opacity-75"></span>
              <span className="relative inline-flex size-2 rounded-full bg-cyan"></span>
            </span>
            {t('stratagyMentoring')}
          </motion.div>

          {data?.heading?.[locale] && (
            <motion.h1
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 text-balance font-bold text-4xl md:text-5xl lg:text-7xl"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <PortableText components={createPortableComponents()} value={data.heading[locale]} />
            </motion.h1>
          )}

          {data?.subheading?.[locale] && (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto mb-12 max-w-4xl text-justify text-gray-warm text-lg leading-relaxed md:text-center md:text-xl lg:text-2xl"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <PortableText
                components={createPortableComponents()}
                value={data.subheading[locale]}
              />
            </motion.div>
          )}

          {data.cta && data.cta.length > 0 && (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              {data.cta.map((button, index) => {
                return (
                  <CallAction
                    base="mentory"
                    button={button}
                    className="group px-8 py-6 font-semibold"
                    key={button._key ?? index}
                  />
                )
              })}
            </motion.div>
          )}
        </div>
      </div>
    </StickySection>
  )
}
