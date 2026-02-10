'use client'

import { Icon } from '@ez/web/components/ui/icon'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import type { SectionServicesBenefits } from '@ez/web/types/landing/services'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import { PortableText } from '@portabletext/react'
import { motion } from 'motion/react'

export const Benefits = ({ data, locale }: { data: SectionServicesBenefits; locale: string }) => {
  return (
    <StickySection className="py-20 md:py-32" id="benefits">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl space-y-12">
          <div className="space-y-6 text-center">
            {data?.heading?.[locale] && (
              <motion.h2
                className="text-center font-bold text-3xl md:text-4xl lg:text-5xl"
                initial={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <PortableText
                  components={createPortableComponents()}
                  value={data.heading[locale]}
                />
              </motion.h2>
            )}

            {data?.subheading?.[locale] && (
              <motion.div
                className="mx-auto mb-16 max-w-3xl text-center text-gray-warm text-lg"
                initial={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <PortableText
                  components={createPortableComponents()}
                  value={data.subheading[locale]}
                />
              </motion.div>
            )}
          </div>

          {data.items && (
            <div className="mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {data.items.map((method, index) => {
                return (
                  <motion.div
                    className="hover-lift flex items-start gap-4 rounded-lg border border-border bg-card/50 p-6 transition-all duration-300 hover:border-accent/50"
                    initial={{ opacity: 0, y: 30 }}
                    // biome-ignore lint/suspicious/noArrayIndexKey: false positive
                    key={`services-benefits-${index}`}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileInView={{ opacity: 1, y: 0 }}
                  >
                    {method.icon && (
                      <div className="flex size-12 flex-shrink-0 items-center justify-center rounded-lg bg-accent/10">
                        <Icon className="size-6 text-accent" name={method.icon} />
                      </div>
                    )}
                    <h3 className="font-medium text-lg">{method.title[locale]}</h3>
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
