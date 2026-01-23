'use client'

import { useShared } from '@ez/shared/hooks/use-shared'
import { LinkType } from '@ez/shared/types'
import { CallAction } from '@ez/web/components/ui/call-action-button'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import { urlForImage } from '@ez/web/config/image'
import type { SectionHero } from '@ez/web/types/landing'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import { PortableText } from '@portabletext/react'
import type { IconName } from 'lucide-react/dynamic'
import { motion } from 'motion/react'

export const Hero = ({ data, locale }: { data: SectionHero; locale: string }) => {
  const { setIsContactDialogOpen } = useShared()

  return (
    <StickySection
      className="relative mt-24 h-full w-screen bg-gradient-to-br from-primary via-primary/95 to-primary/90"
      id="hero"
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${urlForImage(data.image.asset).auto('format').quality(80).flipHorizontal().url()})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="relative z-10 px-4 py-20 sm:px-6 md:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h1
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 font-bold text-4xl text-primary-foreground leading-tight md:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <PortableText components={createPortableComponents()} value={data.heading[locale]} />
          </motion.h1>

          {data.subheading && (
            <motion.p
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto mb-10 max-w-3xl font-light text-base text-primary-foreground/90 md:text-lg lg:text-xl"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
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
              className="flex flex-col justify-center gap-4 pt-8 md:flex-row"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
            >
              {data.cta.map((button) => {
                return (
                  <CallAction
                    action={button.type === LinkType.DIALOG ? 'button' : 'link'}
                    base="default"
                    className="group w-full px-8 py-6 font-semibold md:w-auto"
                    effect={button.theme.effect}
                    icon={{
                      prefix: {
                        className: 'size-5',
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
      <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-18 bg-gradient-to-t from-background via-background/70 to-transparent" />{' '}
    </StickySection>
  )
}
