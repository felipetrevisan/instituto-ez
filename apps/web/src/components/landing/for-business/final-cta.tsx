'use client'

import { useShared } from '@ez/shared/hooks/use-shared'
import { Button } from '@ez/shared/ui'
import { Icon } from '@ez/web/components/ui/icon'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import type { SectionForBusinessCTA } from '@ez/web/types/landing/for-business'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import { PortableText } from '@portabletext/react'
import { motion } from 'motion/react'

export const FinalCTA = ({ data, locale }: { data: SectionForBusinessCTA; locale: string }) => {
  const { setIsContactDialogOpen } = useShared()

  return (
    <StickySection id="cta">
      <div className="bg-gradient-to-br from-primary/10 via-secondary/5 to-background py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="mx-auto max-w-4xl space-y-8 text-center"
            initial={{ opacity: 0, y: 60 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="font-bold text-3xl text-foreground leading-tight md:text-4xl lg:text-5xl">
              <PortableText components={createPortableComponents()} value={data.heading[locale]} />
            </h2>

            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed md:text-xl">
              <PortableText components={createPortableComponents()} value={data.text[locale]} />
            </p>

            {data.cta && data.cta.length > 0 && (
              <motion.div
                className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row"
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.3 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                {data.cta.map((button) => {
                  return (
                    <Button
                      base="for-business"
                      className="group px-8 py-6 font-semibold"
                      effect={button.theme.effect}
                      key={button._key}
                      rounded={button.theme.rounded}
                      size={button.theme.size}
                      theme={button.theme.theme}
                    >
                      {button.iconPrefix && (
                        <Icon className="mr-2 size-5" name={button.iconPrefix} />
                      )}
                      {button.label[locale]}
                      {button.iconSuffix && (
                        <Icon
                          className="ml-2 size-5 transition-transform group-hover:translate-x-1"
                          name={button.iconSuffix}
                        />
                      )}
                    </Button>
                  )
                })}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </StickySection>
  )
}
