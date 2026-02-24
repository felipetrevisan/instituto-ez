'use client'

import { StickySection } from '@ez/web/components/ui/sticky-section'
import type { SectionMasterclassTestimonials } from '@ez/web/types/landing/masterclass'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import { resolveLocaleString } from '@ez/web/utils/resolve-locale-string'
import { Quote, Star } from 'lucide-react'
import { motion } from 'motion/react'
import { PortableText } from 'next-sanity'

const normalizeRating = (rating?: number) => {
  if (typeof rating !== 'number' || Number.isNaN(rating)) return 5
  return Math.max(1, Math.min(5, Math.round(rating)))
}

export const Testimonials = ({
  data,
  locale,
}: {
  data: SectionMasterclassTestimonials
  locale: string
}) => {
  const testimonials = data?.testimonials ?? []

  if (testimonials.length === 0) {
    return null
  }

  const badge = resolveLocaleString(data?.badge, locale)
  const description = resolveLocaleString(data?.description, locale)

  return (
    <StickySection className="border-border/50 border-y bg-muted py-20 md:py-28" id="testimonials">
      <div className="container">
        <motion.div
          className="mx-auto mb-14 max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {badge && (
            <span className="mb-4 inline-block rounded-full border border-vivid-emerald/20 bg-vivid-emerald/10 px-4 py-1.5 font-semibold text-sm text-vivid-emerald">
              {badge}
            </span>
          )}

          {data?.heading?.[locale] && (
            <h2 className="mb-4 text-balance font-bold text-3xl md:text-4xl">
              <PortableText components={createPortableComponents()} value={data.heading[locale]} />
            </h2>
          )}

          {description && <p className="text-lg text-muted-foreground">{description}</p>}
        </motion.div>

        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, index) => {
            const showStars = item.showStars !== false
            const rating = normalizeRating(item.rating)
            const initials = item.author?.name?.trim().charAt(0).toUpperCase() ?? '?'

            return (
              <motion.div
                className="relative flex h-[360px] flex-col rounded-2xl border border-border/50 bg-background p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg md:h-[380px]"
                initial={{ opacity: 0, y: 20 }}
                key={item.id}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <Quote className="absolute top-4 right-4 size-8 text-primary/10" />

                {showStars && (
                  <div className="flex gap-0.5">
                    {Array.from({ length: rating }).map((_, starIndex) => (
                      <Star
                        className="size-4 fill-vivid-amber text-vivid-amber"
                        key={`${item.id}-star-${starIndex}`}
                      />
                    ))}
                  </div>
                )}

                <div className="mt-4 mb-4 flex-1 overflow-y-auto pr-1 text-base text-muted-foreground leading-relaxed">
                  <PortableText
                    components={createPortableComponents()}
                    value={item.testimonial ?? []}
                  />
                </div>

                <div className="flex items-center gap-3 border-border/50 border-t pt-4">
                  <div className="flex size-10 items-center justify-center rounded-full border border-primary/20 bg-primary/10">
                    <span className="font-bold text-primary text-sm">{initials}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{item.author?.name}</p>
                    {item.author?.role && (
                      <p className="text-muted-foreground text-sm">{item.author.role}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </StickySection>
  )
}
