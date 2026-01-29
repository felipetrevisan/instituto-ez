'use client'

import { Card, CardContent } from '@ez/shared/ui/card'
import { CallAction } from '@ez/web/components/ui/call-action-button'
import { Icon } from '@ez/web/components/ui/icon'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import type { SectionMathematizerMathematizer } from '@ez/web/types/landing/mathematizer'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import { PortableText } from '@portabletext/react'
import { motion } from 'motion/react'
import { useTranslations } from 'next-intl'

export const Mathematizer = ({
  data,
  locale,
}: {
  data: SectionMathematizerMathematizer
  locale: string
}) => {
  const t = useTranslations('LandingPageMathematizer')

  return (
    <StickySection className="w-screen py-20 md:py-32" id="mathematizers">
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
          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
            {data.items.map((item, index) => {
              return (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  // biome-ignore lint/suspicious/noArrayIndexKey: false positive
                  key={`mathematizer-mathematizer-${index}`}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
                  viewport={{ once: true, amount: 0.2 }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <Card
                    className="hover-lift h-full border-border transition-all duration-300 hover:border-accent/50"
                    theme="landing"
                    variant="landing"
                  >
                    <CardContent className="space-y-6 p-8">
                      {item.icon && (
                        <div className="flex size-16 items-center justify-center rounded-full bg-accent/10">
                          <Icon className="size-8 text-accent" name={item.icon} />
                        </div>
                      )}

                      <h3 className="font-bold text-2xl">{item.title[locale]}</h3>

                      <div className="space-y-4 text-foreground/80">
                        <div>
                          <p className="mb-2 font-semibold text-accent text-sm">
                            {t('resolvedProblems')}
                          </p>
                          <p>{item.problems[locale]}</p>
                        </div>

                        <div>
                          <p className="mb-2 font-semibold text-accent text-sm">Como atua:</p>
                          <p>{item.action[locale]}</p>
                        </div>

                        <div>
                          <p className="mb-2 font-semibold text-accent text-sm">Resultado:</p>
                          <p className="font-medium text-foreground">{item.result[locale]}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        )}

        {data.cta && (
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.3 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <CallAction
              base="mathematizer"
              button={data.cta}
              className="group px-8 py-6 font-semibold"
            />
          </motion.div>
        )}
      </div>
    </StickySection>
  )
}
