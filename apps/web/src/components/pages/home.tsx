'use client'

import { Book3D } from '@ez/web/components/experience/book-3d'
import { ContactButton } from '@ez/web/components/experience/contact'
import { Icon } from '@ez/web/components/experience/icon'
import { LinkButton } from '@ez/web/components/experience/local-link'
import { OrbitCarousel } from '@ez/web/components/experience/orbit-carousel'
import { PageHero } from '@ez/web/components/experience/page-hero'
import { Reveal } from '@ez/web/components/experience/reveal'
import { Rich } from '@ez/web/components/experience/rich'
import { useScene } from '@ez/web/components/experience/scene/store'
import { Prose, Section, SectionHeading } from '@ez/web/components/experience/section'
import { Stat } from '@ez/web/components/experience/stat'
import { Depth, Tilt } from '@ez/web/components/experience/tilt'
import { home } from '@ez/web/content/home'
import { immersion } from '@ez/web/content/immersion'
import { useSiteSettings } from '@ez/web/hooks/use-site-settings'
import type { PublicEbook, Testimonial } from '@ez/web/types/catalog'
import { Check, Play } from 'lucide-react'

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item, index) => (
        <li className="flex items-start gap-3" key={item}>
          <Depth z={20 + index * 6}>
            <span className="ez-icon-orb size-8 rounded-xl">
              <Check aria-hidden className="size-4" />
            </span>
          </Depth>
          <span className="pt-1 text-white/80">{item}</span>
        </li>
      ))}
    </ul>
  )
}

export type HomePageProps = { testimonials: Testimonial[]; featuredEbook: PublicEbook | null }

export function HomePage({ testimonials, featuredEbook: ebook }: HomePageProps) {
  const site = useSiteSettings()
  useScene({ shape: 'brain', accent: '#f2b544', accentSecondary: '#5b8cff', offsetX: 1.75 })
  const { hero, services, mentoring, mathematizer, development, digitalProducts } = home

  return (
    <>
      <PageHero
        accent={hero.titleAccent}
        eyebrow={`${site.name} · ${site.slogan}`}
        lines={hero.titleLines}
        subtitle={hero.subtitle}
      >
        <ContactButton subject={hero.primaryCta}>{hero.primaryCta}</ContactButton>
        <LinkButton href="/sobre-nos">{hero.secondaryCta}</LinkButton>
      </PageHero>

      {/* Atendimentos individuais */}
      <Section id="services">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <SectionHeading eyebrow={services.eyebrow} title={services.title} />
            <Reveal delay={0.1}>
              <Prose className="mt-8" paragraphs={services.paragraphs} />
            </Reveal>
            <Reveal className="mt-10 flex gap-12" delay={0.2}>
              {services.stats.map((stat) => (
                <Stat key={stat.label} {...stat} />
              ))}
            </Reveal>
          </div>
          <Reveal direction="right">
            <Tilt className="rounded-[32px] p-8 sm:p-10" surface surfaceClassName="rounded-[32px]">
              <Depth z={50}>
                <p className="ez-chip">Primeira consulta</p>
              </Depth>
              <Depth className="mt-6" z={30}>
                <CheckList items={services.items} />
              </Depth>
              <Depth className="mt-10 flex flex-wrap gap-3" z={60}>
                <ContactButton subject={services.primaryCta}>{services.primaryCta}</ContactButton>
                <LinkButton href={services.href}>{services.secondaryCta}</LinkButton>
              </Depth>
            </Tilt>
          </Reveal>
        </div>
      </Section>

      {/* Depoimentos */}
      {testimonials.length > 0 && (
        <Section className="overflow-hidden" id="testimonials">
          <SectionHeading align="center" eyebrow={site.name} title={home.testimonialsTitle} />
          <Reveal className="mt-12" direction="depth">
            <OrbitCarousel items={testimonials} />
          </Reveal>
        </Section>
      )}

      {/* Mentoria */}
      <Section id="mentoring">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
          <SectionHeading
            eyebrow={mentoring.eyebrow}
            subtitle={mentoring.subtitle}
            title={mentoring.title}
          />
          <Reveal delay={0.1}>
            <p className="ez-prose text-[1.05rem]">{mentoring.description}</p>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {mentoring.items.map((item, index) => (
            <Reveal delay={(index % 3) * 0.08} key={item.title}>
              <Tilt className="h-full rounded-[28px] p-7" surface surfaceClassName="rounded-[28px]">
                <Depth z={60}>
                  <span className="ez-icon-orb size-14">
                    <Icon className="size-6" name={item.icon} />
                  </span>
                </Depth>
                <Depth className="mt-6" z={35}>
                  <h3 className="ez-display text-white text-xl">{item.title}</h3>
                </Depth>
                <Depth className="mt-3" z={15}>
                  <p className="text-sm text-white/60 leading-relaxed">{item.text}</p>
                </Depth>
              </Tilt>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12 flex justify-center">
          <LinkButton href={mentoring.href} variant="primary">
            {mentoring.cta}
          </LinkButton>
        </Reveal>
      </Section>

      {/* Sistema Neuroanalítico */}
      <Section id="mathematizer">
        <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal className="order-2 lg:order-1" direction="left">
            <Tilt
              className="overflow-hidden rounded-[32px] p-8 sm:p-10"
              max={14}
              surface
              surfaceClassName="rounded-[32px]"
            >
              <div aria-hidden className="ez-grid-floor opacity-50" />
              <Depth className="grid grid-cols-2 gap-8" z={70}>
                {mathematizer.stats.map((stat) => (
                  <Stat key={stat.label} {...stat} />
                ))}
              </Depth>
              <Depth className="mt-10 grid gap-3 sm:grid-cols-2" z={35}>
                {mathematizer.items.map((item) => (
                  <div
                    className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/80"
                    key={item}
                  >
                    {item}
                  </div>
                ))}
              </Depth>
            </Tilt>
          </Reveal>
          <div className="order-1 lg:order-2">
            <SectionHeading eyebrow={mathematizer.eyebrow} title={mathematizer.title} />
            <Reveal delay={0.1}>
              <Prose className="mt-8" paragraphs={mathematizer.paragraphs} />
            </Reveal>
            <Reveal className="mt-10 flex flex-wrap gap-3" delay={0.2}>
              <ContactButton subject={mathematizer.primaryCta}>
                {mathematizer.primaryCta}
              </ContactButton>
              <LinkButton href={mathematizer.href}>{mathematizer.secondaryCta}</LinkButton>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Palestras e workshops */}
      <Section id="development">
        <SectionHeading
          eyebrow={development.eyebrow}
          subtitle={development.subtitle}
          title={development.title}
        />
        <Reveal delay={0.1}>
          <p className="ez-prose mt-8 max-w-4xl text-[1.05rem]">{development.description}</p>
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {development.items.map((item, index) => (
            <Reveal
              delay={(index % 2) * 0.1}
              direction={index % 2 ? 'right' : 'left'}
              key={item.title}
            >
              <Tilt
                className="flex h-full gap-6 rounded-[28px] p-7 sm:p-8"
                surface
                surfaceClassName="rounded-[28px]"
              >
                <Depth z={70}>
                  <span className="ez-display ez-extrude text-5xl">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </Depth>
                <Depth z={30}>
                  <h3 className="ez-display text-white text-xl">{item.title}</h3>
                  <p className="mt-3 text-sm text-white/60 leading-relaxed">{item.text}</p>
                </Depth>
              </Tilt>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12 flex flex-wrap justify-center gap-3">
          <ContactButton subject={development.primaryCta}>{development.primaryCta}</ContactButton>
          <LinkButton href={development.href}>{development.secondaryCta}</LinkButton>
        </Reveal>
      </Section>

      {/* Produtos digitais */}
      <Section id="digital-products">
        <SectionHeading
          align="center"
          eyebrow={digitalProducts.eyebrow}
          title={digitalProducts.title}
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {digitalProducts.cards.map((card, index) => (
            <Reveal delay={index * 0.12} direction="depth" key={card.title}>
              <Tilt
                className="flex h-full flex-col rounded-[32px] p-8 sm:p-10"
                max={8}
                surface
                surfaceClassName="rounded-[32px]"
              >
                <Depth className="flex items-center justify-between gap-4" z={40}>
                  <span className="ez-chip">
                    {index === 0 ? (
                      <Play aria-hidden className="size-3" />
                    ) : (
                      <Icon className="size-3" name="book-open" />
                    )}
                    {card.kind}
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-white/70 text-xs">
                    Em breve
                  </span>
                </Depth>
                <div className="mt-6 grid items-center gap-6 sm:grid-cols-[1fr_auto]">
                  <Depth z={30}>
                    <h3 className="ez-display text-3xl text-white">{card.title}</h3>
                    <Prose className="mt-5 text-sm" paragraphs={card.paragraphs} />
                  </Depth>
                  {index === 1 && ebook && (
                    <Depth className="hidden sm:block" z={90}>
                      <Book3D
                        cover={ebook.cover}
                        float={false}
                        spineColor={ebook.accent}
                        title={ebook.title}
                        width={150}
                      />
                    </Depth>
                  )}
                </div>
                <Depth className="mt-auto pt-8" z={60}>
                  <LinkButton href={card.href} variant="primary">
                    {card.cta}
                  </LinkButton>
                </Depth>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Imersão */}
      <Section id="immersion">
        <Reveal direction="depth">
          <Tilt className="overflow-hidden rounded-[36px]" max={6}>
            <div
              aria-hidden
              className="absolute inset-0 bg-center bg-cover"
              style={{ backgroundImage: `url(${immersion.hero.image})` }}
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-r from-[#03050d] via-[#03050d]/85 to-[#03050d]/30"
            />
            <div className="relative grid gap-8 p-8 sm:p-14 lg:grid-cols-[1.2fr_0.8fr]">
              <Depth z={50}>
                <p className="ez-eyebrow" style={{ color: '#ff8a65' }}>
                  {home.immersion.eyebrow}
                </p>
                <h2 className="ez-display mt-5 text-[clamp(2rem,4.6vw,3.6rem)] text-white">
                  {home.immersion.title}
                </h2>
                <div className="ez-prose mt-6">
                  {home.immersion.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 24)}>
                      <Rich text={paragraph} />
                    </p>
                  ))}
                </div>
                <div className="mt-8">
                  <LinkButton href={home.immersion.href} variant="primary">
                    {home.immersion.cta}
                  </LinkButton>
                </div>
              </Depth>
            </div>
          </Tilt>
        </Reveal>
      </Section>
    </>
  )
}
