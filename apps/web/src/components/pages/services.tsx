'use client'

import { ContactButton } from '@ez/web/components/experience/contact'
import { FinalCta } from '@ez/web/components/experience/final-cta'
import { Icon } from '@ez/web/components/experience/icon'
import { PageHero } from '@ez/web/components/experience/page-hero'
import { Reveal } from '@ez/web/components/experience/reveal'
import { Rich } from '@ez/web/components/experience/rich'
import { useScene } from '@ez/web/components/experience/scene/store'
import { Prose, Section, SectionHeading } from '@ez/web/components/experience/section'
import { Depth, Tilt } from '@ez/web/components/experience/tilt'
import { services } from '@ez/web/content/services'
import { Check, Clock, MapPin } from 'lucide-react'

export function ServicesPage() {
  useScene({ shape: 'brain', accent: '#3fd9b8', accentSecondary: '#7c9cff', offsetX: 1.75 })
  const { hero, assessment, method, whoIsItFor, benefits, finalCta } = services

  return (
    <>
      <PageHero eyebrow="Atendimentos Individuais" lines={[hero.title]} subtitle={hero.subtitle}>
        <ContactButton subject={hero.cta}>{hero.cta}</ContactButton>
      </PageHero>

      <Section id="assessment">
        <div className="grid items-start gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeading eyebrow="Passo 01" title={assessment.title} />
            <Reveal delay={0.1}>
              <Prose className="mt-8" paragraphs={assessment.paragraphs} />
            </Reveal>
          </div>
          <Reveal className="lg:sticky lg:top-28" direction="right">
            <Tilt className="rounded-[32px] p-8 sm:p-10" surface surfaceClassName="rounded-[32px]">
              <Depth z={60}>
                <p className="ez-eyebrow">Avaliação Inicial</p>
              </Depth>
              <Depth className="mt-8 grid gap-5" z={40}>
                <div className="flex items-center gap-4">
                  <span className="ez-icon-orb size-12">
                    <Clock aria-hidden className="size-5" />
                  </span>
                  <p className="text-white">Até duas horas de avaliação estruturada</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="ez-icon-orb size-12">
                    <MapPin aria-hidden className="size-5" />
                  </span>
                  <p className="text-white">Presencialmente ou online</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="ez-icon-orb size-12">
                    <Icon className="size-5" name="brain" />
                  </span>
                  <p className="text-white">Mapeamento neurocomportamental</p>
                </div>
              </Depth>
              <Depth className="mt-10" z={70}>
                <ContactButton subject={hero.cta}>{hero.cta}</ContactButton>
              </Depth>
            </Tilt>
          </Reveal>
        </div>
      </Section>

      <Section id="method-sessions">
        <SectionHeading
          align="center"
          eyebrow="Método Instituto EZ"
          subtitle={method.subtitle}
          title={method.title}
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {method.items.map((item, index) => (
            <Reveal delay={index * 0.08} direction="depth" key={item.title}>
              <Tilt
                className="h-full rounded-[28px] p-7"
                max={14}
                surface
                surfaceClassName="rounded-[28px]"
              >
                <Depth z={80}>
                  <span className="ez-icon-orb size-14">
                    <Icon className="size-6" name={item.icon} />
                  </span>
                </Depth>
                <Depth className="mt-6" z={40}>
                  <h3 className="ez-display text-lg text-white">{item.title}</h3>
                </Depth>
                <Depth className="mt-3" z={15}>
                  <p className="text-sm text-white/60 leading-relaxed">{item.text}</p>
                </Depth>
              </Tilt>
            </Reveal>
          ))}
        </div>
        <Reveal className="mx-auto mt-12 max-w-4xl text-center">
          <p className="ez-prose text-lg">
            <Rich text={method.text} />
          </p>
          <div className="mt-8">
            <ContactButton subject={method.cta}>{method.cta}</ContactButton>
          </div>
        </Reveal>
      </Section>

      <Section id="who-is-it-for">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading title={whoIsItFor.title} />
            <Reveal delay={0.1}>
              <Prose className="mt-8" paragraphs={whoIsItFor.paragraphs} />
            </Reveal>
          </div>
          <Reveal direction="right">
            <Tilt
              className="rounded-[36px] p-10 sm:p-14"
              max={12}
              surface
              surfaceClassName="rounded-[36px]"
            >
              <Depth z={90}>
                <span aria-hidden className="ez-serif ez-text-gradient block text-8xl leading-none">
                  “
                </span>
              </Depth>
              <Depth z={50}>
                <p className="ez-display text-3xl text-white leading-tight">{whoIsItFor.quote}</p>
              </Depth>
              <Depth className="mt-10" z={70}>
                <ContactButton subject={whoIsItFor.cta}>{whoIsItFor.cta}</ContactButton>
              </Depth>
            </Tilt>
          </Reveal>
        </div>
      </Section>

      <Section id="benefits">
        <SectionHeading align="center" subtitle={benefits.subtitle} title={benefits.title} />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.items.map((item, index) => (
            <Reveal delay={(index % 3) * 0.08} key={item}>
              <Tilt
                className="flex h-full items-center gap-4 rounded-3xl p-6"
                surface
                surfaceClassName="rounded-3xl"
              >
                <Depth z={50}>
                  <span className="ez-icon-orb size-11 rounded-full">
                    <Check aria-hidden className="size-5" />
                  </span>
                </Depth>
                <Depth z={25}>
                  <h3 className="font-medium text-white">{item}</h3>
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
