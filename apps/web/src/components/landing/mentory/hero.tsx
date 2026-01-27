'use client'

import { useShared } from '@ez/shared/hooks/use-shared'
import { LinkType } from '@ez/shared/types'
import { CallAction } from '@ez/web/components/ui/call-action-button'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import type { SectionHero } from '@ez/web/types/landing'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import { PortableText } from '@portabletext/react'
import type { IconName } from 'lucide-react/dynamic'
import { motion } from 'motion/react'
import { useTranslations } from 'next-intl'

export const Hero = ({ data, locale }: { data: SectionHero; locale: string }) => {
  const { setIsContactDialogOpen } = useShared()

  const t = useTranslations('LandingPageMentoring')

  return (
    <StickySection id="hero">
      <div className="relative overflow-hidden bg-gradient-hero py-24 md:py-32 lg:py-40">
        <div className="container relative z-10 mx-auto mt-10 px-6 md:px-8">
          <div className="mx-auto max-w-5xl text-center">
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 inline-flex items-center gap-2 rounded-full bg-cyan/10 px-4 py-2 font-medium text-cyan text-sm"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              <span className="flex size-2">
                <span className="absolute inline-flex size-2 animate-ping rounded-full bg-cyan opacity-75"></span>
                <span className="relative inline-flex size-2 rounded-full bg-cyan"></span>
              </span>
              {t('strategyMentoring')}
            </motion.div>

            {data?.heading?.[locale] && (
              <motion.h1
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 text-balance font-bold text-4xl md:text-5xl lg:text-7xl"
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.1 }}
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
                className="mx-auto mb-12 max-w-4xl text-justify text-gray-warm text-lg leading-relaxed md:text-center md:text-xl lg:text-2xl"
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
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
                className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row"
                initial={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                {data.cta.map((button) => {
                  return (
                    <CallAction
                      action={button.type === LinkType.DIALOG ? 'button' : 'link'}
                      base="mentory"
                      className="group px-8 py-6 font-semibold"
                      effect={button.theme.effect}
                      icon={{
                        prefix: {
                          className: 'mr-2 size-5',
                          name: button.iconPrefix as IconName,
                        },
                        suffix: {
                          className: 'ml-2 size-5 transition-transform group-hover:translate-x-1',
                          name: button.iconSuffix as IconName,
                        },
                      }}
                      key={button._key}
                      label={button.label[locale]}
                      link={button.type === LinkType.DIALOG ? undefined : button.link[locale]}
                      onClick={
                        button.type === LinkType.DIALOG
                          ? () => setIsContactDialogOpen(true)
                          : undefined
                      }
                      rounded={button.theme.rounded}
                      size={button.theme.size}
                      theme={button.theme.theme}
                      variant={button.theme.variant}
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
