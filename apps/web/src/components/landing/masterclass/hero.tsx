'use client'

import { CallAction } from '@ez/web/components/ui/call-action-button'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import { urlForImage } from '@ez/web/config/image'
import type { SectionMasterclassHero } from '@ez/web/types/landing/masterclass'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import { resolveLocaleString } from '@ez/web/utils/resolve-locale-string'
import type { PortableTextBlockComponent, PortableTextComponents } from '@portabletext/react'
import { Play } from 'lucide-react'
import { motion } from 'motion/react'
import { PortableText } from 'next-sanity'

export const Hero = ({ data, locale }: { data: SectionMasterclassHero; locale: string }) => {
  const portableComponents = createPortableComponents()
  const blockComponents: Record<string, PortableTextBlockComponent | undefined> =
    typeof portableComponents.block === 'function'
      ? { normal: portableComponents.block }
      : (portableComponents.block ?? {})

  const headingComponents: PortableTextComponents = {
    ...portableComponents,
    block: {
      ...blockComponents,
      normal: ({ children }) => <>{children}</>,
    },
  }

  const headingPrimary = data?.headingPrimary?.[locale]
  const headingSecondary = data?.headingSecondary?.[locale]
  const videoLabel = resolveLocaleString(data?.video?.label, locale)
  const videoDuration = data?.video?.duration
  const badges = data?.badges ?? []

  return (
    <StickySection
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      id="hero"
    >
      {data.backgroundImage && (
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${urlForImage(data.backgroundImage.asset)
              .auto('format')
              .quality(80)
              .url()})`,
          }}
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />

      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container relative z-10 px-4 py-20 lg:py-32">
        <div className="mx-auto max-w-4xl">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {((headingPrimary?.length ?? 0) > 0 || (headingSecondary?.length ?? 0) > 0) && (
              <motion.h1
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 font-bold font-display leading-tight"
                initial={{ opacity: 0, y: 30 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                {headingPrimary && headingPrimary.length > 0 && (
                  <span className="text-4xl text-gradient md:text-5xl lg:text-6xl xl:text-7xl">
                    <PortableText components={headingComponents} value={headingPrimary} />
                  </span>
                )}
                {headingSecondary && headingSecondary.length > 0 && (
                  <>
                    <br />
                    <span className="text-3xl text-gradient-white md:text-4xl lg:text-5xl xl:text-6xl">
                      <PortableText components={headingComponents} value={headingSecondary} />
                    </span>
                  </>
                )}
              </motion.h1>
            )}

            {data?.subheading?.[locale] && (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="mx-auto mb-8 max-w-xl text-lg text-muted-foreground leading-relaxed md:text-xl"
                initial={{ opacity: 0, y: 30 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <PortableText components={portableComponents} value={data.subheading[locale]} />
              </motion.div>
            )}

            <motion.div
              animate={{ opacity: 1, scale: 1 }}
              className="relative mx-auto mb-10 max-w-2xl"
              initial={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <div className="aspect-video overflow-hidden rounded-2xl border border-border bg-card/80 shadow-card backdrop-blur-sm">
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    className="group flex size-20 items-center justify-center rounded-full bg-gradient-gold shadow-button transition-transform duration-300 hover:scale-110"
                    type="button"
                  >
                    <Play className="ml-1 size-8 text-primary-foreground" />
                  </button>
                </div>
                {(videoLabel || videoDuration) && (
                  <div className="absolute right-4 bottom-4 left-4 flex items-center justify-between text-muted-foreground text-sm">
                    <span>{videoLabel}</span>
                    {videoDuration && (
                      <span className="rounded bg-background/60 px-2 py-1 text-xs">
                        {videoDuration}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </motion.div>

            {data?.cta && data.cta.length > 0 && (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col justify-center gap-4 sm:flex-row"
                initial={{ opacity: 0, y: 30 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                {data.cta.map((button, index) => (
                  <CallAction
                    base="default"
                    button={button}
                    className="group px-8 py-6 text-lg"
                    key={button._key ?? index}
                  />
                ))}
              </motion.div>
            )}

            {badges.length > 0 && (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="mt-10 flex flex-wrap justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                transition={{ delay: 1 }}
              >
                {badges.map((badge, index) => {
                  const value = resolveLocaleString(badge.value, locale)
                  const label = resolveLocaleString(badge.label, locale)

                  return (
                    <div
                      className="rounded-xl border border-border bg-card/80 px-5 py-3 shadow-card backdrop-blur-sm"
                      key={badge._key ?? `hero-badge-${index}`}
                    >
                      {value && (
                        <p className="font-bold font-display text-2xl text-primary">{value}</p>
                      )}
                      {label && <p className="text-muted-foreground text-xs">{label}</p>}
                    </div>
                  )
                })}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      <motion.div
        animate={{ opacity: 1 }}
        className="-translate-x-1/2 absolute bottom-8 left-1/2"
        initial={{ opacity: 0 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          className="flex h-10 w-6 justify-center rounded-full border-2 border-muted-foreground/30 pt-2"
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="h-3 w-1.5 rounded-full bg-primary" />
        </motion.div>
      </motion.div>
    </StickySection>
  )
}
