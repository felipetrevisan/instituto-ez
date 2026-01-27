'use client'

import { CallAction } from '@ez/web/components/ui/call-action-button'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import type { SectionMathematizerCTA } from '@ez/web/types/landing/mathematizer'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import { PortableText } from '@portabletext/react'
import { motion } from 'motion/react'

export const FinalCTA = ({ data, locale }: { data: SectionMathematizerCTA; locale: string }) => {
  return (
    <StickySection id="cta">
      <div className="bg-gradient-to-b from-secondary/30 to-background py-16 sm:py-20 md:py-32 dark:from-secondary/20 dark:via-gray-900 dark:to-background">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl space-y-8 text-center">
            <motion.h2
              className="font-bold text-3xl md:text-5xl"
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.3 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <PortableText components={createPortableComponents()} value={data.heading[locale]} />
            </motion.h2>

            {data.text && (
              <motion.div
                className="space-y-6 text-foreground/90 text-lg leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.3 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <PortableText components={createPortableComponents()} value={data.text[locale]} />
                <p className="pt-4 font-bold text-accent text-xl">
                  Pare de gerir no escuro. Comece a decidir com base em verdade matemática.
                </p>
              </motion.div>
            )}

            {data.cta && data.cta.length > 0 && (
              <motion.div
                className="space-y-4 pt-8"
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.3 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                {data.cta.map((button, index) => {
                  return (
                    <CallAction
                      key={button._key ?? index}
                      base="mathematizer"
                      button={button}
                      className="group px-8 py-6 font-semibold"
                    />
                  )
                })}
                <p className="mx-auto max-w-2xl text-muted-foreground text-sm">
                  Aplicações limitadas por trimestre. Prioridade para organizações que valorizam
                  métricas, precisão e resultados mensuráveis.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </StickySection>
  )
}
