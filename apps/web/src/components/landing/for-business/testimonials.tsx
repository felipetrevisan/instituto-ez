'use client'

import { Card } from '@ez/shared/ui/card'
import { CallAction } from '@ez/web/components/ui/call-action-button'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import type { SectionForBusinessTestimonial } from '@ez/web/types/landing/for-business'
import { Heart, TrendingDown, TrendingUp } from 'lucide-react'
import { motion } from 'motion/react'
import { useTranslations } from 'next-intl'

export const Testimonials = ({
  data,
  locale,
}: {
  data: SectionForBusinessTestimonial
  locale: string
}) => {
  const t = useTranslations('LandingPageForBusiness')

  return (
    <StickySection className="bg-card py-20" id="testimonials">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl space-y-12">
          {data?.heading?.[locale] && (
            <motion.div
              className="space-y-4 text-center"
              initial={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: '-100px' }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h2 className="font-bold text-3xl text-foreground md:text-4xl">
                {data.heading[locale]}
              </h2>
            </motion.div>
          )}

          <div className="grid gap-6 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              viewport={{ once: true, margin: '-100px' }}
              whileHover={{ y: -8 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <Card
                base="for-business"
                className="h-full space-y-4 bg-gradient-to-br from-card to-primary/5 p-6 text-center transition-all duration-300 hover:shadow-[var(--shadow-card-hover)]"
              >
                <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/10">
                  <TrendingDown className="size-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <p className="font-bold text-4xl text-primary">30%</p>
                  <p className="font-semibold text-foreground">
                    {t('testimonials.reductionTitle')}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {t('testimonials.reductionSubtitle')}
                  </p>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: true, margin: '-100px' }}
              whileHover={{ y: -8 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <Card
                base="for-business"
                className="h-full space-y-4 bg-gradient-to-br from-card to-secondary/5 p-6 text-center transition-all duration-300 hover:shadow-[var(--shadow-card-hover)]"
              >
                <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-secondary/10">
                  <TrendingUp className="size-8 text-secondary" />
                </div>
                <div className="space-y-2">
                  <p className="font-bold text-4xl text-secondary">40%</p>
                  <p className="font-semibold text-foreground">
                    {t('testimonials.productivityTitle')}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {t('testimonials.productivitySubtitle')}
                  </p>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              viewport={{ once: true, margin: '-100px' }}
              whileHover={{ y: -8 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <Card
                base="for-business"
                className="h-full space-y-4 bg-gradient-to-br from-card to-accent/5 p-6 text-center transition-all duration-300 hover:shadow-[var(--shadow-card-hover)]"
              >
                <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-accent/10">
                  <Heart className="size-8 text-accent" />
                </div>
                <div className="space-y-2">
                  <p className="font-bold text-4xl text-accent">+</p>
                  <p className="font-semibold text-foreground">{t('testimonials.climateTitle')}</p>
                  <p className="text-muted-foreground text-sm">
                    {t('testimonials.climateSubtitle')}
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>

          {data.cta && (
            <div className="pt-4 text-center">
              <CallAction base="for-business" button={data.cta} className="group" />
            </div>
          )}
        </div>
      </div>
    </StickySection>
  )
}
