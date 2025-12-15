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

export const Hero = ({ data, locale }: { data: SectionHero; locale: string }) => {
  const { setIsContactDialogOpen } = useShared()

  return (
    <StickySection id="hero">
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          className="absolute inset-0 bg-center bg-cover opacity-20"
          style={{ backgroundImage: `url(/assets/images/mathematizer/hero.jpeg)` }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

        <div className="container relative z-10 mx-auto px-4 py-20 md:py-32">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-4xl space-y-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.h1
              animate={{ opacity: 1, y: 0 }}
              className="font-bold text-4xl leading-tight md:text-6xl lg:text-7xl"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            >
              <PortableText components={createPortableComponents()} value={data.heading[locale]} />
            </motion.h1>

            {data.subheading && (
              <motion.p
                animate={{ opacity: 1, y: 0 }}
                className="mx-auto max-w-3xl text-muted-foreground text-xl leading-relaxed md:text-2xl"
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
              >
                <PortableText
                  components={createPortableComponents()}
                  value={data.subheading[locale]}
                />
              </motion.p>
            )}

            {data.description && (
              <motion.p
                animate={{ opacity: 1, y: 0 }}
                className="mx-auto max-w-2xl text-foreground/80 text-lg"
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
              >
                <PortableText
                  components={createPortableComponents()}
                  value={data.description[locale]}
                />
              </motion.p>
            )}

            {data.cta && data.cta.length > 0 && (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="pt-8"
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
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
                      onClick={() => setIsContactDialogOpen(true)}
                      rounded={button.theme.rounded}
                      size={button.theme.size}
                      theme={button.theme.theme}
                    />
                  )
                })}
              </motion.div>
            )}
          </motion.div>
        </div>

        <div className="absolute right-0 bottom-0 left-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>
    </StickySection>
  )
}
