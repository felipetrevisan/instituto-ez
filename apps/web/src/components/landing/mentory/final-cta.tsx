'use client'

import { CallAction } from '@ez/web/components/ui/call-action-button'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import type { SectionMentoringCTA } from '@ez/web/types/landing/mentoring'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import { PortableText } from '@portabletext/react'
import { CheckCircle2, Target, TrendingUp, Zap } from 'lucide-react'
import { motion } from 'motion/react'

export const FinalCTA = ({ data, locale }: { data: SectionMentoringCTA; locale: string }) => {
  return (
    <StickySection
      className="relative overflow-hidden bg-gradient-to-br from:bg-gray-light to:bg-background py-16 sm:py-20 md:py-28"
      id="cta"
    >
      <div className="container mx-auto px-6 md:px-8">
        <div className="relative mx-auto max-w-6xl">
          <div className="-left-12 absolute top-1/4 hidden lg:block">
            <div className="flex flex-col gap-4">
              <div className="text-right">
                <div className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-elegant backdrop-blur-sm">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-bold text-navy">15+</p>
                      <p className="text-gray-warm text-sm">Anos de Experiência</p>
                    </div>
                    <div className="rounded-xl bg-coral/20 p-3">
                      <TrendingUp className="size-6 text-coral" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-elegant backdrop-blur-sm">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-bold text-navy">Resultados+</p>
                      <p className="text-gray-warm text-sm">Mensuráveis e Reais</p>
                    </div>
                    <div className="rounded-xl bg-coral/20 p-3">
                      <CheckCircle2 className="size-6 text-coral" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="-right-12 absolute top-1/4 hidden lg:block">
            <div className="flex flex-col gap-4">
              <div>
                <div className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-elegant backdrop-blur-sm">
                  <div className="flex items-center gap-4">
                    <div className="rounded-xl bg-cyan/20 p-3">
                      <Target className="size-6 text-cyan" />
                    </div>
                    <div>
                      <p className="font-bold text-navy">100%</p>
                      <p className="text-gray-warm text-sm">Método Comprovado</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-elegant backdrop-blur-sm">
                  <div className="flex items-center gap-4">
                    <div className="rounded-xl bg-cyan/20 p-3">
                      <Zap className="size-6 text-cyan" />
                    </div>
                    <div>
                      <p className="font-bold text-navy">Execução</p>
                      <p className="text-gray-warm text-sm">De Alto Impacto</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <motion.h2
              className="mb-6 font-bold text-3xl md:text-4xl lg:text-5xl"
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <PortableText components={createPortableComponents()} value={data.heading[locale]} />
            </motion.h2>

            {data.text && (
              <motion.div
                className="mx-auto mb-10 max-w-2xl text-justify text-gray-warm text-lg leading-relaxed md:text-center md:text-xl"
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <PortableText components={createPortableComponents()} value={data.text[locale]} />
              </motion.div>
            )}

            {data.cta && data.cta.length > 0 && (
              <motion.div
                className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row"
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.3 }}
                whileInView={{ opacity: 1, y: 0 }}
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
      </div>
    </StickySection>
  )
}
