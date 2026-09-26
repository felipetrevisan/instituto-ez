'use client'

import { Accordion3D } from '@ez/web/components/experience/accordion-3d'
import { ContactButton } from '@ez/web/components/experience/contact'
import { Coverflow } from '@ez/web/components/experience/coverflow'
import { Icon } from '@ez/web/components/experience/icon'
import { OrbitCarousel } from '@ez/web/components/experience/orbit-carousel'
import { PageHero } from '@ez/web/components/experience/page-hero'
import { Reveal } from '@ez/web/components/experience/reveal'
import { Rich } from '@ez/web/components/experience/rich'
import { RingScroller } from '@ez/web/components/experience/ring-scroller'
import { useScene } from '@ez/web/components/experience/scene/store'
import { Prose, Section, SectionHeading } from '@ez/web/components/experience/section'
import { Depth, Tilt } from '@ez/web/components/experience/tilt'
import { immersion } from '@ez/web/content/immersion'
import type { Testimonial } from '@ez/web/types/catalog'
import { Check } from 'lucide-react'
import Image from 'next/image'

export function ImmersionPage({ testimonials }: { testimonials: Testimonial[] }) {
  useScene({ shape: 'orb', accent: '#ff7a59', accentSecondary: '#ffd27a', offsetX: 0 })
  const { hero, intro, instructors, experience, target, gallery, faq, nextClass } = immersion

  return (
    <>
      <PageHero
        accent={hero.titleAccent}
        align="center"
        eyebrow="Imersão Presencial"
        lines={[hero.title]}
        subtitle={
          <span className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-white/80">
            {hero.pillars.map((pillar, index) => (
              <span className="inline-flex items-center gap-3" key={pillar}>
                {index > 0 && (
                  <span aria-hidden className="size-1.5 rounded-full bg-[color:var(--accent)]" />
                )}
                {pillar}
              </span>
            ))}
          </span>
        }
      >
        <ContactButton subject={hero.cta}>{hero.cta}</ContactButton>
      </PageHero>

      <Section id="intro">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeading title={intro.title} />
            <Reveal delay={0.1}>
              <Prose className="mt-8" paragraphs={intro.paragraphs} />
            </Reveal>
          </div>
          <Reveal direction="right">
            <Tilt
              className="rounded-[36px] p-9 sm:p-12"
              max={10}
              surface
              surfaceClassName="rounded-[36px]"
            >
              <Depth z={80}>
                <span className="ez-icon-orb size-16 rounded-full">
                  <Icon className="size-7" name="sun" />
                </span>
              </Depth>
              <Depth className="mt-8" z={50}>
                <p className="ez-serif text-2xl text-white leading-snug">
                  <Rich markClassName="ez-text-gradient" text={intro.highlight} />
                </p>
              </Depth>
              <Depth className="mt-6" z={20}>
                <p className="text-[15px] text-white/60 leading-relaxed">
                  <Rich text={intro.closing} />
                </p>
              </Depth>
            </Tilt>
          </Reveal>
        </div>
      </Section>

      <Section id="instructors">
        <SectionHeading
          align="center"
          eyebrow={instructors.eyebrow}
          subtitle={instructors.text}
          title={instructors.title}
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {instructors.items.map((item, index) => (
            <Reveal delay={index * 0.12} direction={index ? 'right' : 'left'} key={item.name}>
              <Tilt
                className="h-full rounded-[32px] p-6 sm:p-8"
                max={8}
                surface
                surfaceClassName="rounded-[32px]"
              >
                <Depth z={60}>
                  <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-white/10">
                    <Image
                      alt=""
                      className="object-cover"
                      fill
                      sizes="(min-width: 768px) 40vw, 90vw"
                      src={item.image}
                      unoptimized
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-[#03050d] via-transparent"
                    />
                  </div>
                </Depth>
                <Depth className="mt-6" z={40}>
                  <h3 className="ez-display text-2xl text-white">{item.name}</h3>
                  <p className="mt-1 font-medium text-[color:var(--accent)] text-sm">{item.role}</p>
                </Depth>
                <Depth className="mt-4" z={15}>
                  <p className="text-[15px] text-white/60 leading-relaxed">{item.text}</p>
                </Depth>
              </Tilt>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 text-center">
          <p className="ez-serif text-2xl text-white/80">
            <Rich markClassName="ez-text-gradient" text={instructors.footer} />
          </p>
        </Reveal>
      </Section>

      <div className="py-10">
        <RingScroller
          aside={(active) => (
            <div>
              <SectionHeading eyebrow={experience.eyebrow} title={experience.title} />
              <Reveal delay={0.1}>
                <p className="ez-prose mt-6">
                  <Rich text={experience.text} />
                </p>
              </Reveal>
              {active >= 0 && (
                <p className="mt-8 flex items-end gap-3">
                  <span className="ez-display ez-extrude text-6xl tabular-nums">{active + 1}</span>
                  <span className="pb-1 text-white/40">de {experience.items.length} elementos</span>
                </p>
              )}
            </div>
          )}
          id="experience"
          items={experience.items}
          mode="prism"
          renderCard={(item, index) => (
            <div className="relative min-h-[320px] rounded-[28px] p-8">
              <div
                aria-hidden
                className="ez-glass ez-glass-strong ez-border-glow absolute inset-0 rounded-[28px]"
                style={
                  index === experience.items.length - 1
                    ? {
                        background:
                          'linear-gradient(160deg, color-mix(in oklab, var(--accent) 35%, rgba(12,16,34,.9)), rgba(8,11,26,.92))',
                      }
                    : undefined
                }
              />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="ez-icon-orb size-14">
                    <Icon className="size-6" name={item.icon} />
                  </span>
                  <span className="ez-display text-5xl text-white/10">{index + 1}</span>
                </div>
                <h3 className="ez-display mt-6 text-2xl text-white">{item.title}</h3>
                <p className="mt-4 text-[15px] text-white/65 leading-relaxed">{item.text}</p>
              </div>
            </div>
          )}
        />
        <Section className="!py-10" stage={false}>
          <Reveal className="text-center">
            {experience.footer.map((line) => (
              <p className="mt-2 text-lg text-white/70" key={line.slice(0, 20)}>
                <Rich text={line} />
              </p>
            ))}
            <div className="mt-8">
              <ContactButton subject={experience.cta}>{experience.cta}</ContactButton>
            </div>
          </Reveal>
        </Section>
      </div>

      <Section id="main-target">
        <SectionHeading align="center" eyebrow={target.eyebrow} title={target.title} />
        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {target.items.map((item, index) => (
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
        <Reveal className="mx-auto mt-12 max-w-3xl text-center">
          {target.footer.map((line) => (
            <p className="mt-3 text-lg text-white/70" key={line.slice(0, 20)}>
              <Rich text={line} />
            </p>
          ))}
        </Reveal>
      </Section>

      <Section className="overflow-hidden" id="final-cta">
        <SectionHeading align="center" subtitle={gallery.subtitle} title={gallery.title} />
        <Reveal className="mt-12" direction="depth">
          <Coverflow alt={gallery.title} images={gallery.images} />
        </Reveal>
        <Reveal className="mt-20" direction="depth">
          <OrbitCarousel items={testimonials} />
        </Reveal>
        <Reveal className="mt-12 flex justify-center">
          <ContactButton subject={gallery.cta}>{gallery.cta}</ContactButton>
        </Reveal>
      </Section>

      <Section id="faq">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading eyebrow={faq.eyebrow} title={faq.title} />
          </div>
          <Accordion3D items={faq.items} />
        </div>
      </Section>

      <Section id="next-class">
        <Reveal direction="depth">
          <Tilt
            className="rounded-[36px] p-8 sm:p-14"
            max={6}
            surface
            surfaceClassName="rounded-[36px]"
          >
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
              <Depth z={40}>
                <p className="ez-eyebrow">{nextClass.eyebrow}</p>
                <h2 className="ez-display mt-5 text-[clamp(2rem,4vw,3.4rem)] text-white">
                  <Rich
                    markClassName="ez-serif ez-text-gradient font-normal"
                    text={nextClass.title}
                  />
                </h2>
                <p className="ez-prose mt-5 text-lg">
                  <Rich text={nextClass.text} />
                </p>
                <div className="mt-8">
                  <ContactButton subject={nextClass.cta}>{nextClass.cta}</ContactButton>
                  <p className="mt-4 text-sm text-white/50">{nextClass.note}</p>
                </div>
              </Depth>
              <Depth className="grid gap-3 sm:grid-cols-2" z={70}>
                {nextClass.details.map((detail) => (
                  <div
                    className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5"
                    key={detail.text}
                  >
                    <span className="ez-icon-orb size-11 shrink-0">
                      <Icon className="size-5" name={detail.icon} />
                    </span>
                    <p className="pt-2 text-sm text-white/85">{detail.text}</p>
                  </div>
                ))}
              </Depth>
            </div>
          </Tilt>
        </Reveal>
      </Section>
    </>
  )
}
