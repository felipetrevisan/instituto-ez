'use client'

import { ContactButton } from '@ez/web/components/experience/contact'
import { Icon } from '@ez/web/components/experience/icon'
import { PageHero } from '@ez/web/components/experience/page-hero'
import { Reveal } from '@ez/web/components/experience/reveal'
import { useScene } from '@ez/web/components/experience/scene/store'
import { Section, SectionHeading } from '@ez/web/components/experience/section'
import { Depth, Tilt } from '@ez/web/components/experience/tilt'
import { masterclass } from '@ez/web/content/masterclass'
import { cn } from '@ez/web/lib/utils'
import { Check, GraduationCap, Target } from 'lucide-react'
import Image from 'next/image'

function Options() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {masterclass.catalog.options.map((option, index) => (
        <Reveal delay={index * 0.1} direction="depth" key={option.title}>
          <Tilt
            className="flex h-full flex-col rounded-[32px] p-8"
            max={10}
            surface
            surfaceClassName={cn('rounded-[32px]', option.featured && 'ez-glass-strong')}
          >
            <Depth className="flex items-center justify-between" z={50}>
              <span className="ez-icon-orb size-12">
                <Icon className="size-5" name={option.featured ? 'gift' : 'layers'} />
              </span>
              {option.featured && <span className="ez-chip">Recomendado</span>}
            </Depth>
            <Depth className="mt-6" z={35}>
              <h3 className="ez-display text-3xl text-white">{option.title}</h3>
              <p className="mt-2 text-white/60">{option.description}</p>
            </Depth>
            <Depth className="mt-auto pt-8" z={60}>
              <ContactButton subject={option.cta} variant={option.featured ? 'primary' : 'ghost'}>
                {option.cta}
              </ContactButton>
            </Depth>
          </Tilt>
        </Reveal>
      ))}
    </div>
  )
}

export function MasterclassPage() {
  useScene({ shape: 'galaxy', accent: '#f5c451', accentSecondary: '#9b7bff', offsetX: 1.6 })
  const { hero, catalog, forWho, problem, expert, finalCta } = masterclass
  const photo = '/assets/images/enzo-pasqualetti.webp'

  return (
    <>
      <PageHero
        eyebrow={
          <>
            Produtos Digitais <span className="ez-chip ml-2">{hero.badge}</span>
          </>
        }
        lines={[hero.title]}
        subtitle={
          <>
            <span className="ez-serif ez-text-gradient mb-4 block text-[clamp(1.8rem,4vw,3rem)] leading-tight">
              {hero.titleAccent}
            </span>
            {hero.subtitle}
          </>
        }
      >
        <a className="ez-btn" href="#masterclasses">
          {hero.cta} ↓
        </a>
      </PageHero>

      <Section id="problem">
        <SectionHeading title={problem.title} />
        <div className="mt-14 grid gap-4 md:grid-cols-5" style={{ perspective: 1400 }}>
          {problem.cards.map((card, index) => (
            <Reveal delay={index * 0.08} key={card.title}>
              <Tilt
                className="h-full rounded-[28px] p-6"
                max={14}
                style={{ marginTop: index * 18 }}
                surface
                surfaceClassName={cn(
                  'rounded-[28px]',
                  index === problem.cards.length - 1 && 'ez-glass-strong',
                )}
              >
                <Depth z={60}>
                  <span className="ez-display ez-extrude text-4xl">{index + 1}</span>
                </Depth>
                <Depth className="mt-5" z={35}>
                  <h3 className="ez-display text-lg text-white">{card.title}</h3>
                </Depth>
                <Depth className="mt-3" z={15}>
                  <p className="text-sm text-white/60 leading-relaxed">{card.text}</p>
                </Depth>
              </Tilt>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12 flex justify-center">
          <a className="ez-btn" href="#masterclasses">
            {problem.cta}
          </a>
        </Reveal>
      </Section>

      <Section id="masterclasses">
        <SectionHeading align="center" subtitle={catalog.intro} title={catalog.title} />

        <Reveal className="mt-14" direction="depth">
          <Tilt
            className="rounded-[36px] p-8 sm:p-12"
            max={6}
            surface
            surfaceClassName="rounded-[36px] ez-glass-strong"
          >
            <div className="grid items-center gap-8 lg:grid-cols-[auto_1fr]">
              <Depth z={90}>
                <span className="ez-display ez-extrude text-[7rem] leading-none">
                  {catalog.featured.number}
                </span>
              </Depth>
              <Depth z={40}>
                <span className="ez-chip">Destaque</span>
                <h3 className="ez-display mt-4 text-[clamp(1.6rem,3vw,2.6rem)] text-white">
                  {catalog.featured.title}
                </h3>
                <p className="mt-3 text-lg text-white/65">{catalog.featured.description}</p>
                <p className="mt-5 inline-flex items-center gap-2 text-sm text-white/80">
                  <Target aria-hidden className="size-4 text-[color:var(--accent)]" />
                  <strong className="text-white">{catalog.painLabel}:</strong>{' '}
                  {catalog.featured.pain}
                </p>
              </Depth>
            </div>
          </Tilt>
        </Reveal>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {catalog.items.map((item, index) => (
            <Reveal delay={(index % 3) * 0.07} key={item.number}>
              <Tilt
                className="flex h-full flex-col rounded-[28px] p-7"
                surface
                surfaceClassName="rounded-[28px]"
              >
                <Depth z={60}>
                  <span className="ez-display text-5xl text-[color:var(--accent)]/80">
                    {item.number}
                  </span>
                </Depth>
                <Depth className="mt-4" z={35}>
                  <h3 className="ez-display text-white text-xl">{item.title}</h3>
                  <p className="mt-2 text-sm text-white/60 leading-relaxed">{item.description}</p>
                </Depth>
                <Depth className="mt-auto pt-5" z={20}>
                  <p className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white/75 text-xs">
                    <span className="font-semibold text-[color:var(--accent)]">
                      {catalog.painLabel}:
                    </span>{' '}
                    {item.pain}
                  </p>
                </Depth>
              </Tilt>
            </Reveal>
          ))}
          <Reveal className="sm:col-span-2 lg:col-span-3">
            <Tilt
              className="rounded-[32px] p-8 sm:p-10"
              max={6}
              surface
              surfaceClassName="rounded-[32px] ez-glass-strong"
            >
              <div className="grid items-center gap-6 md:grid-cols-[auto_1fr_auto]">
                <Depth z={70}>
                  <span className="ez-display ez-extrude text-7xl">{catalog.exclusive.number}</span>
                </Depth>
                <Depth z={40}>
                  <p className="ez-chip">{catalog.exclusive.label}</p>
                  <h3 className="ez-display mt-3 text-2xl text-white">{catalog.exclusive.title}</h3>
                  <p className="mt-2 text-white/60">{catalog.exclusive.description}</p>
                  <p className="mt-3 text-sm text-white/80">
                    <span className="font-semibold text-[color:var(--accent)]">
                      {catalog.painLabel}:
                    </span>{' '}
                    {catalog.exclusive.pain}
                  </p>
                </Depth>
                <Depth z={60}>
                  <p className="max-w-xs rounded-2xl border border-[color:var(--accent)]/40 bg-[color:var(--accent)]/10 p-4 text-sm text-white">
                    {catalog.exclusive.bonus}
                  </p>
                </Depth>
              </div>
            </Tilt>
          </Reveal>
        </div>

        <div className="mt-16">
          <Options />
        </div>
      </Section>

      <Section id="for-who">
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading title={forWho.title} />
            <Reveal delay={0.1}>
              <div className="ez-prose mt-8 text-[1.05rem]">
                <p>{forWho.intro}</p>
                <p>{forWho.introSecondary}</p>
              </div>
            </Reveal>
          </div>
          <div className="flex flex-col gap-3">
            {forWho.insights.map((insight, index) => (
              <Reveal delay={index * 0.07} direction="right" key={insight}>
                <div className="ez-glass relative flex items-start gap-4 rounded-3xl p-5">
                  <span className="ez-icon-orb size-10 shrink-0 rounded-full">
                    <Check aria-hidden className="size-4" />
                  </span>
                  <p className="pt-2 text-white/80">{insight}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal className="mx-auto mt-12 max-w-3xl text-center">
          <p className="ez-serif text-2xl text-white/80">{forWho.closing}</p>
          <div className="mt-8">
            <ContactButton subject={forWho.cta}>{forWho.cta}</ContactButton>
          </div>
        </Reveal>
      </Section>

      <Section id="expert">
        <div className="grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal direction="left">
            <Tilt className="relative mx-auto aspect-[3/4] w-full max-w-sm rounded-[36px]" max={12}>
              <div
                aria-hidden
                className="absolute inset-0 rounded-[36px] border border-white/10"
                style={{
                  background:
                    'radial-gradient(circle at 50% 30%, color-mix(in oklab, var(--accent) 45%, transparent), transparent 65%), linear-gradient(180deg, #121833, #05070f)',
                }}
              />
              <Depth className="absolute inset-0" z={70}>
                <Image
                  alt={expert.name}
                  className="object-contain object-bottom"
                  fill
                  sizes="(min-width: 1024px) 380px, 80vw"
                  src={photo}
                  unoptimized
                />
              </Depth>
              <Depth className="absolute right-4 bottom-4 left-4" z={110}>
                <div className="ez-glass rounded-2xl px-5 py-4">
                  <p className="ez-display text-lg text-white">{expert.name}</p>
                  <p className="text-white/55 text-xs">Neurocientista e economista</p>
                </div>
              </Depth>
            </Tilt>
          </Reveal>
          <div>
            <SectionHeading title={expert.title} />
            <Reveal delay={0.1}>
              <p className="ez-prose mt-6 text-[1.05rem]">{expert.bio}</p>
            </Reveal>
            <Reveal className="mt-8 grid gap-3" delay={0.15}>
              {expert.credentials.map((credential) => (
                <p className="flex items-center gap-3 text-white/85" key={credential}>
                  <GraduationCap aria-hidden className="size-5 text-[color:var(--accent)]" />
                  {credential}
                </p>
              ))}
            </Reveal>
            <Reveal className="mt-8 flex flex-wrap gap-2" delay={0.2}>
              {expert.workAreas.map((area) => (
                <span
                  className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/75"
                  key={area}
                >
                  {area}
                </span>
              ))}
            </Reveal>
          </div>
        </div>
      </Section>

      <Section id="final-cta">
        <SectionHeading align="center" subtitle={finalCta.text} title={finalCta.title} />
        <div className="mt-12">
          <Options />
        </div>
      </Section>
    </>
  )
}
