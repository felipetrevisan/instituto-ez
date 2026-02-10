'use client'

import { cn } from '@ez/shared/lib/utils'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@ez/shared/ui/carousel'
import { CallAction } from '@ez/web/components/ui/call-action-button'
import { Icon } from '@ez/web/components/ui/icon'
import type { MasterclassPillars, MasterclassPillarTheme } from '@ez/web/types/masterclass'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import { PortableText } from '@portabletext/react'
import type { UseEmblaCarouselType } from 'embla-carousel-react'
import { ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'
import { useEffect, useState } from 'react'

type ThemeStyles = {
  border: string
  badge: string
  text: string
  iconBg: string
  softBg: string
}

const THEME_STYLES: Record<MasterclassPillarTheme, ThemeStyles> = {
  amber: {
    badge: 'bg-vivid-amber/10 text-vivid-amber border-vivid-amber/20',
    border: 'border-vivid-amber/30',
    iconBg: 'bg-vivid-amber/15',
    softBg: 'bg-vivid-amber/15',
    text: 'text-vivid-amber',
  },
  coral: {
    badge: 'bg-vivid-coral/10 text-vivid-coral border-vivid-coral/20',
    border: 'border-vivid-coral/30',
    iconBg: 'bg-vivid-coral/15',
    softBg: 'bg-vivid-coral/15',
    text: 'text-vivid-coral',
  },
  cyan: {
    badge: 'bg-vivid-cyan/10 text-vivid-cyan border-vivid-cyan/20',
    border: 'border-vivid-cyan/30',
    iconBg: 'bg-vivid-cyan/15',
    softBg: 'bg-vivid-cyan/15',
    text: 'text-vivid-cyan',
  },
  emerald: {
    badge: 'bg-vivid-emerald/10 text-vivid-emerald border-vivid-emerald/20',
    border: 'border-vivid-emerald/30',
    iconBg: 'bg-vivid-emerald/15',
    softBg: 'bg-vivid-emerald/15',
    text: 'text-vivid-emerald',
  },
  primary: {
    badge: 'bg-primary/10 text-primary border-primary/20',
    border: 'border-primary/30',
    iconBg: 'bg-primary/15',
    softBg: 'bg-primary/15',
    text: 'text-primary',
  },
  violet: {
    badge: 'bg-vivid-violet/10 text-vivid-violet border-vivid-violet/20',
    border: 'border-vivid-violet/30',
    iconBg: 'bg-vivid-violet/15',
    softBg: 'bg-vivid-violet/15',
    text: 'text-vivid-violet',
  },
}

export function Pillars({ data }: { data: MasterclassPillars }) {
  const [api, setApi] = useState<UseEmblaCarouselType[1] | null>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  useEffect(() => {
    if (!api) return

    const handleSelect = () => {
      setSelectedIndex(api.selectedScrollSnap())
    }

    setScrollSnaps(api.scrollSnapList())
    setSelectedIndex(api.selectedScrollSnap())
    api.on('select', handleSelect)

    return () => {
      api.off('select', handleSelect)
    }
  }, [api])

  const items = data?.items ?? []
  const badge = data?.badge

  return (
    <section className="relative overflow-hidden bg-section-dark py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 size-[700px] rounded-full border border-white/5" />
        <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 size-[500px] rounded-full border border-white/5" />
      </div>

      <div className="container relative z-10">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {badge && (
            <span className="mb-4 inline-block rounded-full border border-vivid-amber/20 bg-vivid-amber/10 px-4 py-1.5 font-semibold text-sm text-vivid-amber">
              {badge}
            </span>
          )}
          {data?.heading && (
            <h2 className="text-balance font-bold text-3xl text-white md:text-4xl lg:text-5xl">
              <PortableText components={createPortableComponents()} value={data.heading} />
            </h2>
          )}
          {data?.subheading && (
            <p className="mt-4 text-lg text-white/50 italic">
              <PortableText components={createPortableComponents()} value={data.subheading} />
            </p>
          )}
        </motion.div>

        {items.length > 0 && (
          <div className="mx-auto mb-16 grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => {
              const theme = THEME_STYLES[item.theme ?? 'primary']
              const numberLabel = item.number ?? String(index + 1).padStart(2, '0')

              return (
                <motion.button
                  className={cn(
                    'group relative cursor-pointer rounded-2xl border bg-white/5 p-10 text-left backdrop-blur-sm transition-all duration-300 hover:bg-white/10',
                    theme.border,
                  )}
                  initial={{ opacity: 0, y: 20 }}
                  key={`${item.title ?? 'pillar'}-${index}`}
                  onClick={() => api?.scrollTo(index)}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  type="button"
                  viewport={{ once: true }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        'flex size-12 items-center justify-center rounded-xl',
                        theme.iconBg,
                      )}
                    >
                      {item.icon && <Icon className={cn('size-6', theme.text)} name={item.icon} />}
                    </div>
                    <div>
                      <span className={cn('mb-0.5 block font-bold text-sm', theme.text)}>
                        {numberLabel}
                      </span>
                      <h3 className="mb-1 font-bold text-lg text-white">{item.title}</h3>
                      <p className="text-sm text-white/60">{item.subtitle}</p>
                    </div>
                  </div>
                  <ArrowRight
                    className={cn(
                      'absolute top-6 right-6 size-4 opacity-0 transition-opacity group-hover:opacity-100',
                      theme.text,
                    )}
                  />
                </motion.button>
              )
            })}
          </div>
        )}

        {items.length > 0 && (
          <div className="relative mx-auto max-w-5xl">
            <Carousel className="relative" opts={{ align: 'center', loop: true }} setApi={setApi}>
              <CarouselContent>
                {items.map((item, index) => {
                  const theme = THEME_STYLES[item.theme ?? 'primary']
                  const numberLabel = item.number ?? String(index + 1).padStart(2, '0')
                  const slideLabel =
                    item.label ?? `Pilar ${numberLabel}${item.title ? ` — ${item.title}` : ''}`

                  return (
                    <CarouselItem
                      className="px-4"
                      key={`slide-${
                        // biome-ignore lint/suspicious/noArrayIndexKey: false positive
                        index
                      }`}
                    >
                      <div
                        className={cn(
                          'rounded-3xl border bg-white/5 p-6 backdrop-blur-sm md:p-10',
                          theme.border,
                        )}
                      >
                        <div className="grid items-center gap-8 md:grid-cols-2">
                          <div className="order-2 md:order-1">
                            <span
                              className={cn(
                                'mb-4 inline-block rounded-full border px-3 py-1 font-semibold text-sm',
                                theme.badge,
                              )}
                            >
                              {slideLabel}
                            </span>
                            {item.heading && (
                              <h3 className="mb-4 font-bold text-2xl text-white md:text-3xl">
                                <PortableText
                                  components={createPortableComponents()}
                                  value={item.heading}
                                />
                              </h3>
                            )}
                            {item.body && (
                              <div className="mb-6 space-y-3 text-base text-white/70">
                                <PortableText
                                  components={createPortableComponents()}
                                  value={item.body}
                                />
                              </div>
                            )}
                            {item.cta && (
                              <CallAction
                                base="default"
                                button={item.cta}
                                className="w-full sm:w-auto"
                              />
                            )}
                          </div>

                          <div className="order-1 flex items-center justify-center md:order-2">
                            <div className="relative mx-auto size-[260px] md:size-[320px]">
                              <div
                                className={cn(
                                  'absolute inset-4 rounded-full border opacity-40',
                                  theme.border,
                                )}
                              />
                              <div className="absolute inset-0 rounded-full border border-white/10 border-dashed" />

                              <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 z-10">
                                <div
                                  className={cn(
                                    'flex size-28 flex-col items-center justify-center rounded-full border-2 text-center md:size-32',
                                    theme.border,
                                    theme.softBg,
                                  )}
                                >
                                  {item.core?.icon ? (
                                    <Icon
                                      className={cn('size-6', theme.text)}
                                      name={item.core.icon}
                                    />
                                  ) : (
                                    <span
                                      className={cn(
                                        'size-2.5 rounded-full',
                                        theme.text,
                                        theme.iconBg,
                                      )}
                                    />
                                  )}
                                  {item.core?.label && (
                                    <span
                                      className={cn(
                                        'mt-1 px-3 font-bold text-[11px] md:text-sm',
                                        theme.text,
                                      )}
                                    >
                                      {item.core.label}
                                    </span>
                                  )}
                                </div>
                              </div>

                              {(item.orbitItems ?? []).slice(0, 4).map((orbit, orbitIndex) => {
                                const positions = [
                                  { left: '50%', top: '8%', transform: 'translate(-50%, -50%)' },
                                  { left: '92%', top: '50%', transform: 'translate(-50%, -50%)' },
                                  { left: '50%', top: '92%', transform: 'translate(-50%, -50%)' },
                                  { left: '8%', top: '50%', transform: 'translate(-50%, -50%)' },
                                ]

                                return (
                                  <div
                                    className="absolute z-20"
                                    key={`${item.title ?? 'pillar'}-orbit-${orbitIndex}`}
                                    style={positions[orbitIndex]}
                                  >
                                    <div className="flex flex-col items-center">
                                      <div
                                        className={cn(
                                          'flex size-16 flex-col items-center justify-center gap-0.5 rounded-xl border p-1.5 backdrop-blur-sm md:size-[4.5rem]',
                                          theme.border,
                                          theme.softBg,
                                        )}
                                      >
                                        {orbit.icon ? (
                                          <Icon
                                            className={cn('size-4', theme.text)}
                                            name={orbit.icon}
                                          />
                                        ) : (
                                          <span
                                            className={cn(
                                              'size-2 rounded-full',
                                              theme.text,
                                              theme.iconBg,
                                            )}
                                          />
                                        )}
                                        {orbit.label && (
                                          <span className="text-center font-semibold text-[8px] text-white/80 leading-tight md:text-[10px]">
                                            {orbit.label}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  )
                })}
              </CarouselContent>

              <CarouselPrevious className="-translate-x-2 md:-translate-x-6 left-0 bg-white/10 text-white hover:bg-white/20 md:size-12" />
              <CarouselNext className="right-0 translate-x-2 bg-white/10 text-white hover:bg-white/20 md:size-12 md:translate-x-6" />
            </Carousel>
          </div>
        )}

        {scrollSnaps.length > 1 && (
          <div className="mt-8 flex flex-col items-center gap-4">
            <div className="flex items-center gap-2">
              {scrollSnaps.map((_, index) => {
                const isActive = index === selectedIndex

                return (
                  <button
                    className={cn(
                      'size-2.5 rounded-full bg-white/20 transition-all duration-300 hover:bg-white/40',
                      isActive && 'w-8 bg-vivid-amber',
                    )}
                    key={`dot-${
                      // biome-ignore lint/suspicious/noArrayIndexKey: false positive
                      index
                    }`}
                    onClick={() => api?.scrollTo(index)}
                    type="button"
                  />
                )
              })}
            </div>
            <span className="font-medium text-sm text-white/40">
              {String(selectedIndex + 1).padStart(2, '0')} /{' '}
              {String(scrollSnaps.length).padStart(2, '0')}
            </span>
          </div>
        )}

        {data?.cta && (
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <CallAction base="default" button={data.cta} className="p-4" />
          </motion.div>
        )}
      </div>
    </section>
  )
}
