import { CheckList } from '@ez/web/components/redesign/check-list'
import { RedesignFooter } from '@ez/web/components/redesign/footer'
import { RedesignNav } from '@ez/web/components/redesign/nav'
import { NeuralBackground } from '@ez/web/components/redesign/neural-background'
import { ParallaxImage } from '@ez/web/components/redesign/parallax-image'
import { RevealSection } from '@ez/web/components/redesign/reveal-section'
import { StaggerGrid } from '@ez/web/components/redesign/stagger-grid'
import { StatRow } from '@ez/web/components/redesign/stat-row'
import { TiltCard } from '@ez/web/components/redesign/tilt-card'
import { redesignLayoutContent } from '@ez/web/content/redesign/layout'
import { redesignMentoriaContent } from '@ez/web/content/redesign/mentoria'
import type { Locale } from 'next-intl'

export default async function RedesignMentoriaPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const content = redesignMentoriaContent[locale]
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
            <h1 className="rdg-display mb-6">{content.hero.title}</h1>
            <p className="mb-8 max-w-2xl text-[var(--rdg-on-surface-variant)] text-lg">
              {content.hero.subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="rdg-btn rdg-btn-primary px-8 py-4" type="button">
                {content.hero.cta}
              </button>
              <button className="rdg-btn rdg-btn-ghost px-8 py-4" type="button">
                {content.hero.ctaSecondary}
              </button>
            </div>
          </div>
        </section>

        {/* Hero visual */}
        <RevealSection className="mx-auto w-full max-w-7xl px-6 pb-24">
          <ParallaxImage
            alt={content.hero.imageAlt}
            className="h-full w-full object-cover"
            containerClassName="rdg-glass aspect-[21/9] w-full rounded-[2rem] p-2"
            height={686}
            src="/assets/redesign/mentoria-hero.jpg"
            width={1600}
          />
        </RevealSection>

        {/* Intro */}
        <RevealSection className="relative mx-auto w-full max-w-4xl px-6 py-24">
          <div
            aria-hidden
            className="-z-10 -translate-x-1/2 absolute inset-y-0 left-1/2 w-screen bg-[var(--rdg-surface-low)]"
          />
          <h2 className="rdg-headline mb-8 text-center">{content.intro.title}</h2>
          <div className="space-y-6">
            {content.intro.paragraphs.map((paragraph) => (
              <p
                className="text-[var(--rdg-on-surface-variant)] text-lg"
                key={paragraph.slice(0, 24)}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </RevealSection>

        {/* Steps timeline */}
        <RevealSection className="mx-auto w-full max-w-7xl px-6 py-24">
          <div className="mb-16 text-center">
            <span className="rdg-label mb-4 block text-[var(--rdg-copper)]">
              {content.steps.eyebrow}
            </span>
            <h2 className="rdg-headline mb-4">{content.steps.title}</h2>
            <p className="text-[var(--rdg-on-surface-variant)]">{content.steps.subtitle}</p>
          </div>
          <StaggerGrid className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {content.steps.items.map((step) => (
              <TiltCard className="rdg-glass rounded-[2rem] p-8" key={step.number}>
                <span className="rdg-copper-text mb-4 block font-bold text-3xl">{step.number}</span>
                <h3 className="mb-3 font-bold text-lg">{step.title}</h3>
                <p className="text-[var(--rdg-on-surface-variant)] text-sm">{step.description}</p>
              </TiltCard>
            ))}
          </StaggerGrid>
        </RevealSection>

        {/* Audience */}
        <RevealSection className="relative mx-auto w-full max-w-4xl px-6 py-24">
          <div
            aria-hidden
            className="-z-10 -translate-x-1/2 absolute inset-y-0 left-1/2 w-screen bg-[var(--rdg-surface-low)]"
          />
          <h2 className="rdg-headline mb-8 text-center">{content.audience.title}</h2>
          <div className="space-y-6">
            {content.audience.paragraphs.map((paragraph) => (
              <p
                className="text-[var(--rdg-on-surface-variant)] text-lg"
                key={paragraph.slice(0, 24)}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </RevealSection>

        {/* Results */}
        <RevealSection className="mx-auto w-full max-w-7xl px-6 py-24">
          <div className="mb-12 text-center">
            <h2 className="rdg-headline mb-4">{content.results.title}</h2>
            <p className="mx-auto max-w-2xl text-[var(--rdg-on-surface-variant)]">
              {content.results.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <ParallaxImage
              alt={content.results.imageAlt}
              className="h-full w-full object-cover"
              containerClassName="rdg-glass aspect-square w-full rounded-[2rem] p-2"
              height={1000}
              src="/assets/redesign/mentoria-results.jpg"
              width={1000}
            />
            <div className="space-y-10">
              <CheckList items={content.results.items} />
              <StatRow className="grid grid-cols-2 gap-8" stats={content.results.stats} />
            </div>
          </div>
        </RevealSection>

        {/* Final CTA */}
        <RevealSection className="mx-auto w-full max-w-4xl px-6 py-24 text-center">
          <div className="rdg-glass rounded-[2rem] p-16">
            <h2 className="rdg-headline mb-6">{content.finalCta.title}</h2>
            <p className="mx-auto mb-10 max-w-xl text-[var(--rdg-on-surface-variant)]">
              {content.finalCta.body}
            </p>
            <button className="rdg-btn rdg-btn-primary px-10 py-4" type="button">
              {content.finalCta.cta}
            </button>
          </div>
        </RevealSection>
      </main>

      <RedesignFooter content={layout.footer} />
    </div>
  )
}
