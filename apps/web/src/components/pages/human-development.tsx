'use client'

import { ContactButton } from '@ez/web/components/experience/contact'
import { FinalCta } from '@ez/web/components/experience/final-cta'
import { Icon } from '@ez/web/components/experience/icon'
import { LinkButton } from '@ez/web/components/experience/local-link'
import { PageHero } from '@ez/web/components/experience/page-hero'
import { Reveal } from '@ez/web/components/experience/reveal'
import { Rich } from '@ez/web/components/experience/rich'
import { useScene } from '@ez/web/components/experience/scene/store'
import { Section, SectionHeading } from '@ez/web/components/experience/section'
import { Depth, Tilt } from '@ez/web/components/experience/tilt'
import { humanDevelopment } from '@ez/web/content/human-development'
import { Check, Clock } from 'lucide-react'

export function HumanDevelopmentPage() {
  useScene({ shape: 'network', accent: '#ffb35c', accentSecondary: '#ff6f91', offsetX: 1.7 })
  const { hero, diagnosis, workshops, lectures, consulting, impact, finalCta } = humanDevelopment

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        lines={[hero.title]}
        subtitle={hero.subtitle}
        titleClassName="text-[clamp(2.3rem,5.6vw,4.8rem)]"
      >
        <ContactButton subject={hero.primaryCta}>{hero.primaryCta}</ContactButton>
        <ContactButton subject={hero.secondaryCta} variant="ghost">
          {hero.secondaryCta}
        </ContactButton>
      </PageHero>

      <Section id="diagnosis">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading title={diagnosis.title} />
            <Reveal delay={0.1}>
              <p className="ez-prose mt-8 text-[1.05rem]">{diagnosis.text}</p>
            </Reveal>
          </div>
          <div className="grid grid-cols-3 items-end gap-4" style={{ perspective: 1200 }}>
            {diagnosis.pillars.map((pillar, index) => (
              <Reveal delay={index * 0.12} direction="up" key={pillar.title}>
                <Tilt
                  className="flex flex-col items-center justify-end rounded-[28px] p-5 text-center"
                  max={16}
                  style={{ height: 220 + index * 70 }}
                  surface
                  surfaceClassName="rounded-[28px]"
                >
                  <Depth z={80}>
                    <span className="ez-icon-orb size-14">
                      <Icon className="size-6" name={pillar.icon} />
                    </span>
                  </Depth>
                  <Depth className="mt-5" z={40}>
                    <h3 className="ez-display text-sm text-white sm:text-lg">{pillar.title}</h3>
                  </Depth>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section id="courses">
        <SectionHeading eyebrow="Workshops" subtitle={workshops.text} title={workshops.title} />
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {workshops.items.map((item, index) => (
            <Reveal delay={index * 0.1} direction={index ? 'right' : 'left'} key={item.title}>
              <Tilt
                className="flex h-full flex-col rounded-[32px] p-8 sm:p-10"
                max={8}
                surface
                surfaceClassName="rounded-[32px]"
              >
                <Depth z={40}>
                  <h3 className="ez-display text-3xl text-white">{item.title}</h3>
                  <p className="ez-serif mt-3 text-white/80 text-xl">{item.lead}</p>
                </Depth>
                <Depth className="mt-5" z={15}>
                  <p className="text-[15px] text-white/60 leading-relaxed">{item.text}</p>
                </Depth>
                <Depth
                  className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-8"
                  z={60}
                >
                  <span className="inline-flex items-center gap-2 text-sm text-white/70">
                    <Clock aria-hidden className="size-4 text-[color:var(--accent)]" />
                    <strong className="font-semibold text-white">Formato:</strong> {item.format}
                  </span>
                  <ContactButton subject={`${item.cta} — ${item.title}`}>{item.cta}</ContactButton>
                </Depth>
              </Tilt>
            </Reveal>
          ))}
        </div>

        <div className="mt-24">
          <SectionHeading eyebrow="Palestras" subtitle={lectures.text} title={lectures.title} />
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {lectures.items.map((item, index) => (
              <Reveal delay={index * 0.1} direction="depth" key={item.title}>
                <Tilt
                  className="flex h-full flex-col rounded-[32px] p-8 sm:p-10"
                  max={8}
                  surface
                  surfaceClassName="rounded-[32px]"
                >
                  <Depth className="flex flex-wrap items-center gap-3" z={50}>
                    <span className="ez-chip">{item.category}</span>
                    {item.badge && (
                      <span className="rounded-full bg-white/10 px-3 py-1 text-white/80 text-xs">
                        {item.badge}
                      </span>
                    )}
                  </Depth>
                  <Depth className="mt-6" z={35}>
                    <h3 className="ez-display text-2xl text-white">{item.title}</h3>
                  </Depth>
                  <Depth className="mt-4" z={15}>
                    <p className="text-[15px] text-white/60 leading-relaxed">{item.text}</p>
                  </Depth>
                  <Depth className="mt-auto pt-8" z={60}>
                    <ContactButton subject={item.cta}>{item.cta}</ContactButton>
                  </Depth>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section id="consulting">
        <Reveal direction="depth">
          <Tilt
            className="rounded-[36px] p-8 sm:p-14"
            max={6}
            surface
            surfaceClassName="rounded-[36px]"
          >
            <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <Depth z={40}>
                <h2 className="ez-display text-[clamp(2rem,4vw,3.2rem)] text-white">
                  {consulting.title}
                </h2>
                <p className="ez-prose mt-5 text-lg">{consulting.text}</p>
                <p className="mt-6 text-lg text-white/80">
                  <Rich text={consulting.result} />
                </p>
                <div className="mt-8">
                  <LinkButton href={consulting.href} variant="primary">
                    {consulting.cta}
                  </LinkButton>
                </div>
              </Depth>
              <Depth className="grid gap-3" z={70}>
                {consulting.items.map((item) => (
                  <div
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4"
                    key={item}
                  >
                    <Check aria-hidden className="size-5 text-[color:var(--accent)]" />
                    <h4 className="text-white">{item}</h4>
                  </div>
                ))}
              </Depth>
            </div>
          </Tilt>
        </Reveal>
      </Section>

      <Section id="testimonials">
        <SectionHeading align="center" title={impact.title} />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {impact.items.map((item, index) => (
            <Reveal delay={index * 0.1} direction="depth" key={item.title}>
              <Tilt
                className="h-full rounded-[32px] p-8 text-center"
                max={14}
                surface
                surfaceClassName="rounded-[32px]"
              >
                <Depth z={90}>
                  <p className="ez-display ez-extrude text-7xl">{item.value}</p>
                </Depth>
                <Depth className="mt-6" z={40}>
                  <p className="ez-display text-white text-xl">{item.title}</p>
                </Depth>
                <Depth className="mt-2" z={20}>
                  <p className="text-sm text-white/55">{item.text}</p>
                </Depth>
              </Tilt>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12 flex justify-center">
          <ContactButton subject={impact.cta}>{impact.cta}</ContactButton>
        </Reveal>
      </Section>

      <FinalCta
        cta={finalCta.primaryCta}
        secondary={finalCta.secondaryCta}
        text={finalCta.text}
        title={finalCta.title}
      />
    </>
  )
}
