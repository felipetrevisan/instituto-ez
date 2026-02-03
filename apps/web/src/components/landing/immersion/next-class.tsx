'use client'

import { CallAction } from '@ez/web/components/ui/call-action-button'
import { Icon } from '@ez/web/components/ui/icon'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import type { SectionImmersionNextClass } from '@ez/web/types/landing/immersion'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import { PortableText } from '@portabletext/react'
import { motion } from 'motion/react'
import { useTranslations } from 'next-intl'

export const NextClass = ({
  data,
  locale,
}: {
  data: SectionImmersionNextClass
  locale: string
}) => {
  const t = useTranslations('LandingPageImmersion')

  return (
    <StickySection
      className="bg-gradient-to-br from-navy via-navy-dark to-navy py-20 md:py-28"
      id="next-class"
    >
      <div className="container mx-auto px-6 md:px-8">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <span className="mb-3 block font-semibold text-coral text-sm uppercase tracking-wider">
            {t('nextClassLabel')}
          </span>
          {data?.heading?.[locale] && (
            <h2 className="mb-6 font-bold text-3xl text-white md:text-5xl">
              <PortableText components={createPortableComponents()} value={data.heading[locale]} />
            </h2>
          )}
          {data?.subheading?.[locale] && (
            <div className="mx-auto max-w-2xl text-lg text-white/70">
              <PortableText
                components={createPortableComponents()}
                value={data.subheading[locale]}
              />
            </div>
          )}
        </motion.div>

        <div className="mx-auto max-w-3xl">
          <motion.div
            className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm md:p-10"
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            {data?.details && data.details.length > 0 && (
              <div className="mb-8 grid gap-6 md:grid-cols-2">
                {data.details.map((detail, index) => (
                  <motion.div
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    key={`${detail._type}-${index}`}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileInView={{ opacity: 1, x: 0 }}
                  >
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-coral/20">
                      {detail.icon && <Icon className="h-5 w-5 text-coral" name={detail.icon} />}
                    </div>
                    <p className="text-white/80">{detail.title?.[locale]}</p>
                  </motion.div>
                ))}
              </div>
            )}

            {data?.cta && data.cta.length > 0 && (
              <div className="border-white/10 border-t pt-6 text-center">
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                  {data.cta.map((button, index) => (
                    <CallAction
                      base="immersion"
                      button={button}
                      className="group px-12 py-7 font-semibold"
                      key={button._key ?? index}
                    />
                  ))}
                </div>
                <p className="mt-4 text-sm text-white/50">{t('nextClassFooter')}</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </StickySection>
  )
}
