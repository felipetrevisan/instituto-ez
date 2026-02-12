'use client'

import { CallAction } from '@ez/web/components/ui/call-action-button'
import { Icon } from '@ez/web/components/ui/icon'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import { urlForImage } from '@ez/web/config/image'
import type { SectionMasterclassCatalog } from '@ez/web/types/landing/masterclass'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import { resolveLocaleString } from '@ez/web/utils/resolve-locale-string'
import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from 'next-sanity'

export const Catalog = ({ data, locale }: { data: SectionMasterclassCatalog; locale: string }) => {
  const resolveSlug = (slug?: unknown) => {
    if (!slug) return undefined
    if (typeof slug === 'string') {
      const normalized = slug.replace(/^drafts\./, '')
      if (normalized.startsWith('masterclass.')) {
        return normalized.replace('masterclass.', '')
      }
      return normalized
    }
    if (typeof slug === 'object') {
      const slugObject = slug as Record<string, unknown>
      const localized = slugObject[locale]
      if (localized && typeof localized === 'object') {
        const localizedCurrent = (localized as { current?: string }).current
        if (localizedCurrent) return localizedCurrent
      }

      const directCurrent = (slugObject as { current?: string }).current
      if (directCurrent) return directCurrent

      for (const value of Object.values(slugObject)) {
        if (typeof value === 'string') return value
        if (value && typeof value === 'object') {
          const current = (value as { current?: string }).current
          if (current) return current
        }
      }
    }
    return undefined
  }

  const featuredSlug = resolveSlug(
    data?.featured?.masterclassSlug ??
      data?.featured?.masterclass?.slug ??
      data?.featured?.masterclassId ??
      data?.featured?.masterclassRef,
  )
  const featuredHref = featuredSlug ? `/${locale}/masterclass/${featuredSlug}` : null
  const featuredCardClass = `overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 md:flex ${
    featuredHref
      ? 'hover:-translate-y-1 hover:border-primary/50 hover:shadow-gold'
      : 'cursor-not-allowed opacity-60 grayscale'
  }`
  const featuredImageClass = `h-48 w-full object-cover transition-transform duration-500 md:h-full ${
    featuredHref ? 'group-hover:scale-105' : ''
  }`

  return (
    <StickySection
      className="relative overflow-hidden bg-gradient-hero py-24 lg:py-32"
      id="masterclasses"
    >
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'linear-gradient(hsl(var(--primary) / 0.5) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container relative z-10 px-4">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {data?.heading?.[locale] && (
            <h2 className="mb-6 font-bold font-display text-3xl text-foreground md:text-4xl lg:text-5xl">
              <PortableText components={createPortableComponents()} value={data.heading[locale]} />
            </h2>
          )}

          {data?.intro?.[locale] && (
            <p className="mx-auto mb-4 max-w-3xl text-muted-foreground text-xl">
              <PortableText components={createPortableComponents()} value={data.intro[locale]} />
            </p>
          )}
        </motion.div>

        {data?.featured && (
          <motion.div
            className="group mx-auto mb-6 max-w-6xl"
            initial={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: '-50px' }}
            whileInView={{ opacity: 1, scale: 1 }}
          >
            {featuredHref ? (
              <Link className="block" href={featuredHref}>
                <div className={featuredCardClass}>
                  <div className="relative overflow-hidden md:w-2/5">
                    {data.featured.image && (
                      <Image
                        alt={resolveLocaleString(data.featured.title, locale) ?? ''}
                        className={featuredImageClass}
                        height={640}
                        src={urlForImage(data.featured.image.asset)
                          .auto('format')
                          .quality(80)
                          .url()}
                        width={960}
                      />
                    )}
                    {data.featured.number && (
                      <span className="absolute top-3 left-3 flex size-8 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground text-sm shadow-button">
                        {resolveLocaleString(data.featured.number, locale)}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col justify-center p-6 md:w-3/5">
                    {data.featured.title && (
                      <h3 className="mb-2 font-bold font-display text-foreground text-xl leading-tight md:text-2xl">
                        {resolveLocaleString(data.featured.title, locale)}
                      </h3>
                    )}
                    {data.featured.description && (
                      <p className="mb-3 text-muted-foreground text-sm">
                        {resolveLocaleString(data.featured.description, locale)}
                      </p>
                    )}
                    {data.featured.pain && (
                      <p className="mb-4 text-primary/80 text-xs italic">
                        ✓ {resolveLocaleString(data.featured.pain, locale)}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ) : (
              <div className={featuredCardClass}>
                <div className="relative overflow-hidden md:w-2/5">
                  {data.featured.image && (
                    <Image
                      alt={resolveLocaleString(data.featured.title, locale) ?? ''}
                      className={featuredImageClass}
                      height={640}
                      src={urlForImage(data.featured.image.asset).auto('format').quality(80).url()}
                      width={960}
                    />
                  )}
                  {data.featured.number && (
                    <span className="absolute top-3 left-3 flex size-8 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground text-sm shadow-button">
                      {resolveLocaleString(data.featured.number, locale)}
                    </span>
                  )}
                </div>
                <div className="flex flex-col justify-center p-6 md:w-3/5">
                  {data.featured.title && (
                    <h3 className="mb-2 font-bold font-display text-foreground text-xl leading-tight md:text-2xl">
                      {resolveLocaleString(data.featured.title, locale)}
                    </h3>
                  )}
                  {data.featured.description && (
                    <p className="mb-3 text-muted-foreground text-sm">
                      {resolveLocaleString(data.featured.description, locale)}
                    </p>
                  )}
                  {data.featured.pain && (
                    <p className="mb-4 text-primary/80 text-xs italic">
                      ✓ {resolveLocaleString(data.featured.pain, locale)}
                    </p>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {data?.items && data.items.length > 0 && (
          <div className="mx-auto mb-6 grid max-w-6xl gap-4 md:grid-cols-3">
            {data.items.map((item, index) => {
              const isExclusive = Boolean(item.exclusive)
              const exclusiveLabel = resolveLocaleString(item.exclusiveLabel, locale)
              const exclusiveBonus = resolveLocaleString(item.exclusiveBonus, locale)
              const slug = resolveSlug(
                item.masterclassSlug ??
                  item.masterclass?.slug ??
                  item.masterclassId ??
                  item.masterclassRef,
              )
              const href = slug ? `/${locale}/masterclass/${slug}` : null
              const isDisabled = !href
              const cardClass = `flex h-full flex-col overflow-hidden rounded-xl bg-card transition-all duration-300 ${
                isExclusive ? 'border-2 border-primary/50' : 'border border-border'
              } ${
                isDisabled
                  ? 'cursor-not-allowed opacity-60 grayscale'
                  : isExclusive
                    ? 'hover:-translate-y-1 hover:border-primary hover:shadow-gold'
                    : 'hover:-translate-y-1 hover:border-primary/50 hover:shadow-gold'
              }`
              const imageClass = `h-48 w-full object-cover transition-transform duration-500 ${
                isDisabled ? '' : 'group-hover:scale-105'
              }`

              return (
                <motion.div
                  className={isExclusive ? 'group relative pt-3' : 'group'}
                  initial={{ opacity: 0, scale: 0.95 }}
                  key={item._key ?? `masterclass-${index}`}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true, margin: '-50px' }}
                  whileInView={{ opacity: 1, scale: 1 }}
                >
                  {href ? (
                    <Link className="block" href={href}>
                      {isExclusive && exclusiveLabel && (
                        <div className="-translate-x-1/2 absolute top-0 left-1/2 z-20 rounded-full bg-gradient-gold px-4 py-1 text-center font-bold text-primary-foreground text-xs shadow-button">
                          {exclusiveLabel}
                        </div>
                      )}
                      <div className={cardClass}>
                        <div className="relative overflow-hidden">
                          {item.image && (
                            <Image
                              alt={resolveLocaleString(item.title, locale) ?? ''}
                              className={imageClass}
                              height={320}
                              src={urlForImage(item.image.asset).auto('format').quality(80).url()}
                              width={480}
                            />
                          )}
                          {item.number && (
                            <span
                              className={`absolute top-3 left-3 z-10 flex size-8 items-center justify-center rounded-full font-bold text-sm shadow-button ${
                                isExclusive
                                  ? 'bg-foreground text-background'
                                  : 'bg-primary text-primary-foreground'
                              }`}
                            >
                              {resolveLocaleString(item.number, locale)}
                            </span>
                          )}
                        </div>
                        <div className="flex flex-1 flex-col p-5">
                          {item.title && (
                            <h3 className="mb-1 font-bold font-display text-foreground text-lg leading-tight">
                              {resolveLocaleString(item.title, locale)}
                            </h3>
                          )}
                          {item.description && (
                            <p className="mb-2 line-clamp-2 text-muted-foreground text-sm">
                              {resolveLocaleString(item.description, locale)}
                            </p>
                          )}
                          {item.pain && (
                            <p
                              className={`mb-3 text-xs italic ${
                                isExclusive ? 'font-medium text-primary' : 'text-primary/80'
                              }`}
                            >
                              ✓ {resolveLocaleString(item.pain, locale)}
                            </p>
                          )}
                          {isExclusive && exclusiveBonus && (
                            <p className="mb-3 text-muted-foreground text-sm">{exclusiveBonus}</p>
                          )}
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <>
                      {isExclusive && exclusiveLabel && (
                        <div className="-translate-x-1/2 absolute top-0 left-1/2 z-20 rounded-full bg-gradient-gold px-4 py-1 text-center font-bold text-primary-foreground text-xs shadow-button">
                          {exclusiveLabel}
                        </div>
                      )}
                      <div className={cardClass}>
                        <div className="relative overflow-hidden">
                          {item.image && (
                            <Image
                              alt={resolveLocaleString(item.title, locale) ?? ''}
                              className={imageClass}
                              height={320}
                              src={urlForImage(item.image.asset).auto('format').quality(80).url()}
                              width={480}
                            />
                          )}
                          {item.number && (
                            <span
                              className={`absolute top-3 left-3 z-10 flex size-8 items-center justify-center rounded-full font-bold text-sm shadow-button ${
                                isExclusive
                                  ? 'bg-foreground text-background'
                                  : 'bg-primary text-primary-foreground'
                              }`}
                            >
                              {resolveLocaleString(item.number, locale)}
                            </span>
                          )}
                        </div>
                        <div className="flex flex-1 flex-col p-5">
                          {item.title && (
                            <h3 className="mb-1 font-bold font-display text-foreground text-lg leading-tight">
                              {resolveLocaleString(item.title, locale)}
                            </h3>
                          )}
                          {item.description && (
                            <p className="mb-2 line-clamp-2 text-muted-foreground text-sm">
                              {resolveLocaleString(item.description, locale)}
                            </p>
                          )}
                          {item.pain && (
                            <p
                              className={`mb-3 text-xs italic ${
                                isExclusive ? 'font-medium text-primary' : 'text-primary/80'
                              }`}
                            >
                              ✓ {resolveLocaleString(item.pain, locale)}
                            </p>
                          )}
                          {isExclusive && exclusiveBonus && (
                            <p className="mb-3 text-muted-foreground text-sm">{exclusiveBonus}</p>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              )
            })}
          </div>
        )}

        {data?.ctaOptions && data.ctaOptions.length > 0 && (
          <motion.div
            className="mx-auto mt-10 mb-4 grid max-w-3xl gap-6 md:grid-cols-2"
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
                  className={`relative rounded-2xl border transition-all duration-300 ${
                    isFeatured
                      ? 'border-primary/50 bg-gradient-card hover:border-primary'
                      : 'border-border bg-secondary/50 hover:border-primary/30'
                  } p-6`}
                  key={option._key ?? `option-${index}`}
                >
                  {isFeatured && badgeLabel && (
                    <div className="-translate-x-1/2 -top-3 absolute left-1/2 rounded-full bg-gradient-gold px-3 py-1 font-bold text-primary-foreground text-xs">
                      {badgeLabel}
                    </div>
                  )}
                  {option.icon && (
                    <div
                      className={`mx-auto mb-4 flex size-12 items-center justify-center rounded-xl ${
                        isFeatured ? 'bg-gradient-gold shadow-button' : 'bg-secondary'
                      }`}
                    >
                      <Icon
                        className={
                          isFeatured ? 'size-6 text-primary-foreground' : 'size-6 text-primary'
                        }
                        name={option.icon}
                      />
                    </div>
                  )}
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
      </div>
    </StickySection>
  )
}
