'use client'

import { cn } from '@ez/shared/lib/utils'
import { CallAction } from '@ez/web/components/ui/call-action-button'
import { ComingSoonRibbon } from '@ez/web/components/ui/coming-soon-ribbon'
import { Icon } from '@ez/web/components/ui/icon'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import { urlForImage } from '@ez/web/config/image'
import type { SectionHomeServices } from '@ez/web/types/landing/home'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import { PortableText } from '@portabletext/react'
import { ShieldCheck } from 'lucide-react'
import { motion } from 'motion/react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

export const Services = ({
  data,
  locale,
  comingSoon = false,
}: {
  data: SectionHomeServices
  locale: string
  comingSoon?: boolean
}) => {
  const t = useTranslations('LandingPageHome')

  return (
    <StickySection className="relative bg-background py-20 md:py-32" id="services">
      {comingSoon && (
        <ComingSoonRibbon className="absolute top-6 right-6 z-20 px-4 py-1.5 text-xs tracking-[0.22em]" />
      )}
      <div className={cn(comingSoon && 'grayscale')}>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 text-center"
          initial={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          <span className="inline-block rounded-full border border-accent/20 bg-accent/5 px-5 py-2 font-semibold text-accent text-sm uppercase tracking-widest shadow-[0_0_18px_rgba(var(--brand-accent-rgb),0.12)]">
            Atendimentos Individuais
          </span>
        </motion.div>
        {data?.heading?.[locale] && (
          <motion.h2
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 text-center font-bold text-4xl text-foreground leading-tight md:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <PortableText components={createPortableComponents()} value={data.heading[locale]} />
          </motion.h2>
        )}
        <div className="mb-16 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col items-center">
            {data?.subheading?.[locale] && (
              <div className="space-y-4 text-justify text-lg text-muted-foreground leading-relaxed md:text-xl">
                <PortableText
                  components={createPortableComponents()}
                  value={data.subheading[locale]}
                />
              </div>
            )}
          </div>

          <div className="relative">
            <div className="relative h-[400px] w-full overflow-hidden rounded-2xl shadow-2xl">
              <Image
                alt=""
                className="h-[400px] w-full object-cover lg:h-[450px]"
                fill
                src={urlForImage(data.image.asset).format('webp').quality(80).url()}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/80 via-brand-primary/20 to-transparent" />

              <div className="absolute right-6 bottom-6 left-6 flex gap-4">
                <div
                  className="flex-1 rounded-xl bg-background/95 p-4 shadow-lg backdrop-blur-sm"
                  style={{ animationDelay: '0.2s' }}
                >
                  <div className="mb-1 font-bold text-2xl text-primary">15+</div>
                  <div className="text-muted-foreground text-xs">{t('expOfYears')}</div>
                </div>
                <div
                  className="flex-1 rounded-xl bg-background/95 p-4 shadow-lg backdrop-blur-sm"
                  style={{ animationDelay: '0.3s' }}
                >
                  <div className="mb-1 font-bold text-2xl text-accent">100%</div>
                  <div className="text-muted-foreground text-xs">{t('scienceBased')}</div>
                </div>
              </div>
            </div>

            <div className="-bottom-4 -right-4 absolute size-32 rounded-full bg-accent/10 blur-3xl" />
          </div>
        </div>

        <div className="mx-auto">
          {data.items.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {data.items.map((service, index) => {
                return (
                  <motion.div
                    className="flex min-h-[88px] cursor-pointer items-center gap-4 rounded-2xl border border-accent/20 bg-card/60 p-5 shadow-sm transition-all duration-300 ease-out hover:scale-[1.03] hover:shadow-md"
                    initial={{ opacity: 0, y: 30 }}
                    // biome-ignore lint/suspicious/noArrayIndexKey: false positive
                    key={`home-services-${index}`}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileInView={{ opacity: 1, y: 0 }}
                  >
                    {service.icon && (
                      <div className="flex size-12 flex-shrink-0 items-center justify-center rounded-xl bg-accent/10">
                        <Icon
                          className="size-6 text-accent/70"
                          name={service.icon}
                          strokeWidth={2}
                        />
                      </div>
                    )}
                    <p className="font-semibold text-[0.9rem] text-foreground/95 leading-snug">
                      {service.title[locale]}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          )}

          <div className="mt-6 mb-6 flex justify-center">
            <div className="inline-flex min-h-[88px] items-center gap-4 rounded-2xl border border-accent/20 bg-card/60 px-8 py-5 shadow-sm">
              <div className="flex size-12 flex-shrink-0 items-center justify-center rounded-xl bg-accent/10">
                <ShieldCheck className="size-6 text-accent/70" />
              </div>
              <p className="font-semibold text-[0.9rem] text-foreground/95 leading-snug">
                {t('firstConsultationIncludes')}
              </p>
            </div>
          </div>

          {data.cta && data.cta.length > 0 && (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col justify-center gap-4 sm:flex-row"
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
      </div>
    </StickySection>
  )
}
