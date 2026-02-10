'use client'

import { CallAction } from '@ez/web/components/ui/call-action-button'
import { Icon } from '@ez/web/components/ui/icon'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import { urlForImage } from '@ez/web/config/image'
import type {
  MasterclassProblemCard,
  SectionMasterclassProblem,
} from '@ez/web/types/landing/masterclass'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import { resolveLocaleString } from '@ez/web/utils/resolve-locale-string'
import { motion } from 'motion/react'
import Image from 'next/image'
import { PortableText } from 'next-sanity'

const OrbitalCard = ({
  card,
  delay,
  highlight,
  locale,
}: {
  card: MasterclassProblemCard
  delay: number
  highlight?: boolean
  locale: string
}) => (
  <motion.div
    className={`group relative rounded-2xl border p-5 transition-all duration-300 ${
      highlight
        ? 'border-primary/40 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent shadow-gold'
        : 'border-border bg-secondary/60 hover:border-primary/30 hover:bg-secondary/80'
    }`}
    initial={{ opacity: 0, y: 25 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true, margin: '-60px' }}
    whileInView={{ opacity: 1, y: 0 }}
  >
    <div className="flex items-start gap-4">
      <div
        className={`flex size-10 flex-shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${
          highlight
            ? 'bg-primary/25 text-primary'
            : 'bg-primary/10 text-primary/80 group-hover:bg-primary/20 group-hover:text-primary'
        }`}
      >
        {card.icon ? (
          <Icon className="size-5" name={card.icon} />
        ) : (
          <span className="size-2 rounded-full bg-primary" />
        )}
      </div>
      <div className="space-y-1.5">
        {card.title && (
          <h3 className="font-display font-semibold text-base text-foreground md:text-lg">
            {resolveLocaleString(card.title, locale)}
          </h3>
        )}
        {card.text && (
          <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
            {resolveLocaleString(card.text, locale)}
          </p>
        )}
      </div>
    </div>
  </motion.div>
)

export const Problem = ({ data, locale }: { data: SectionMasterclassProblem; locale: string }) => {
  const components = createPortableComponents()
  const marks = components.marks ?? {}

  const richComponents = {
    ...components,
    marks: {
      ...marks,
      semibold: ({ children }: { children: React.ReactNode }) => (
        <span className="font-semibold text-foreground">{children}</span>
      ),
      'gradient-primary': ({ children }: { children: React.ReactNode }) => (
        <span className="text-gradient">{children}</span>
      ),
    },
  }

  const cards = data?.cards ?? []
  const highlightIndex = cards.findIndex((card) => card.highlight)
  const resolvedHighlightIndex =
    highlightIndex >= 0 ? highlightIndex : cards.length > 0 ? cards.length - 1 : -1
  const highlightCard = resolvedHighlightIndex >= 0 ? cards[resolvedHighlightIndex] : undefined
  const sideCards = cards.filter((_, index) => index !== resolvedHighlightIndex)
  const leftCards = sideCards.slice(0, 2)
  const rightCards = sideCards.slice(2, 4)

  return (
    <StickySection className="relative overflow-hidden bg-card py-24 lg:py-32" id="problem">
      <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute inset-0">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {data?.heading?.[locale] && (
            <h2 className="font-bold font-display text-3xl text-foreground md:text-4xl lg:text-5xl">
              <PortableText components={richComponents} value={data.heading[locale]} />
            </h2>
          )}
        </motion.div>

        <div className="relative flex flex-col items-center gap-10 lg:flex-row lg:gap-16">
          <div className="order-2 flex flex-col gap-5 lg:order-1 lg:w-[38%]">
            {leftCards.map((card, index) => (
              <OrbitalCard
                card={card}
                delay={0.1 + index * 0.1}
                key={card._key ?? `left-${index}`}
                locale={locale}
              />
            ))}
          </div>

          <motion.div
            className="relative order-1 flex-shrink-0 lg:order-2 lg:w-[24%]"
            initial={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            viewport={{ once: true, margin: '-80px' }}
            whileInView={{ opacity: 1, scale: 1 }}
          >
            <div className="relative mx-auto size-56 md:h-64 md:w-64 lg:h-72 lg:w-72">
              <div className="absolute inset-[-12px] animate-pulse-glow rounded-full bg-primary/15 blur-xl" />
              <div className="absolute inset-[-4px] rounded-full bg-gradient-to-br from-primary/40 via-primary/10 to-primary/30" />
              {data?.image ? (
                <Image
                  alt="Cérebro e decisões financeiras"
                  className="relative h-full w-full rounded-full border-2 border-primary/20 object-cover"
                  height={720}
                  src={urlForImage(data.image.asset).auto('format').quality(80).url()}
                  width={720}
                />
              ) : (
                <div className="relative h-full w-full rounded-full border-2 border-primary/20 bg-card/60" />
              )}
              <motion.div
                animate={{ rotate: 360 }}
                className="-right-2 -top-2 absolute size-3 rounded-full bg-primary shadow-gold"
                style={{ transformOrigin: 'calc(50% + 40px) calc(50% + 40px)' }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                animate={{ rotate: -360 }}
                className="-bottom-2 -left-2 absolute size-2 rounded-full bg-primary/60"
                style={{ transformOrigin: 'calc(50% + 50px) calc(50% - 50px)' }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          </motion.div>

          <div className="order-3 flex flex-col gap-5 lg:w-[38%]">
            {rightCards.map((card, index) => (
              <OrbitalCard
                card={card}
                delay={0.3 + index * 0.1}
                key={card._key ?? `right-${index}`}
                locale={locale}
              />
            ))}
          </div>
        </div>

        {highlightCard && (
          <motion.div
            className="mx-auto mt-10 max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            viewport={{ once: true, margin: '-50px' }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <OrbitalCard card={highlightCard} delay={0.5} highlight locale={locale} />
          </motion.div>
        )}

        <motion.div
          className="pt-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          viewport={{ once: true, margin: '-50px' }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {data?.cta && data.cta.length > 0 && (
            <div className="flex flex-col items-center gap-4">
              {data.cta.map((button, index) => (
                <CallAction
                  base="default"
                  button={button}
                  className="px-8 py-6 text-lg"
                  key={button._key ?? index}
                />
              ))}
            </div>
          )}
          {data?.footerNote && (
            <p className="mt-4 text-muted-foreground text-sm">
              {resolveLocaleString(data.footerNote, locale)}
            </p>
          )}
        </motion.div>
      </div>
    </StickySection>
  )
}
