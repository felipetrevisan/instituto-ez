'use client'

import { StickySection } from '@ez/web/components/ui/sticky-section'
import { useTestimonialsByHome } from '@ez/web/hooks/use-testimonials'
import type { SectionHomeTestimonials } from '@ez/web/types/landing/home'
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
  data: SectionHomeTestimonials
  locale: string
}) => {
  const limit = data?.maxItems && data.maxItems > 0 ? Math.min(data.maxItems, 12) : 6
  const { data: testimonials, isLoading } = useTestimonialsByHome(limit)
  const portableComponents = createPortableComponents()

  if (isLoading || !testimonials?.length) {
    return null
  }

  const badge = resolveLocaleString(data?.badge, locale)
  const description = resolveLocaleString(data?.description, locale)

  return (
    <StickySection className="relative bg-brand-light py-20 md:py-32" id="testimonials">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(var(--brand-primary-rgb),0.05),transparent_45%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_75%,rgba(var(--brand-accent-rgb),0.06),transparent_40%)]" />

      <div className="container relative z-10">
        <motion.div
          className="mx-auto mb-14 max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {badge && (
            <span className="inline-block rounded-full border border-accent/20 bg-accent/5 px-5 py-2 font-semibold text-accent text-sm uppercase tracking-widest shadow-[0_0_18px_rgba(var(--brand-accent-rgb),0.12)]">
              {badge}
            </span>
          )}

          {data?.heading?.[locale] && (
            <h2 className="mt-4 mb-4 text-balance font-bold text-4xl text-foreground leading-tight md:text-5xl lg:text-6xl">
              <PortableText components={portableComponents} value={data.heading[locale]} />
            </h2>
          )}

          {description && <p className="text-lg text-muted-foreground leading-relaxed">{description}</p>}
        </motion.div>

        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, index) => {
            const showStars = item.showStars !== false
            const rating = normalizeRating(item.rating)
            const initials = item.author?.name?.trim().charAt(0).toUpperCase() ?? '?'

            return (
              <motion.div
                className="group relative flex h-[360px] flex-col overflow-hidden rounded-2xl border border-accent/20 bg-card/90 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl md:h-[380px]"
                initial={{ opacity: 0, y: 20 }}
                key={item.id}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent/20 via-primary/40 to-accent/20" />
                <div className="absolute top-4 right-4 rounded-full bg-accent/10 p-2 transition-colors group-hover:bg-accent/20">
                  <Quote className="size-5 text-accent/60" />
                </div>

                {showStars && (
                  <div className="mb-1 inline-flex w-fit gap-0.5 rounded-full border border-accent/20 bg-accent/5 px-2 py-1">
                    {Array.from({ length: rating }).map((_, starIndex) => (
                      <Star
                        className="size-3.5 fill-vivid-amber text-vivid-amber"
                        key={`${item.id}-star-${starIndex}`}
                      />
                    ))}
                  </div>
                )}

                <div className="mt-4 mb-4 flex-1 overflow-y-auto pr-1 text-base text-muted-foreground leading-relaxed">
                  <PortableText components={portableComponents} value={item.testimonial ?? []} />
                </div>

                <div className="flex items-center gap-3 border-accent/20 border-t pt-4">
                  <div className="flex size-10 items-center justify-center rounded-full border border-accent/25 bg-accent/15">
                    <span className="font-bold text-accent text-sm">{initials}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{item.author?.name}</p>
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
