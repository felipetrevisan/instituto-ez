import { CheckList } from '@ez/web/components/redesign/check-list'
import { RedesignFooter } from '@ez/web/components/redesign/footer'
import { RedesignNav } from '@ez/web/components/redesign/nav'
import { NeuralBackground } from '@ez/web/components/redesign/neural-background'
import { ParallaxImage } from '@ez/web/components/redesign/parallax-image'
import { RevealSection } from '@ez/web/components/redesign/reveal-section'
import { StaggerGrid } from '@ez/web/components/redesign/stagger-grid'
import { TiltCard } from '@ez/web/components/redesign/tilt-card'
import { redesignLayoutContent } from '@ez/web/content/redesign/layout'
import { redesignMatematizadorContent } from '@ez/web/content/redesign/matematizador'
import { ArrowRight, Building2, LineChart, User, Workflow } from 'lucide-react'
import type { Locale } from 'next-intl'
import type { ComponentType } from 'react'

const TYPE_ICONS: ComponentType<{ className?: string }>[] = [Building2, Workflow, LineChart, User]

export default async function RedesignMatematizadorPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const content = redesignMatematizadorContent[locale]
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
              {content.whatIs.eyebrow}
            </span>
            <h1 className="rdg-display mb-6">
              {content.hero.title} <span className="rdg-copper-text">{content.hero.highlight}</span>
            </h1>
            <p className="mb-8 max-w-lg text-[var(--rdg-on-surface-variant)] text-lg">
              {content.hero.description}
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

        {/* What is */}
        <RevealSection className="relative mx-auto w-full max-w-7xl px-6 py-24">
          <div
            aria-hidden
            className="-z-10 -translate-x-1/2 absolute inset-y-0 left-1/2 w-screen bg-[var(--rdg-surface-low)]"
          />
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <ParallaxImage
              alt={content.whatIs.imageAlt}
              className="h-full w-full object-cover"
              containerClassName="rdg-glass aspect-square w-full rounded-[2rem] p-2"
              height={1000}
              src="/assets/redesign/matematizador-whatis.jpg"
              width={1000}
            />
            <div>
              <h2 className="rdg-headline mb-4">{content.whatIs.title}</h2>
              <p className="mb-6 text-[var(--rdg-copper)] text-lg italic">
                {content.whatIs.subtext}
              </p>
              <div className="space-y-4">
                {content.whatIs.paragraphs.map((paragraph) => (
                  <p className="text-[var(--rdg-on-surface-variant)]" key={paragraph.slice(0, 24)}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </RevealSection>

        {/* 4 types */}
        <RevealSection className="mx-auto w-full max-w-7xl px-6 py-24">
          <h2 className="rdg-headline mb-16 text-center">{content.types.title}</h2>
          <StaggerGrid className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {content.types.items.map((item, index) => {
              const Icon = TYPE_ICONS[index % TYPE_ICONS.length]
              return (
                <TiltCard className="rdg-glass flex flex-col rounded-[2rem] p-8" key={item.title}>
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-[var(--rdg-copper)]/20 bg-[var(--rdg-copper)]/10 text-[var(--rdg-copper)]">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mb-4 font-bold text-lg">{item.title}</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="rdg-label block text-[var(--rdg-on-surface-variant)]/60">
                        Problema
                      </span>
                      <p className="text-[var(--rdg-on-surface-variant)]">{item.problem}</p>
                    </div>
                    <div>
                      <span className="rdg-label block text-[var(--rdg-on-surface-variant)]/60">
                        Ação
                      </span>
                      <p className="text-[var(--rdg-on-surface-variant)]">{item.action}</p>
                    </div>
                    <div>
                      <span className="rdg-label block text-[var(--rdg-copper)]">Resultado</span>
                      <p className="font-medium">{item.result}</p>
                    </div>
                  </div>
                </TiltCard>
              )
            })}
          </StaggerGrid>
        </RevealSection>

        {/* Why need */}
        <RevealSection className="relative mx-auto w-full max-w-7xl px-6 py-24">
          <div
            aria-hidden
            className="-z-10 -translate-x-1/2 absolute inset-y-0 left-1/2 w-screen bg-[var(--rdg-surface-low)]"
          />
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div>
              <h2 className="rdg-headline mb-6">{content.whyNeed.title}</h2>
              <p className="mb-8 text-[var(--rdg-on-surface-variant)] text-lg">
                {content.whyNeed.subheading}
              </p>
              <button className="rdg-btn rdg-btn-ghost px-8 py-4" type="button">
                {content.whyNeed.cta}
              </button>
            </div>
            <ParallaxImage
              alt={content.whyNeed.imageAlt}
              className="h-full w-full object-cover"
              containerClassName="rdg-glass aspect-square w-full rounded-[2rem] p-2"
              height={1000}
              src="/assets/redesign/matematizador-secondary.jpg"
              width={1600}
            />
          </div>
        </RevealSection>

        {/* Benefits */}
        <RevealSection className="mx-auto w-full max-w-4xl px-6 py-24">
          <div className="rdg-glass rounded-[2rem] p-12">
            <h2 className="rdg-headline mb-8 text-center">{content.benefits.title}</h2>
            <CheckList
              className="grid grid-cols-1 gap-4 md:grid-cols-2"
              items={content.benefits.items}
            />
          </div>
        </RevealSection>

        {/* Closing */}
        <RevealSection className="mx-auto w-full max-w-4xl px-6 py-24 text-center">
          <h2 className="rdg-headline mb-6">{content.closing.title}</h2>
          <p className="mx-auto mb-6 max-w-xl text-[var(--rdg-on-surface-variant)]">
            {content.closing.text}
          </p>
          <p className="rdg-copper-text mb-10 font-semibold">{content.closing.footer}</p>
          <button className="rdg-btn rdg-btn-primary px-10 py-4" type="button">
            {content.closing.cta}
          </button>
        </RevealSection>
      </main>

      <RedesignFooter content={layout.footer} />
    </div>
  )
}
