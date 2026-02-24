'use client'

import { cn } from '@ez/shared/lib/utils'
import { CallAction } from '@ez/web/components/ui/call-action-button'
import { ComingSoonRibbon } from '@ez/web/components/ui/coming-soon-ribbon'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import { urlForImage } from '@ez/web/config/image'
import type { SectionHomeImmersion } from '@ez/web/types/landing/home'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import { PortableText } from '@portabletext/react'
import { motion } from 'motion/react'
import Image from 'next/image'

export const Immersion = ({
  data,
  locale,
  comingSoon = false,
}: {
  data: SectionHomeImmersion
  locale: string
  comingSoon?: boolean
}) => {
  return (
    <StickySection className="relative bg-background py-20 md:py-32" id="immersion">
      {comingSoon && (
        <ComingSoonRibbon className="absolute top-6 right-6 z-20 px-4 py-1.5 text-xs tracking-[0.22em]" />
      )}
      <div className={cn(comingSoon && 'grayscale')}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(var(--brand-primary-rgb),0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(var(--brand-accent-rgb),0.03),transparent_50%)]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 text-center"
          initial={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          <span className="inline-block rounded-full border border-accent/20 bg-accent/5 px-5 py-2 font-semibold text-accent text-sm uppercase tracking-widest shadow-[0_0_18px_rgba(var(--brand-accent-rgb),0.12)]">
            Vivência Presencial
          </span>
        </motion.div>
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
            {data?.subheading?.[locale] && (
              <div className="mb-8 space-y-4 text-justify text-lg text-muted-foreground leading-relaxed md:text-xl">
                <PortableText
                  components={createPortableComponents()}
                  value={data.subheading[locale]}
                />
              </div>
            )}

            {data.cta && data.cta.length > 0 && (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col justify-center gap-4 sm:flex-row"
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
              >
                {data.cta.map((button, index) => {
                  return (
                    <CallAction
                      base="default"
                      button={button}
                      className="group px-8 py-6 font-semibold"
                      key={button._key ?? index}
                    />
                  )
                })}
              </motion.div>
            )}
          </div>
        </div>
        </div>
      </div>
    </StickySection>
  )
}
