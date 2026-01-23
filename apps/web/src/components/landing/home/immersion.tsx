'use client'

import { useShared } from '@ez/shared/hooks/use-shared'
import { LinkType } from '@ez/shared/types'
import { CallAction } from '@ez/web/components/ui/call-action-button'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import { urlForImage } from '@ez/web/config/image'
import type { SectionHomeImmersion } from '@ez/web/types/landing/home'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import { PortableText } from '@portabletext/react'
import type { IconName } from 'lucide-react/dynamic'
import { motion } from 'motion/react'
import Image from 'next/image'

export const Immersion = ({ data, locale }: { data: SectionHomeImmersion; locale: string }) => {
  const { setIsContactDialogOpen } = useShared()

  return (
    <StickySection className="relative bg-background py-20 md:py-32" id="immersion">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(var(--brand-primary-rgb),0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(var(--brand-accent-rgb),0.03),transparent_50%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center font-bold text-4xl text-foreground md:text-5xl lg:mb-16 lg:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <PortableText components={createPortableComponents()} value={data.heading[locale]} />
        </motion.h2>

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative order-2 animate-fade-in lg:order-1">
            <div className="relative h-[400px] w-full overflow-hidden rounded-2xl shadow-2xl lg:h-[500px]">
              <Image
                alt=""
                className="h-[400px] w-full object-cover lg:h-[500px]"
                fill
                src={urlForImage(data.image.asset).format('webp').quality(80).url()}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/60 via-transparent to-transparent" />
            </div>
            <div className="-bottom-4 -left-4 absolute size-32 rounded-full bg-accent/10 blur-3xl" />
          </div>
          <div className="order-1 lg:order-2">
            <p className="mb-4 font-semibold text-2xl text-accent md:text-3xl">
              A experiência que expande a vida
            </p>

            <div className="mb-8 space-y-4 text-justify text-lg text-muted-foreground leading-relaxed md:text-xl">
              <PortableText
                components={createPortableComponents()}
                value={data.subheading[locale]}
              />
            </div>
            {data.cta && data.cta.length > 0 && (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col justify-center gap-4 sm:flex-row"
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
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
                      onClick={() => setIsContactDialogOpen(true)}
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
