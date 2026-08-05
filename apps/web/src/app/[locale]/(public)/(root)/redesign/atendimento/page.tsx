import { CheckList } from '@ez/web/components/redesign/check-list'
import { RedesignFooter } from '@ez/web/components/redesign/footer'
import { RedesignNav } from '@ez/web/components/redesign/nav'
import { NeuralBackground } from '@ez/web/components/redesign/neural-background'
import { ParallaxImage } from '@ez/web/components/redesign/parallax-image'
import { RevealSection } from '@ez/web/components/redesign/reveal-section'
import { StaggerGrid } from '@ez/web/components/redesign/stagger-grid'
import { TiltCard } from '@ez/web/components/redesign/tilt-card'
import { redesignAtendimentoContent } from '@ez/web/content/redesign/atendimento'
import { redesignLayoutContent } from '@ez/web/content/redesign/layout'
import { Brain, Compass, Lightbulb, Wind } from 'lucide-react'
import type { Locale } from 'next-intl'

const SESSION_ICONS = [Wind, Brain, Compass, Lightbulb]

export default async function RedesignAtendimentoPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const content = redesignAtendimentoContent[locale]
  const layout = redesignLayoutContent[locale]

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      <NeuralBackground hero />
      <RedesignNav content={layout.nav} />

      <main className="flex-1 pt-20">
        {/* Hero */}
        <section className="relative flex min-h-[70vh] items-center overflow-hidden px-6">
          <div className="relative mx-auto max-w-3xl text-center">
            <h1 className="rdg-display mb-6">{content.hero.title}</h1>
            <p className="mx-auto mb-8 max-w-2xl text-[var(--rdg-on-surface-variant)] text-lg">
              {content.hero.subtitle}
            </p>
            <button className="rdg-btn rdg-btn-primary mx-auto px-8 py-4" type="button">
              {content.hero.cta}
            </button>
          </div>
        </section>

        {/* Assessment */}
        <RevealSection className="mx-auto w-full max-w-7xl px-6 py-24">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <ParallaxImage
              alt={content.hero.imageAlt}
              className="h-full w-full object-cover"
              containerClassName="rdg-glass aspect-[4/5] w-full rounded-[2rem] p-2"
              height={1500}
              src="/assets/redesign/atendimento-hero.jpg"
              width={1200}
            />
            <div>
              <span className="rdg-label mb-4 block text-[var(--rdg-copper)]">
                {content.assessment.eyebrow}
              </span>
              <h2 className="rdg-headline mb-6">{content.assessment.title}</h2>
              <div className="space-y-6">
                {content.assessment.paragraphs.map((paragraph) => (
                  <p
                    className="text-[var(--rdg-on-surface-variant)] text-lg"
                    key={paragraph.slice(0, 24)}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </RevealSection>

        {/* Sessions */}
        <RevealSection className="relative mx-auto w-full max-w-7xl px-6 py-24">
          <div
            aria-hidden
            className="-z-10 -translate-x-1/2 absolute inset-y-0 left-1/2 w-screen bg-[var(--rdg-surface-low)]"
          />
          <div className="mb-12 text-center">
            <span className="rdg-label mb-4 block text-[var(--rdg-copper)]">
              {content.sessions.eyebrow}
            </span>
            <h2 className="rdg-headline">{content.sessions.title}</h2>
          </div>
          <StaggerGrid className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {content.sessions.cards.map((card, index) => {
              const Icon = SESSION_ICONS[index % SESSION_ICONS.length]
              return (
                <TiltCard className="rdg-glass rounded-[2rem] p-8" key={card.title}>
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-[var(--rdg-copper)]/20 bg-[var(--rdg-copper)]/10 text-[var(--rdg-copper)]">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mb-3 font-bold text-lg">{card.title}</h3>
                  <p className="text-[var(--rdg-on-surface-variant)] text-sm">{card.description}</p>
                </TiltCard>
              )
            })}
          </StaggerGrid>
          <ParallaxImage
            alt={content.sessions.imageAlt}
            className="h-full w-full object-cover"
            containerClassName="rdg-glass mb-12 aspect-[21/9] w-full rounded-[2rem] p-2"
            height={686}
            src="/assets/redesign/atendimento-secondary.jpg"
            width={1600}
          />
          <div className="mx-auto max-w-3xl space-y-6">
            {content.sessions.paragraphs.map((paragraph) => (
              <p className="text-[var(--rdg-on-surface-variant)]" key={paragraph.slice(0, 24)}>
                {paragraph}
              </p>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <button className="rdg-btn rdg-btn-primary px-8 py-4" type="button">
              {content.sessions.cta}
            </button>
          </div>
        </RevealSection>

        {/* For whom */}
        <RevealSection className="relative mx-auto w-full max-w-4xl px-6 py-24">
          <div
            aria-hidden
            className="-z-10 -translate-x-1/2 absolute inset-y-0 left-1/2 w-screen bg-[var(--rdg-surface-low)]"
          />
          <h2 className="rdg-headline mb-8 text-center">{content.forWhom.title}</h2>
          <div className="mb-10 space-y-6">
            {content.forWhom.paragraphs.map((paragraph) => (
              <p
                className="text-[var(--rdg-on-surface-variant)] text-lg"
                key={paragraph.slice(0, 24)}
              >
                {paragraph}
              </p>
            ))}
          </div>
          <div className="flex justify-center">
            <button className="rdg-btn rdg-btn-ghost px-8 py-4" type="button">
              {content.forWhom.cta}
            </button>
          </div>
        </RevealSection>

        {/* Benefits */}
        <RevealSection className="mx-auto w-full max-w-4xl px-6 py-24">
          <div className="rdg-glass rounded-[2rem] p-12">
            <h2 className="rdg-headline mb-2 text-center">{content.benefits.title}</h2>
            <p className="mb-8 text-center text-[var(--rdg-on-surface-variant)]">
              {content.benefits.intro}
            </p>
            <CheckList
              className="grid grid-cols-1 gap-4 md:grid-cols-2"
              items={content.benefits.items}
            />
          </div>
        </RevealSection>

        {/* Closing */}
        <RevealSection className="mx-auto w-full max-w-4xl px-6 py-24 text-center">
          <h2 className="rdg-headline mb-6">{content.closing.title}</h2>
          <p className="mx-auto mb-10 max-w-xl text-[var(--rdg-on-surface-variant)]">
            {content.closing.body}
          </p>
          <button className="rdg-btn rdg-btn-primary px-10 py-4" type="button">
            {content.closing.cta}
          </button>
        </RevealSection>
      </main>

      <RedesignFooter content={layout.footer} />
    </div>
  )
}
