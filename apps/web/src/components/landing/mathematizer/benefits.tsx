'use client'

import { Icon } from '@ez/web/components/ui/icon'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import type { SectionMathematizerBenefits } from '@ez/web/types/landing/mathematizer'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import { PortableText } from '@portabletext/react'
import { motion } from 'motion/react'

export const Benefits = ({
  data,
  locale,
}: {
  data: SectionMathematizerBenefits
  locale: string
}) => {
  return (
    <StickySection id="benefits">
      <div className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          {data?.heading?.[locale] && (
            <motion.h2
              className="mb-16 text-center font-bold text-3xl md:text-5xl"
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.3 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <PortableText components={createPortableComponents()} value={data.heading[locale]} />
            </motion.h2>
          )}

          {data.items.length > 0 && (
            <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
              {data.items.map((benefit, index) => {
                return (
                  <motion.div
                    className="hover-lift flex items-start gap-4 rounded-lg border border-border bg-card/50 p-6 transition-all duration-300 hover:border-accent/50"
                    initial={{ opacity: 0, y: 30 }}
                    // biome-ignore lint/suspicious/noArrayIndexKey: false positive
                    key={`mathematizer-benefits-${index}`}
                    transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
                    viewport={{ once: true, amount: 0.2 }}
                    whileInView={{ opacity: 1, y: 0 }}
                  >
                    {benefit.icon && (
                      <div className="flex size-12 flex-shrink-0 items-center justify-center rounded-lg bg-accent/10">
                        <Icon className="size-6 text-accent" name={benefit.icon} />
                      </div>
                    )}
                    <p className="font-medium text-lg">{benefit.title[locale]}</p>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </StickySection>
  )
}
