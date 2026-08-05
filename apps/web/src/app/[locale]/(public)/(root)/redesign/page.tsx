import { CheckList } from '@ez/web/components/redesign/check-list'
import { RedesignFooter } from '@ez/web/components/redesign/footer'
import { RedesignNav } from '@ez/web/components/redesign/nav'
import { NeuralBackground } from '@ez/web/components/redesign/neural-background'
import { ParallaxImage } from '@ez/web/components/redesign/parallax-image'
import { RevealSection } from '@ez/web/components/redesign/reveal-section'
import { StaggerGrid } from '@ez/web/components/redesign/stagger-grid'
import { StatRow } from '@ez/web/components/redesign/stat-row'
import { TiltCard } from '@ez/web/components/redesign/tilt-card'
import { redesignHomeContent } from '@ez/web/content/redesign/home'
import { redesignLayoutContent } from '@ez/web/content/redesign/layout'
import type { RedesignIcon } from '@ez/web/content/redesign/types'
import { Link } from '@ez/web/i18n/redesign-navigation'
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Brain,
  Building2,
  Compass,
  HeartHandshake,
  Quote,
  TrendingUp,
} from 'lucide-react'
import type { Locale } from 'next-intl'
import type { ComponentType } from 'react'

const ICONS: Record<RedesignIcon, ComponentType<{ className?: string }>> = {
  brain: Brain,
  'trending-up': TrendingUp,
  'bar-chart': BarChart3,
  building: Building2,
  'heart-handshake': HeartHandshake,
  compass: Compass,
}

export default async function RedesignHomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const content = redesignHomeContent[locale]
  const layout = redesignLayoutContent[locale]

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      <NeuralBackground hero heroOffsetX={3.4} />
      <RedesignNav content={layout.nav} />

      <main className="flex-1 pt-20">
        {/* Hero */}
        <section className="relative flex min-h-[70vh] items-center overflow-hidden px-6">
          <div className="-z-10 pointer-events-none absolute inset-0 bg-gradient-to-r from-[var(--rdg-bg)] via-[var(--rdg-bg)]/70 to-transparent" />
          <div className="relative mx-auto max-w-4xl">
            <span className="rdg-label mb-4 block text-[var(--rdg-copper)]">
              {content.hero.eyebrow}
            </span>
            <h1 className="rdg-display mb-6">
              {content.hero.title} <span className="rdg-copper-text">{content.hero.highlight}</span>
            </h1>
            <p className="mb-8 max-w-lg text-[var(--rdg-on-surface-variant)] text-lg">
              {content.hero.subtitle}
            </p>
            <button
              className="rdg-btn rdg-btn-primary flex items-center gap-3 px-8 py-4"
              type="button"
            >
              <span>{content.hero.cta}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>

        {/* Neurocognitive exercises */}
        <RevealSection className="relative mx-auto w-full max-w-7xl px-6 py-24" id="research">
          <div
            aria-hidden
            className="-z-10 -translate-x-1/2 absolute inset-y-0 left-1/2 w-screen bg-[var(--rdg-surface-low)]"
          />
          <div className="mb-16 text-center">
            <span className="rdg-label mb-4 block text-[var(--rdg-copper)]">
              {content.neurocognitive.eyebrow}
            </span>
            <h2 className="rdg-headline">
              {content.neurocognitive.title}
              <br />
              <span className="rdg-copper-text">{content.neurocognitive.highlight}</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div className="space-y-6">
              {content.neurocognitive.paragraphs.map((paragraph) => (
                <p
                  className="text-[var(--rdg-on-surface-variant)] text-lg"
                  key={paragraph.slice(0, 24)}
                >
                  {paragraph}
                </p>
              ))}
              <StatRow stats={content.neurocognitive.stats} />
            </div>
            <ParallaxImage
              alt={content.neurocognitive.imageAlt}
              className="h-full w-full object-cover"
              containerClassName="rdg-glass aspect-video rounded-3xl p-2"
              height={720}
              src="/assets/redesign/neurocognitive.jpg"
              width={1280}
            />
          </div>
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
            <CheckList items={content.neurocognitive.benefits} />
          </div>
          <div className="mt-10 flex justify-center">
            <button className="rdg-btn rdg-btn-primary px-8 py-3" type="button">
              {content.neurocognitive.cta}
            </button>
          </div>
        </RevealSection>

        {/* Testimonials */}
        <RevealSection className="mx-auto w-full max-w-7xl px-6 py-24">
          <h2 className="rdg-headline mb-16 text-center">{content.testimonials.title}</h2>
          <StaggerGrid className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {content.testimonials.items.map((testimonial) => (
              <TiltCard className="rdg-glass flex flex-col rounded-3xl p-8" key={testimonial.name}>
                <Quote className="mb-4 h-6 w-6 text-[var(--rdg-copper)]" />
                <p className="mb-6 flex-1 text-[var(--rdg-on-surface-variant)] text-sm leading-relaxed">
                  {testimonial.quote}
                </p>
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="rdg-label opacity-70">{testimonial.role}</p>
                </div>
              </TiltCard>
            ))}
          </StaggerGrid>
        </RevealSection>

        {/* Mentoring & advisory */}
        <RevealSection className="relative mx-auto w-full max-w-7xl px-6 py-24" id="innovation">
          <div
            aria-hidden
            className="-z-10 -translate-x-1/2 absolute inset-y-0 left-1/2 w-screen bg-[var(--rdg-surface-low)]"
          />
          <div className="mb-12 text-center">
            <span className="rdg-label mb-4 block text-[var(--rdg-copper)]">
              {content.mentoring.eyebrow}
            </span>
            <h2 className="rdg-headline mb-4">
              {content.mentoring.title}{' '}
              <span className="rdg-copper-text">{content.mentoring.highlight}</span>
            </h2>
            <p className="mx-auto max-w-2xl text-[var(--rdg-on-surface-variant)]">
              {content.mentoring.intro}
            </p>
          </div>
          <StaggerGrid className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {content.mentoring.cards.map((card) => {
              const Icon = ICONS[card.icon]
              return (
                <TiltCard
                  className="rdg-glass group rounded-[3rem] p-8 transition-colors duration-500 hover:border-[var(--rdg-copper)]/50"
                  key={card.title}
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-[var(--rdg-copper)]/20 bg-[var(--rdg-copper)]/10 text-[var(--rdg-copper)] transition-all group-hover:bg-[var(--rdg-copper)] group-hover:text-[var(--rdg-bg)]">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mb-3 font-bold text-2xl">{card.title}</h3>
                  <p className="text-[var(--rdg-on-surface-variant)]">{card.description}</p>
                </TiltCard>
              )
            })}
          </StaggerGrid>
          <div className="mt-16 flex justify-center">
            <button className="rdg-btn rdg-btn-ghost px-10 py-3" type="button">
              {content.mentoring.cta}
            </button>
          </div>
        </RevealSection>

        {/* Enterprise product */}
        <RevealSection className="mx-auto w-full max-w-7xl px-6 py-24">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <ParallaxImage
              alt={content.business.imageAlt}
              className="h-full w-full object-cover"
              containerClassName="rdg-glass order-2 aspect-video rounded-3xl p-2 lg:order-1"
              height={720}
              src="/assets/redesign/business.jpg"
              width={1280}
            />
            <div className="order-1 space-y-6 lg:order-2">
              <span className="rdg-label block text-[var(--rdg-copper)]">
                {content.business.eyebrow}
              </span>
              <h2 className="rdg-headline">
                {content.business.title}{' '}
                <span className="rdg-copper-text">{content.business.highlight}</span>
              </h2>
              <p className="text-[var(--rdg-on-surface-variant)] text-lg">
                {content.business.description}
              </p>
              <StatRow stats={content.business.stats} />
              <CheckList items={content.business.benefits} />
              <Link
                className="rdg-btn rdg-btn-primary inline-flex px-8 py-3"
                href="/redesign/matematizador"
              >
                {content.business.cta}
              </Link>
            </div>
          </div>
        </RevealSection>

        {/* Workshops */}
        <RevealSection className="relative mx-auto w-full max-w-7xl px-6 py-24">
          <div
            aria-hidden
            className="-z-10 -translate-x-1/2 absolute inset-y-0 left-1/2 w-screen bg-[var(--rdg-surface-low)]"
          />
          <div className="mb-12 text-center">
            <span className="rdg-label mb-4 block text-[var(--rdg-copper)]">
              {content.workshops.eyebrow}
            </span>
            <h2 className="rdg-headline mx-auto mb-4 max-w-3xl">{content.workshops.title}</h2>
            <p className="mx-auto max-w-2xl text-[var(--rdg-on-surface-variant)]">
              {content.workshops.intro}
            </p>
          </div>
          <StaggerGrid className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {content.workshops.cards.map((card) => (
              <TiltCard className="rdg-glass rounded-3xl p-8" key={card.title}>
                <h3 className="mb-3 font-bold text-xl">{card.title}</h3>
                <p className="text-[var(--rdg-on-surface-variant)]">{card.description}</p>
              </TiltCard>
            ))}
          </StaggerGrid>
          <div className="mt-12 flex justify-center">
            <Link
              className="rdg-btn rdg-btn-primary inline-flex px-8 py-3"
              href="/redesign/desenvolvimento-humano"
            >
              {content.workshops.cta}
            </Link>
          </div>
        </RevealSection>

        {/* Digital products */}
        <RevealSection className="mx-auto w-full max-w-7xl px-6 py-24" id="programs">
          <div className="mb-16 text-center">
            <h2 className="rdg-headline mb-2">{content.digitalProducts.title}</h2>
            <h3 className="text-2xl text-[var(--rdg-copper)]">
              {content.digitalProducts.highlight}
            </h3>
          </div>
          <div className="rdg-glass flex flex-col items-center gap-12 rounded-[3rem] p-10 md:flex-row">
            <ParallaxImage
              alt={content.digitalProducts.imageAlt}
              className="h-full w-full object-cover"
              containerClassName="aspect-square w-full rounded-2xl md:w-1/2"
              height={800}
              src="/assets/redesign/digital-products.jpg"
              width={800}
            />
            <div className="w-full space-y-6 md:w-1/2">
              <div className="inline-flex items-center rounded-full border border-[var(--rdg-outline-ghost)] bg-[var(--rdg-scrim)] px-4 py-1.5 font-bold text-[var(--rdg-copper)] text-xs">
                <BookOpen className="mr-2 h-4 w-4" /> {content.digitalProducts.badge}
              </div>
              <h4 className="font-bold text-3xl">{content.digitalProducts.cardTitle}</h4>
              <p className="text-[var(--rdg-on-surface-variant)] text-lg">
                {content.digitalProducts.cardDescription}
              </p>
              <button
                className="mt-4 cursor-pointer rounded-full border-2 border-[var(--rdg-outline-ghost)] px-8 py-3 font-bold transition-all hover:border-[var(--rdg-copper)] hover:text-[var(--rdg-copper)]"
                type="button"
              >
                {content.digitalProducts.cta}
              </button>
            </div>
          </div>
        </RevealSection>

        {/* Immersion teaser */}
        <RevealSection className="mx-auto w-full max-w-6xl px-6 py-24">
          <ParallaxImage
            alt={content.immersionTeaser.imageAlt}
            className="h-full w-full object-cover"
            containerClassName="rdg-glass mb-10 aspect-[21/9] w-full rounded-3xl p-2"
            height={823}
            src="/assets/redesign/immersion-teaser.jpg"
            width={1600}
          />
          <div className="mx-auto max-w-2xl text-center">
            <span className="rdg-label mb-4 block text-[var(--rdg-copper)]">
              {content.immersionTeaser.eyebrow}
            </span>
            <h2 className="rdg-headline mb-6">{content.immersionTeaser.title}</h2>
            <div className="mb-8 space-y-4">
              {content.immersionTeaser.paragraphs.map((paragraph) => (
                <p className="text-[var(--rdg-on-surface-variant)]" key={paragraph.slice(0, 24)}>
                  {paragraph}
                </p>
              ))}
            </div>
            <button className="rdg-btn rdg-btn-ghost px-8 py-3" type="button">
              {content.immersionTeaser.cta}
            </button>
          </div>
        </RevealSection>
      </main>

      <RedesignFooter content={layout.footer} />
    </div>
  )
}
