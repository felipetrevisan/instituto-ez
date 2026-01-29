'use client'

import { CallAction } from '@ez/web/components/ui/call-action-button'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import type { SectionHero } from '@ez/web/types/landing'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import { PortableText } from '@portabletext/react'
import { Building2Icon } from 'lucide-react'
import { motion } from 'motion/react'
import { useTranslations } from 'next-intl'

export const Hero = ({ data, locale }: { data: SectionHero; locale: string }) => {
  const t = useTranslations('LandingPageForBusiness')

  return (
    <StickySection
      className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/30"
      id="hero"
    >
      <motion.div
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.05),transparent_50%)]"
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--secondary)/0.05),transparent_50%)]"
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      <div className="container relative z-10 mx-auto px-4 py-20">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-4xl space-y-8 text-center"
          initial={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 font-medium text-primary text-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Building2Icon className="size-4" />
            <span>{t('corpSolutions')}</span>
          </motion.div>
          {data?.heading?.[locale] && (
            <motion.h1
              animate={{ opacity: 1, y: 0 }}
              className="font-bold text-4xl text-foreground leading-tight md:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <PortableText components={createPortableComponents()} value={data.heading[locale]} />
            </motion.h1>
          )}

          {data?.subheading?.[locale] && (
            <motion.p
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto max-w-3xl text-lg text-muted-foreground leading-relaxed md:text-xl"
              initial={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.6, duration: 0.6 }}
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
              className="flex flex-col items-center justify-center gap-4 pt-4 md:flex-row"
              initial={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              {data.cta.map((button, index) => {
                return (
                  <CallAction
                    base="for-business"
                    button={button}
                    className="group px-8 py-6 font-semibold"
                    key={button._key ?? index}
                  />
                )
              })}
            </motion.div>
          )}
        </motion.div>
      </div>
    </StickySection>
  )
}
