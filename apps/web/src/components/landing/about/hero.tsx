'use client'

import { CallAction } from '@ez/web/components/ui/call-action-button'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import type { SectionHero } from '@ez/web/types/landing'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import { PortableText } from '@portabletext/react'
import { motion } from 'motion/react'

export const Hero = ({ data, locale }: { data: SectionHero; locale: string }) => {
  return (
    <StickySection id="hero">
      <div className="relative overflow-hidden bg-gradient-hero py-24 md:py-32 lg:py-40">
        <div className="container relative z-10 mx-auto mt-10 px-6 md:px-8">
          <div className="mx-auto max-w-5xl text-center">
            {data?.heading?.[locale] && (
              <motion.h1
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 text-balance font-bold text-4xl md:text-5xl lg:text-7xl"
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6 }}
              >
                <PortableText
                  components={createPortableComponents()}
                  value={data.heading[locale]}
                />
              </motion.h1>
            )}

            {data?.subheading?.[locale] && (
              <motion.p
                animate={{ opacity: 1, y: 0 }}
                className="mx-auto mb-12 max-w-4xl text-gray-warm text-lg leading-relaxed md:text-xl lg:text-2xl"
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <PortableText
                  components={createPortableComponents()}
                  value={data.subheading[locale]}
                />
              </motion.p>
            )}

            {data.cta && data.cta.length > 0 && (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="pt-8"
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
              >
                {data.cta.map((button, index) => {
                  return (
                    <CallAction
                      key={button._key ?? index}
                      base="about"
                      button={button}
                      className="group px-8 py-6 font-semibold"
                    />
                  )
                })}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </StickySection>
  )
}
