'use client'

import { CallAction } from '@ez/web/components/ui/call-action-button'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import type { SectionHomeDigitalProducts } from '@ez/web/types/landing/home'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import { PortableText } from '@portabletext/react'
import { Cloud, Database, Globe, Laptop, Monitor, Smartphone, Wifi, Zap } from 'lucide-react'
import { motion } from 'motion/react'

export const DigitalProducts = ({
  data,
  locale,
}: {
  data: SectionHomeDigitalProducts
  locale: string
}) => {
  return (
    <StickySection
      className="relative bg-gradient-to-br from-navy via-navy/95 to-navy/90 py-20 text-primary-foreground md:py-32"
      id="digital-products"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-16 left-[10%] animate-pulse opacity-30">
          <Laptop className="size-8 text-accent" />
        </div>
        <div
          className="absolute top-32 left-[5%] animate-bounce opacity-20"
          style={{ animationDelay: '0.5s' }}
        >
          <Cloud className="size-6 text-primary-foreground" />
        </div>

        <div
          className="absolute top-20 right-[8%] animate-pulse opacity-25"
          style={{ animationDelay: '0.3s' }}
        >
          <Globe className="h-10 w-10 text-accent" />
        </div>
        <div
          className="absolute top-40 right-[15%] animate-bounce opacity-20"
          style={{ animationDelay: '0.7s' }}
        >
          <Wifi className="h-5 w-5 text-primary-foreground" />
        </div>

        <div
          className="-translate-y-1/2 absolute top-1/2 left-[3%] animate-pulse opacity-25"
          style={{ animationDelay: '0.4s' }}
        >
          <Database className="size-7 text-accent" />
        </div>
        <div
          className="absolute top-[60%] left-[12%] animate-bounce opacity-20"
          style={{ animationDelay: '1s' }}
        >
          <Zap className="h-5 w-5 text-primary-foreground" />
        </div>

        <div
          className="-translate-y-1/2 absolute top-1/2 right-[5%] animate-pulse opacity-30"
          style={{ animationDelay: '0.6s' }}
        >
          <Smartphone className="size-8 text-accent" />
        </div>
        <div
          className="absolute top-[45%] right-[18%] animate-bounce opacity-20"
          style={{ animationDelay: '0.8s' }}
        >
          <Monitor className="size-6 text-primary-foreground" />
        </div>

        <div
          className="absolute bottom-24 left-[20%] animate-pulse opacity-25"
          style={{ animationDelay: '0.2s' }}
        >
          <Cloud className="size-6 text-accent" />
        </div>
        <div
          className="absolute right-[25%] bottom-16 animate-bounce opacity-20"
          style={{ animationDelay: '0.9s' }}
        >
          <Laptop className="size-7 text-primary-foreground" />
        </div>
      </div>

      <div className="section-container relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          {data?.heading?.[locale] && (
            <motion.h2
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 animate-fade-in-up font-bold text-3xl leading-tight md:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
            >
              <PortableText components={createPortableComponents()} value={data.heading[locale]} />
            </motion.h2>
          )}

          {data?.subheading?.[locale] && (
            <p
              className="mx-auto mb-10 max-w-2xl animate-fade-in-up text-lg text-primary-foreground/85 md:text-xl"
              style={{ animationDelay: '0.1s' }}
            >
              <PortableText
                components={createPortableComponents()}
                value={data.subheading[locale]}
              />
            </p>
          )}

          {data.cta && data.cta.length > 0 && (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="mt-10 flex flex-col justify-center gap-4 sm:flex-row"
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
    </StickySection>
  )
}
