'use client'

import { CallAction } from '@ez/web/components/ui/call-action-button'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import type { SectionMathematizerWhyCompanyNeed } from '@ez/web/types/landing/mathematizer'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import { PortableText } from '@portabletext/react'
import { motion } from 'motion/react'

export const WhyCompaniesNeed = ({
  data,
  locale,
}: {
  data: SectionMathematizerWhyCompanyNeed
  locale: string
}) => {
  return (
    <StickySection className="bg-secondary/30 py-16 sm:py-20 md:py-32" id="why-i-need">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl space-y-8 text-center">
          {data?.heading?.[locale] && (
            <motion.h2
              className="font-bold text-3xl md:text-5xl"
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.3 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <PortableText components={createPortableComponents()} value={data.heading[locale]} />
            </motion.h2>
          )}

          {data?.subheading?.[locale] && (
            <motion.div
              className="mx-auto max-w-3xl text-foreground/90 text-xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.3 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <PortableText
                components={createPortableComponents()}
                value={data.subheading[locale]}
              />
            </motion.div>
          )}

          {data.cta && (
            <motion.div
              className="pt-8"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.3 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <CallAction
                base="mathematizer"
                button={data.cta}
                className="group px-8 py-6 dark:hover:bg-accent dark:hover:outline-accent"
              />
            </motion.div>
          )}
        </div>
      </div>
    </StickySection>
  )
}
