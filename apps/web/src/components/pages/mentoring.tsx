'use client'

import { ContactButton } from '@ez/web/components/experience/contact'
import { FinalCta } from '@ez/web/components/experience/final-cta'
import { PageHero } from '@ez/web/components/experience/page-hero'
import { Reveal } from '@ez/web/components/experience/reveal'
import { RingScroller } from '@ez/web/components/experience/ring-scroller'
import { useScene } from '@ez/web/components/experience/scene/store'
import { Prose, Section, SectionHeading } from '@ez/web/components/experience/section'
import { Depth, Tilt } from '@ez/web/components/experience/tilt'
import { mentoring } from '@ez/web/content/mentoring'
import { Check } from 'lucide-react'

export function MentoringPage() {
  useScene({ shape: 'helix', accent: '#a98bff', accentSecondary: '#f2b544', offsetX: 1.9 })
  const { hero, intro, steps, target, results, finalCta } = mentoring

  return (
    <>
      <PageHero eyebrow={hero.eyebrow} lines={[hero.title]} subtitle={hero.subtitle}>
        <ContactButton subject={hero.primaryCta}>{hero.primaryCta}</ContactButton>
        <ContactButton subject={hero.secondaryCta} variant="ghost">
          {hero.secondaryCta}
        </ContactButton>
      </PageHero>

      <Section id="intro">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading eyebrow="A Mentoria" title={intro.title} />
          </div>
          <Reveal delay={0.1}>
            <div className="ez-glass relative rounded-[32px] p-8 sm:p-10">
              <Prose paragraphs={intro.paragraphs} />
            </div>
          </Reveal>
        </div>
      </Section>

      <div className="py-10">
        <RingScroller
          aside={(active) => (
            <div>
              <SectionHeading eyebrow="Métodos" subtitle={steps.subtitle} title={steps.title} />
              {active >= 0 && (
                <div className="mt-10 flex items-end gap-4">
                  <span className="ez-display ez-extrude text-7xl tabular-nums">
                    {String(active + 1).padStart(2, '0')}
                  </span>
                  <span className="pb-2 text-white/40">
                    / {String(steps.items.length).padStart(2, '0')}
                  </span>
                </div>
              )}
              <div className="mt-10">
                <ContactButton subject={steps.cta}>{steps.cta}</ContactButton>
              </div>
            </div>
          )}
          id="methods-step"
          items={steps.items}
          mode="helix"
          renderCard={(item, index) => (
            <div className="relative h-full min-h-[320px] rounded-[28px] p-8">
              <div
                aria-hidden
                className="ez-glass ez-glass-strong ez-border-glow absolute inset-0 rounded-[28px]"
              />
              <div className="relative">
                <span className="ez-chip">Etapa {index + 1}</span>
                <h3 className="ez-display mt-5 text-2xl text-white">{item.title}</h3>
                <p className="mt-4 text-[15px] text-white/65 leading-relaxed">{item.text}</p>
              </div>
            </div>
          )}
        />
      </div>

      <Section id="target-audience">
        <SectionHeading title={target.title} />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {target.paragraphs.map((paragraph, index) => (
            <Reveal delay={(index % 2) * 0.1} key={paragraph.slice(0, 24)}>
              <div className="ez-glass relative h-full rounded-[28px] p-7 sm:p-8">
                <Prose paragraphs={[paragraph]} />
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="results">
        <SectionHeading align="center" subtitle={results.subtitle} title={results.title} />
        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {results.items.map((item, index) => (
            <Reveal delay={(index % 2) * 0.08} key={item}>
              <Tilt
                className="flex h-full items-start gap-4 rounded-3xl p-6"
                surface
                surfaceClassName="rounded-3xl"
              >
                <Depth z={50}>
                  <span className="ez-icon-orb size-10 rounded-full">
                    <Check aria-hidden className="size-4" />
                  </span>
                </Depth>
                <Depth z={25}>
                  <p className="pt-2 text-white/80">{item}</p>
                </Depth>
              </Tilt>
            </Reveal>
          ))}
        </div>
        <div className="mt-14 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {results.stats.map((stat, index) => (
            <Reveal delay={index * 0.08} direction="depth" key={stat.label}>
              <Tilt
                className="rounded-[28px] p-7 text-center"
                max={16}
                surface
                surfaceClassName="rounded-[28px]"
              >
                <Depth z={70}>
                  <p className="ez-display ez-extrude text-[clamp(1.6rem,3vw,2.6rem)]">
                    {stat.value}
                  </p>
                </Depth>
                <Depth className="mt-3" z={30}>
                  <p className="text-sm text-white/55">{stat.label}</p>
                </Depth>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </Section>

      <FinalCta cta={finalCta.cta} text={finalCta.text} title={finalCta.title} />
    </>
  )
}
