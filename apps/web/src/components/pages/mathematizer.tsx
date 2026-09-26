'use client'

import { ContactButton } from '@ez/web/components/experience/contact'
import { FinalCta } from '@ez/web/components/experience/final-cta'
import { FlipCard } from '@ez/web/components/experience/flip-card'
import { Icon } from '@ez/web/components/experience/icon'
import { PageHero } from '@ez/web/components/experience/page-hero'
import { Reveal } from '@ez/web/components/experience/reveal'
import { Rich } from '@ez/web/components/experience/rich'
import { useScene } from '@ez/web/components/experience/scene/store'
import { Prose, Section, SectionHeading } from '@ez/web/components/experience/section'
import { Depth, Tilt } from '@ez/web/components/experience/tilt'
import { mathematizer } from '@ez/web/content/mathematizer'

export function MathematizerPage() {
  useScene({ shape: 'lattice', accent: '#35e0c2', accentSecondary: '#5b8cff', offsetX: 1.7 })
  const { hero, whatIs, items, whyNeed, benefits, finalCta } = mathematizer

  return (
    <>
      <PageHero
        eyebrow="Sistema Neuroanalítico"
        lines={[hero.title]}
        subtitle={
          <>
            {hero.subtitle}
            <span className="mt-4 block text-base text-white/55">
              <Rich text={hero.text} />
            </span>
          </>
        }
      >
        <ContactButton subject={hero.cta}>{hero.cta}</ContactButton>
      </PageHero>

      <Section id="what-is">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeading eyebrow="Matematizadores" title={whatIs.title} />
            <Reveal delay={0.1}>
              <Prose className="mt-8" paragraphs={whatIs.paragraphs} />
            </Reveal>
          </div>
          <Reveal direction="right">
            <Tilt
              className="overflow-hidden rounded-[36px] p-10 sm:p-12"
              max={14}
              surface
              surfaceClassName="rounded-[36px]"
            >
              <Depth z={40}>
                <svg aria-hidden className="h-40 w-full" viewBox="0 0 320 160">
                  {[18, 46, 30, 72, 58, 96, 84, 128, 110, 142].map((h, i) => (
                    <rect
                      fill="var(--accent)"
                      height={h}
                      key={h}
                      opacity={0.25 + i * 0.07}
                      rx="4"
                      width="20"
                      x={i * 32 + 6}
                      y={160 - h}
                    />
                  ))}
                </svg>
              </Depth>
              <Depth className="mt-8" z={80}>
                <p className="ez-serif text-2xl text-white leading-snug">“{whatIs.quote}”</p>
              </Depth>
            </Tilt>
          </Reveal>
        </div>
      </Section>

      <Section id="mathematizers">
        <SectionHeading align="center" eyebrow="Sistema Neuroanalítico" title={items.title} />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {items.list.map((item, index) => (
            <Reveal delay={index * 0.08} direction="depth" key={item.title}>
              <FlipCard
                back={
                  <div className="flex h-full flex-col gap-5">
                    <div>
                      <p className="ez-eyebrow">{items.labels.how}</p>
                      <p className="mt-3 text-[15px] text-white/85 leading-relaxed">{item.how}</p>
                    </div>
                    <div className="mt-auto rounded-2xl border border-white/10 bg-black/20 p-5">
                      <p className="ez-eyebrow">{items.labels.result}</p>
                      <p className="ez-display mt-3 text-white text-xl">{item.result}</p>
                    </div>
                  </div>
                }
                front={
                  <>
                    <span className="ez-icon-orb size-14">
                      <Icon className="size-6" name={item.icon} />
                    </span>
                    <span className="ez-display mt-6 text-5xl text-white/10">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="ez-display mt-2 text-2xl text-white">{item.title}</h3>
                    <p className="mt-5 text-white/45 text-xs uppercase tracking-[0.18em]">
                      {items.labels.problem}
                    </p>
                    <p className="mt-2 text-[15px] text-white/70 leading-relaxed">{item.problem}</p>
                  </>
                }
                label={item.title}
              />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12 flex justify-center">
          <ContactButton subject={items.cta}>{items.cta}</ContactButton>
        </Reveal>
      </Section>

      <Section id="why-i-need">
        <Reveal direction="depth">
          <div className="relative overflow-hidden rounded-[36px] border border-white/10 px-7 py-20 text-center sm:px-16">
            <div aria-hidden className="absolute inset-0" style={{ perspective: 600 }}>
              <div className="ez-grid-floor" style={{ bottom: '-10%', height: '120%' }} />
            </div>
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-b from-[#03050d] via-[#03050d]/70 to-transparent"
            />
            <h2 className="ez-display relative mx-auto max-w-4xl text-balance text-[clamp(2rem,4.8vw,4rem)] text-white">
              <Rich markClassName="ez-serif ez-text-gradient font-normal" text={whyNeed.title} />
            </h2>
            <p className="ez-prose relative mx-auto mt-6 max-w-3xl text-lg">
              <Rich text={whyNeed.text} />
            </p>
            <div className="relative mt-10">
              <ContactButton subject={whyNeed.cta}>{whyNeed.cta}</ContactButton>
            </div>
          </div>
        </Reveal>
      </Section>

      <Section id="benefits">
        <SectionHeading align="center" title={benefits.title} />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.items.map((item, index) => (
            <Reveal delay={(index % 3) * 0.08} key={item.text}>
              <Tilt
                className="flex h-full items-center gap-5 rounded-3xl p-6"
                surface
                surfaceClassName="rounded-3xl"
              >
                <Depth z={60}>
                  <span className="ez-icon-orb size-12">
                    <Icon className="size-5" name={item.icon} />
                  </span>
                </Depth>
                <Depth z={25}>
                  <h3 className="font-medium text-white">{item.text}</h3>
                </Depth>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </Section>

      <FinalCta
        cta={finalCta.cta}
        tagline={finalCta.tagline}
        text={finalCta.text}
        title={finalCta.title}
      />
    </>
  )
}
