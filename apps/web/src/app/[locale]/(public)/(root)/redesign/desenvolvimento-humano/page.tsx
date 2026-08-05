import { CheckList } from '@ez/web/components/redesign/check-list'
import { RedesignFooter } from '@ez/web/components/redesign/footer'
import { RedesignNav } from '@ez/web/components/redesign/nav'
import { NeuralBackground } from '@ez/web/components/redesign/neural-background'
import { ParallaxImage } from '@ez/web/components/redesign/parallax-image'
import { RevealSection } from '@ez/web/components/redesign/reveal-section'
import { StaggerGrid } from '@ez/web/components/redesign/stagger-grid'
import { TiltCard } from '@ez/web/components/redesign/tilt-card'
import { redesignDesenvolvimentoContent } from '@ez/web/content/redesign/desenvolvimento-humano'
import { redesignLayoutContent } from '@ez/web/content/redesign/layout'
import { ArrowRight, Brain, Clock, Heart, Phone, TrendingUp } from 'lucide-react'
import type { Locale } from 'next-intl'
import type { ComponentType } from 'react'

const INTRO_ICONS: ComponentType<{ className?: string }>[] = [TrendingUp, Heart, Brain]
const WORKSHOP_IMAGES = ['desenvolvimento-workshop-1.jpg', 'desenvolvimento-workshop-2.jpg']
const LECTURE_IMAGES = ['desenvolvimento-lecture-1.jpg', 'desenvolvimento-lecture-2.jpg']

export default async function RedesignDesenvolvimentoHumanoPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const content = redesignDesenvolvimentoContent[locale]
  const layout = redesignLayoutContent[locale]

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      <NeuralBackground hero />
      <RedesignNav content={layout.nav} />

      <main className="flex-1 pt-20">
        {/* Hero */}
        <section className="relative flex min-h-[70vh] items-center overflow-hidden px-6 text-center">
          <div className="relative mx-auto max-w-4xl">
            <h1 className="rdg-display mb-6">
              {content.hero.title} <span className="rdg-copper-text">{content.hero.highlight}</span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-[var(--rdg-on-surface-variant)] text-lg">
              {content.hero.subtitle}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                className="rdg-btn rdg-btn-primary flex items-center gap-3 px-8 py-4"
                type="button"
              >
                <span>{content.hero.ctaPrimary}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button className="rdg-btn rdg-btn-ghost px-8 py-4" type="button">
                {content.hero.ctaSecondary}
              </button>
            </div>
          </div>
        </section>

        {/* Intro */}
        <RevealSection className="mx-auto w-full max-w-7xl px-6 py-24">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <ParallaxImage
              alt={content.intro.imageAlt}
              className="h-full w-full object-cover"
              containerClassName="rdg-glass aspect-[4/5] w-full rounded-[2rem] p-2"
              height={1088}
              src="/assets/redesign/desenvolvimento-hero.jpg"
              width={1200}
            />
            <div>
              <h2 className="rdg-headline mb-6">{content.intro.title}</h2>
              <ul className="mb-8 flex flex-wrap gap-3">
                {content.intro.items.map((item, index) => {
                  const Icon = INTRO_ICONS[index % INTRO_ICONS.length]
                  return (
                    <li
                      className="flex items-center gap-2 rounded-full border border-[var(--rdg-copper)]/20 bg-[var(--rdg-copper)]/10 px-4 py-2 font-medium text-[var(--rdg-copper)] text-sm"
                      key={item}
                    >
                      <Icon className="h-4 w-4" />
                      {item}
                    </li>
                  )
                })}
              </ul>
              <p className="text-[var(--rdg-on-surface-variant)] text-lg">
                {content.intro.paragraph}
              </p>
            </div>
          </div>
        </RevealSection>

        {/* Workshops */}
        <RevealSection className="relative mx-auto w-full max-w-7xl px-6 py-24">
          <div
            aria-hidden
            className="-z-10 -translate-x-1/2 absolute inset-y-0 left-1/2 w-screen bg-[var(--rdg-surface-low)]"
          />
          <div className="mb-16 text-center">
            <span className="rdg-label mb-4 block text-[var(--rdg-copper)]">
              {content.workshops.eyebrow}
            </span>
            <h2 className="rdg-headline mx-auto mb-4 max-w-3xl">{content.workshops.title}</h2>
            <p className="mx-auto max-w-2xl text-[var(--rdg-on-surface-variant)]">
              {content.workshops.subheading}
            </p>
          </div>
          <StaggerGrid className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {content.workshops.cards.map((card, index) => (
              <TiltCard className="rdg-glass overflow-hidden rounded-[2rem]" key={card.title}>
                <ParallaxImage
                  alt={card.imageAlt}
                  className="h-full w-full object-cover"
                  containerClassName="aspect-[16/9] w-full"
                  height={450}
                  src={`/assets/redesign/${WORKSHOP_IMAGES[index % WORKSHOP_IMAGES.length]}`}
                  width={800}
                />
                <div className="p-8">
                  <div className="mb-3 flex flex-wrap gap-2">
                    {card.categories.map((category) => (
                      <span
                        className="rdg-label rounded-full bg-[var(--rdg-scrim)] px-3 py-1 text-[var(--rdg-copper)] text-xs"
                        key={category}
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                  <h3 className="mb-2 font-bold text-xl">{card.title}</h3>
                  <p className="mb-4 text-[var(--rdg-on-surface-variant)]">{card.description}</p>
                  <p className="mb-4 text-[var(--rdg-on-surface-variant)] text-sm leading-relaxed">
                    {card.text}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-[var(--rdg-on-surface-variant)]/70 text-sm">
                      <Clock className="h-4 w-4" />
                      {card.time}
                    </span>
                    <button className="rdg-btn rdg-btn-ghost px-5 py-2 text-sm" type="button">
                      {card.cta}
                    </button>
                  </div>
                </div>
              </TiltCard>
            ))}
          </StaggerGrid>
        </RevealSection>

        {/* Lectures */}
        <RevealSection className="mx-auto w-full max-w-7xl px-6 py-24">
          <div className="mb-16 text-center">
            <span className="rdg-label mb-4 block text-[var(--rdg-copper)]">
              {content.lectures.eyebrow}
            </span>
            <h2 className="rdg-headline mb-4">{content.lectures.title}</h2>
            <p className="mx-auto max-w-2xl text-[var(--rdg-on-surface-variant)]">
              {content.lectures.subheading}
            </p>
          </div>
          <StaggerGrid className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {content.lectures.cards.map((card, index) => (
              <TiltCard className="rdg-glass overflow-hidden rounded-[2rem]" key={card.title}>
                <ParallaxImage
                  alt={card.imageAlt}
                  className="h-full w-full object-cover"
                  containerClassName="aspect-[16/9] w-full"
                  height={450}
                  src={`/assets/redesign/${LECTURE_IMAGES[index % LECTURE_IMAGES.length]}`}
                  width={800}
                />
                <div className="p-8">
                  <span className="rdg-label mb-3 block text-[var(--rdg-copper)]">{card.tag}</span>
                  <h3 className="mb-2 font-bold text-xl">{card.title}</h3>
                  <p className="mb-4 font-medium text-[var(--rdg-on-surface-variant)]">
                    {card.description}
                  </p>
                  <p className="mb-6 text-[var(--rdg-on-surface-variant)] text-sm leading-relaxed">
                    {card.text}
                  </p>
                  <button className="rdg-btn rdg-btn-primary px-6 py-3 text-sm" type="button">
                    {card.cta}
                  </button>
                </div>
              </TiltCard>
            ))}
          </StaggerGrid>
        </RevealSection>

        {/* Consulting */}
        <RevealSection className="relative mx-auto w-full max-w-7xl px-6 py-24">
          <div
            aria-hidden
            className="-z-10 -translate-x-1/2 absolute inset-y-0 left-1/2 w-screen bg-[var(--rdg-surface-low)]"
          />
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <ParallaxImage
              alt={content.consulting.imageAlt}
              className="h-full w-full object-cover"
              containerClassName="rdg-glass aspect-[21/9] w-full rounded-[2rem] p-2 lg:aspect-square"
              height={546}
              src="/assets/redesign/desenvolvimento-secondary.jpg"
              width={1600}
            />
            <div>
              <h2 className="rdg-headline mb-4">{content.consulting.title}</h2>
              <p className="mb-8 text-[var(--rdg-on-surface-variant)] text-lg">
                {content.consulting.subheading}
              </p>
              <CheckList className="mb-8 grid grid-cols-1 gap-4" items={content.consulting.items} />
              <p className="mb-8 text-[var(--rdg-on-surface-variant)] italic">
                {content.consulting.footer}
              </p>
              <button className="rdg-btn rdg-btn-primary px-8 py-4" type="button">
                {content.consulting.cta}
              </button>
            </div>
          </div>
        </RevealSection>

        {/* Closing */}
        <RevealSection className="mx-auto w-full max-w-4xl px-6 py-24 text-center">
          <div className="rdg-glass rounded-[2rem] p-16">
            <h2 className="rdg-headline mb-8">{content.closing.title}</h2>
            <p className="mx-auto mb-10 max-w-xl text-[var(--rdg-on-surface-variant)]">
              {content.closing.text}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                className="rdg-btn rdg-btn-primary flex items-center gap-3 px-8 py-4"
                type="button"
              >
                <Phone className="h-4 w-4" />
                {content.closing.ctaPrimary}
              </button>
              <button className="rdg-btn rdg-btn-ghost px-8 py-4" type="button">
                {content.closing.ctaSecondary}
              </button>
            </div>
          </div>
        </RevealSection>
      </main>

      <RedesignFooter content={layout.footer} />
    </div>
  )
}
