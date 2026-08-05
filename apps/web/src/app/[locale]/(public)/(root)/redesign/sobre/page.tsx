import { RedesignFooter } from '@ez/web/components/redesign/footer'
import { RedesignNav } from '@ez/web/components/redesign/nav'
import { NeuralBackground } from '@ez/web/components/redesign/neural-background'
import { ParallaxImage } from '@ez/web/components/redesign/parallax-image'
import { RevealSection } from '@ez/web/components/redesign/reveal-section'
import { StaggerGrid } from '@ez/web/components/redesign/stagger-grid'
import { TiltCard } from '@ez/web/components/redesign/tilt-card'
import { redesignLayoutContent } from '@ez/web/content/redesign/layout'
import { redesignAboutContent } from '@ez/web/content/redesign/sobre'
import { BookOpen, Brain, Mic, Network, Sunrise, Users } from 'lucide-react'
import type { Locale } from 'next-intl'

const OFFERING_ICONS = [Brain, Users, Network, Mic, Sunrise, BookOpen]

export default async function RedesignSobrePage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const content = redesignAboutContent[locale]
  const layout = redesignLayoutContent[locale]

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      <NeuralBackground hero />
      <RedesignNav content={layout.nav} />

      <main className="flex-1 pt-20">
        {/* Hero */}
        <section className="relative flex min-h-[70vh] items-center overflow-hidden px-6 text-center">
          <div className="relative mx-auto max-w-4xl">
            <span className="rdg-label mb-4 block text-[var(--rdg-copper)]">
              Behavioral Architecture
            </span>
            <h1 className="rdg-display mb-6">{content.hero.title}</h1>
            <p className="mx-auto mb-8 max-w-2xl text-[var(--rdg-on-surface-variant)] text-lg">
              {content.hero.subtitle}
            </p>
            <button className="rdg-btn rdg-btn-primary mx-auto px-8 py-4" type="button">
              {content.hero.cta}
            </button>
          </div>
        </section>

        {/* History / Purpose */}
        <RevealSection className="mx-auto w-full max-w-7xl px-6 py-24">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
            <ParallaxImage
              alt={content.history.imageAlt}
              className="h-full w-full object-cover"
              containerClassName="rdg-glass aspect-[4/5] rounded-[2rem] p-2 md:col-span-4"
              height={1000}
              src="/assets/redesign/sobre-enzo.jpg"
              width={800}
            />
            <div className="rdg-glass flex flex-col justify-center rounded-[2rem] p-10 md:col-span-8">
              <span className="rdg-label mb-2 block text-[var(--rdg-copper)]">
                {content.history.eyebrow}
              </span>
              <h3 className="mb-4 font-bold text-2xl">{content.history.title}</h3>
              <p className="text-[var(--rdg-on-surface-variant)]">{content.history.body}</p>
            </div>
            <div className="flex flex-col justify-center rounded-[2rem] border border-[var(--rdg-copper)]/20 bg-[var(--rdg-copper)]/10 p-10 text-center md:col-span-4">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--rdg-copper)]/10">
                <Network className="h-8 w-8 text-[var(--rdg-copper)]" />
              </div>
              <h3 className="mb-2 font-bold text-xl">{content.purpose.title}</h3>
              <p className="text-[var(--rdg-on-surface-variant)] text-sm">{content.purpose.body}</p>
            </div>
            <div className="rdg-glass rounded-[2rem] p-10 md:col-span-8">
              <h3 className="mb-4 font-bold text-2xl">
                <span className="rdg-copper-text">{content.methodology.title}</span>
              </h3>
              <p className="max-w-3xl text-[var(--rdg-on-surface-variant)]">
                {content.methodology.body}
              </p>
            </div>
          </div>
        </RevealSection>

        {/* Methodology visual */}
        <RevealSection className="mx-auto w-full max-w-7xl px-6 pb-24">
          <ParallaxImage
            alt={content.methodology.imageAlt}
            className="h-full w-full object-cover"
            containerClassName="rdg-glass aspect-[21/9] w-full rounded-[2rem] p-2"
            height={686}
            src="/assets/redesign/sobre-secondary.jpg"
            width={1600}
          />
        </RevealSection>

        {/* Offerings */}
        <RevealSection className="relative mx-auto w-full max-w-7xl px-6 py-24">
          <div
            aria-hidden
            className="-z-10 -translate-x-1/2 absolute inset-y-0 left-1/2 w-screen bg-[var(--rdg-surface-low)]"
          />
          <div className="mb-16 text-center">
            <span className="rdg-label mb-4 block text-[var(--rdg-copper)]">
              {content.offerings.eyebrow}
            </span>
            <h2 className="rdg-headline mb-4">{content.offerings.title}</h2>
            <p className="mx-auto max-w-2xl text-[var(--rdg-on-surface-variant)]">
              {content.offerings.subtitle}
            </p>
          </div>
          <StaggerGrid className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {content.offerings.items.map((item, index) => {
              const Icon = OFFERING_ICONS[index % OFFERING_ICONS.length]
              return (
                <TiltCard className="rdg-glass rounded-[2rem] p-8" key={item.title}>
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-[var(--rdg-copper)]/20 bg-[var(--rdg-copper)]/10 text-[var(--rdg-copper)]">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mb-3 font-bold text-xl">{item.title}</h3>
                  <p className="text-[var(--rdg-on-surface-variant)] text-sm">{item.description}</p>
                </TiltCard>
              )
            })}
          </StaggerGrid>
        </RevealSection>

        {/* Closing */}
        <RevealSection className="mx-auto w-full max-w-4xl px-6 py-24 text-center">
          <div className="rdg-glass rounded-[2rem] p-16">
            <h2 className="rdg-headline mb-6">{content.closing.title}</h2>
            <p className="mx-auto mb-10 max-w-xl text-[var(--rdg-on-surface-variant)]">
              {content.closing.body}
            </p>
            <button className="rdg-btn rdg-btn-primary px-10 py-4" type="button">
              {content.closing.cta}
            </button>
          </div>
        </RevealSection>
      </main>

      <RedesignFooter content={layout.footer} />
    </div>
  )
}
