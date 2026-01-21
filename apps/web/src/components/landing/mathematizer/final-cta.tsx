'use client'

import { useShared } from '@ez/shared/hooks/use-shared'
import { LinkType } from '@ez/shared/types'
import { CallAction } from '@ez/web/components/ui/call-action-button'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import type { SectionMathematizerCTA } from '@ez/web/types/landing/mathematizer'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import { PortableText } from '@portabletext/react'
import type { IconName } from 'lucide-react/dynamic'
import { motion } from 'motion/react'

export const FinalCTA = ({ data, locale }: { data: SectionMathematizerCTA; locale: string }) => {
  const { setIsContactDialogOpen } = useShared()

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
                {data.cta.map((button) => {
                  return (
                    <CallAction
                      action={button.type === LinkType.DIALOG ? 'button' : 'link'}
                      base="mathematizer"
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
