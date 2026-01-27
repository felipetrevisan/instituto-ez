'use client'

import { useShared } from '@ez/shared/hooks/use-shared'
import { LinkType } from '@ez/shared/types'
import { CallAction } from '@ez/web/components/ui/call-action-button'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import type { SectionEbooksCTA } from '@ez/web/types/landing/ebooks'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import { PortableText } from '@portabletext/react'
import { Sparkles } from 'lucide-react'
import type { IconName } from 'lucide-react/dynamic'
import { motion } from 'motion/react'

export const FinalCTA = ({ data, locale }: { data: SectionEbooksCTA; locale: string }) => {
  const { setIsContactDialogOpen } = useShared()

  return (
    <StickySection
      className="w-screen bg-gradient-to-b from-gray-light to-background py-20 md:py-32 dark:from-secondary dark:to-background"
      id="cta"
    >
      <div className="-translate-x-1/2 -translate-y-1/2 absolute top-0 left-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute right-0 bottom-0 h-96 w-96 translate-x-1/2 translate-y-1/2 rounded-full bg-navy/10 blur-3xl" />

      <div className="container relative z-10 mx-auto px-6 md:px-8">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-navy/10 px-4 py-2 font-medium text-navy text-sm">
            <Sparkles className="size-4" />
            Dúvidas?
          </div>

          <motion.h2
            className="mb-6 font-bold text-3xl text-navy md:text-4xl lg:text-5xl"
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.3 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <PortableText components={createPortableComponents()} value={data.heading[locale]} />
          </motion.h2>

          {data.subheading && (
            <motion.p
              className="mx-auto mb-10 max-w-2xl text-lg text-navy/80"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.3 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <PortableText
                components={createPortableComponents()}
                value={data.subheading[locale]}
              />
            </motion.p>
          )}

          {data.cta && data.cta.length > 0 && (
            <motion.div
              className="space-y-4 pt-8"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.3 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              {data.cta.map((button) => {
                return (
                  <CallAction
                    action={button.type === LinkType.DIALOG ? 'button' : 'link'}
                    base="default"
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
        </motion.div>
      </div>
    </StickySection>
  )
}
