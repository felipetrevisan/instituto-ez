'use client'

import { CallAction } from '@ez/web/components/ui/call-action-button'
import { Icon } from '@ez/web/components/ui/icon'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import { urlForImage } from '@ez/web/config/image'
import type { SectionHomeDigitalProducts } from '@ez/web/types/landing/home'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import { PortableText } from '@portabletext/react'
import { Cloud, Database, Globe, Laptop, Monitor, Smartphone, Wifi, Zap } from 'lucide-react'
import { motion } from 'motion/react'
import Image from 'next/image'

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
          <Globe className="size-10 text-accent" />
        </div>
        <div
          className="absolute top-40 right-[15%] animate-bounce opacity-20"
          style={{ animationDelay: '0.7s' }}
        >
          <Wifi className="size-5 text-primary-foreground" />
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
          <Zap className="size-5 text-primary-foreground" />
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

      <div className="container relative z-10">
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

          {data.cards?.length ? (
            <div
              className="grid animate-fade-in-up gap-8 md:grid-cols-2"
              style={{ animationDelay: '0.15s' }}
            >
              {data.cards.map((card, index) => {
                const title = card.title?.[locale]
                const description = card.description?.[locale]
                const badgeLabel = card.badgeLabel?.[locale]

                return (
                  <div
                    className="group relative overflow-hidden rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
                    key={card._key ?? `digital-product-${index}`}
                  >
                    <div className="relative h-56 overflow-hidden">
                      {card.image?.asset ? (
                        <Image
                          alt={title ?? 'Digital product'}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          height={560}
                          src={urlForImage(card.image.asset).format('webp').quality(80).url()}
                          width={640}
                        />
                      ) : null}
                      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
                      {(badgeLabel || card.badgeIcon) && (
                        <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-accent/90 px-3 py-1.5 font-semibold text-primary-foreground text-xs">
                          {card.badgeIcon && <Icon className="size-3.5" name={card.badgeIcon} />}
                          {badgeLabel}
                        </div>
                      )}
                    </div>
                    <div className="p-6 text-left">
                      {title && (
                        <h3 className="mb-2 font-bold text-2xl text-primary-foreground">{title}</h3>
                      )}
                      {description && (
                        <p className="mb-5 text-primary-foreground/70 text-sm leading-relaxed">
                          {description}
                        </p>
                      )}
                      {card.button && (
                        <CallAction
                          base="default"
                          button={card.button}
                          className="group/btn w-full text-base shadow-lg transition-all hover:shadow-xl"
                        />
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          ) : null}
        </div>
      </div>
    </StickySection>
  )
}
