'use client'

import { StickySection } from '@ez/web/components/ui/sticky-section'
import type { SectionMathematizerWhatIs } from '@ez/web/types/landing/mathematizer'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import { PortableText } from '@portabletext/react'
import { motion } from 'motion/react'

export const WhatIs = ({ data, locale }: { data: SectionMathematizerWhatIs; locale: string }) => {
  return (
    <StickySection className="bg-secondary py-20 md:py-32 dark:bg-secondary/30" id="what-is">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl space-y-8">
          {data?.heading?.[locale] && (
            <motion.h2
              className="mb-12 text-center font-bold text-3xl md:text-5xl"
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.3 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <PortableText components={createPortableComponents()} value={data.heading[locale]} />
            </motion.h2>
          )}

          {data?.text?.[locale] && (
            <motion.div
              className="space-y-6 text-foreground/90 text-lg leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.3 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <PortableText components={createPortableComponents()} value={data.text[locale]} />
              {data?.subtext?.[locale] && (
                <p className="pt-4 text-justify font-semibold text-accent text-xl">
                  <PortableText
                    components={createPortableComponents()}
                    value={data.subtext[locale]}
                  />
                </p>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </StickySection>
  )
}
