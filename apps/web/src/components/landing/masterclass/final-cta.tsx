'use client'

import { CallAction } from '@ez/web/components/ui/call-action-button'
import { Icon } from '@ez/web/components/ui/icon'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import type { SectionMasterclassFinalCTA } from '@ez/web/types/landing/masterclass'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import { resolveLocaleString } from '@ez/web/utils/resolve-locale-string'
import { Layers, Package, Sparkles } from 'lucide-react'
import { motion } from 'motion/react'
import { PortableText } from 'next-sanity'

export const FinalCTA = ({
  data,
  locale,
}: {
  data: SectionMasterclassFinalCTA
  locale: string
}) => {
  const fallbackTrustBadges = [
    { label: 'Conteúdo Gravado' },
    { label: 'Acesso Vitalício' },
    { label: 'Aplicação Prática' },
  ]
  const trustBadges = data?.trustBadges?.length ? data.trustBadges : fallbackTrustBadges
  const footerNote =
    resolveLocaleString(data?.footerNote, locale) ??
    'Liberdade para escolher o que faz sentido para você'

  return (
    <StickySection className="relative overflow-hidden bg-card py-24 lg:py-32" id="cta-final">
      <div className="absolute inset-0">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 h-[800px] w-[800px] rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent" />

      <div className="container relative z-10 px-4">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          initial={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <motion.div
            className="mb-8 inline-flex size-20 items-center justify-center rounded-full bg-gradient-gold shadow-gold"
            initial={{ scale: 0 }}
            transition={{ type: 'spring', delay: 0.2 }}
            viewport={{ once: true }}
            whileInView={{ scale: 1 }}
          >
            {data?.icon ? (
              <Icon className="size-10 text-primary-foreground" name={data.icon} />
            ) : (
              <Sparkles className="size-10 text-primary-foreground" />
            )}
          </motion.div>

          {data?.heading?.[locale] && (
            <h2 className="mb-6 font-bold font-display text-3xl text-foreground md:text-4xl lg:text-5xl">
              <PortableText components={createPortableComponents()} value={data.heading[locale]} />
            </h2>
          )}

          {data?.subheading?.[locale] && (
            <p className="mb-10 text-muted-foreground text-xl leading-relaxed md:text-2xl">
              <PortableText
                components={createPortableComponents()}
                value={data.subheading[locale]}
              />
            </p>
          )}

          {data?.ctaOptions && data.ctaOptions.length > 0 && (
            <motion.div
              className="mx-auto mb-8 grid max-w-3xl gap-6 md:grid-cols-2"
              initial={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              {data.ctaOptions.map((option, index) => {
                const isFeatured = Boolean(option.featured)
                const badgeLabel = resolveLocaleString(option.badgeLabel, locale)
                const benefits = option.benefits ?? []

                return (
                  <div
                    className={`relative rounded-2xl border p-6 transition-all duration-300 ${
                      isFeatured
                        ? 'border-primary/50 bg-gradient-card hover:border-primary'
                        : 'border-border bg-secondary/50 hover:border-primary/30'
                    }`}
                    key={option._key ?? `final-cta-option-${index}`}
                  >
                    {isFeatured && (
                      <div className="-translate-x-1/2 -top-3 absolute left-1/2 rounded-full bg-gradient-gold px-3 py-1 font-bold text-primary-foreground text-xs">
                        {badgeLabel || 'MELHOR VALOR'}
                      </div>
                    )}
                    <div
                      className={`mx-auto mb-4 flex size-12 items-center justify-center rounded-xl ${
                        isFeatured ? 'bg-gradient-gold shadow-button' : 'bg-secondary'
                      }`}
                    >
                      {option.icon ? (
                        <Icon
                          className={
                            isFeatured ? 'size-6 text-primary-foreground' : 'size-6 text-primary'
                          }
                          name={option.icon}
                        />
                      ) : isFeatured ? (
                        <Package className="size-6 text-primary-foreground" />
                      ) : (
                        <Layers className="size-6 text-primary" />
                      )}
                    </div>
                    {option.title && (
                      <h3 className="mb-2 font-bold font-display text-foreground text-xl">
                        {resolveLocaleString(option.title, locale)}
                      </h3>
                    )}
                    {option.description && (
                      <p className="mb-4 text-muted-foreground text-sm">
                        {resolveLocaleString(option.description, locale)}
                      </p>
                    )}
                    {benefits.length > 0 && (
                      <div className="mb-4 space-y-1 font-medium text-primary text-xs">
                        {benefits.map((benefit, benefitIndex) => {
                          const benefitText =
                            typeof benefit === 'object' && benefit !== null && 'text' in benefit
                              ? (benefit as { text?: Record<string, string> }).text
                              : (benefit as Record<string, string>)
                          const key =
                            typeof benefit === 'object' && benefit !== null && '_key' in benefit
                              ? benefit._key
                              : undefined

                          return (
                            <p key={key ?? `${option._key ?? index}-benefit-${benefitIndex}`}>
                              {resolveLocaleString(benefitText ?? undefined, locale)}
                            </p>
                          )
                        })}
                      </div>
                    )}
                    {option.cta && (
                      <CallAction base="default" button={option.cta} className="w-full" />
                    )}
                  </div>
                )
              })}
            </motion.div>
          )}

          {footerNote && (
            <p className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
              <Sparkles className="size-4 text-primary" />
              {footerNote}
            </p>
          )}

          {trustBadges.length > 0 && (
            <motion.div
              className="mt-12 border-border border-t pt-8"
              initial={{ opacity: 0 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1 }}
            >
              <div className="flex flex-wrap justify-center gap-8 text-muted-foreground text-sm">
                {trustBadges.map((badge, index) => {
                  const key = '_key' in badge ? badge._key : undefined
                  const icon = 'icon' in badge ? badge.icon : undefined
                  return (
                    <div className="flex items-center gap-2" key={key ?? `badge-${index}`}>
                      {icon ? (
                        <Icon className="size-4 text-primary" name={icon} />
                      ) : (
                        <div className="size-2 rounded-full bg-primary" />
                      )}
                      <span>{resolveLocaleString(badge.label, locale)}</span>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </StickySection>
  )
}
