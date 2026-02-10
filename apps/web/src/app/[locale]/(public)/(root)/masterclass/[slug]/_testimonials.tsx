'use client'

import { useTestimonials } from '@ez/web/hooks/use-testimonials'
import type { MasterclassTestimonials } from '@ez/web/types/masterclass'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import { PortableText } from '@portabletext/react'
import { Quote, Star } from 'lucide-react'
import { motion } from 'motion/react'

export function Testimonials({ data }: { data: MasterclassTestimonials }) {
  const { data: testimonials, isLoading } = useTestimonials('masterclass')

  if (isLoading || !testimonials?.length) return null

  return (
    <section className="border-border/50 border-y bg-muted py-20 md:py-28">
      <div className="container">
        <motion.div
          className="mx-auto mb-14 max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {data?.badge && (
            <span className="mb-4 inline-block rounded-full border border-vivid-emerald/20 bg-vivid-emerald/10 px-4 py-1.5 font-semibold text-sm text-vivid-emerald">
              {data.badge}
            </span>
          )}
          {data?.heading && (
            <h2 className="mb-4 text-balance font-bold text-3xl md:text-4xl">
              <PortableText components={createPortableComponents()} value={data.heading} />
            </h2>
          )}
          {data?.description && <p className="text-lg text-muted-foreground">{data.description}</p>}
        </motion.div>

        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => {
            const showStars = testimonial.showStars !== false
            const rating = testimonial.rating
            const initials = testimonial.author?.name?.trim().charAt(0) ?? '?'

            return (
              <motion.div
                className="relative rounded-2xl border border-border/50 bg-background p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                key={testimonial.id}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <Quote className="absolute top-4 right-4 size-8 text-primary/10" />
                {showStars && typeof rating === 'number' && rating > 0 && (
                  <div className="flex gap-0.5">
                    {Array.from({ length: rating }).map((_, starIndex) => (
                      <Star
                        className="size-4 fill-vivid-amber text-vivid-amber"
                        key={`${testimonial.id}-star-${starIndex}`}
                      />
                    ))}
                  </div>
                )}
                <div className="mt-4 mb-6 text-base text-muted-foreground leading-relaxed">
                  <PortableText
                    components={createPortableComponents()}
                    value={testimonial.testimonial}
                  />
                </div>
                <div className="flex items-center gap-3 border-border/50 border-t pt-4">
                  <div className="flex size-10 items-center justify-center rounded-full border border-primary/20 bg-primary/10">
                    <span className="font-bold text-primary text-sm">{initials}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{testimonial.author?.name}</p>
                    {testimonial.author?.role && (
                      <p className="text-muted-foreground text-sm">{testimonial.author.role}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
