'use client'

import { ContactButton } from '@ez/web/components/experience/contact'
import { Icon } from '@ez/web/components/experience/icon'
import { LinkButton, LocalLink } from '@ez/web/components/experience/local-link'
import { PageHero } from '@ez/web/components/experience/page-hero'
import { Reveal } from '@ez/web/components/experience/reveal'
import { Rich } from '@ez/web/components/experience/rich'
import { useScene } from '@ez/web/components/experience/scene/store'
import { Section, SectionHeading } from '@ez/web/components/experience/section'
import { Depth, Tilt } from '@ez/web/components/experience/tilt'
import { about } from '@ez/web/content/about'
import { useSiteSettings } from '@ez/web/hooks/use-site-settings'
import { ArrowUpRight } from 'lucide-react'

export function AboutPage() {
  const site = useSiteSettings()
  useScene({ shape: 'network', accent: '#5ad1ff', accentSecondary: '#f2b544', offsetX: 1.6 })
  const { hero, intro, services, whyChoose } = about

  return (
    <>
      <PageHero
        accent={hero.titleAccent}
        eyebrow={site.name}
        lines={[hero.title]}
        subtitle={hero.subtitle}
        titleClassName="text-[clamp(2.4rem,6vw,5.2rem)]"
      >
        <ContactButton subject={hero.cta}>{hero.cta}</ContactButton>
      </PageHero>

      <Section id="intro">
        <SectionHeading eyebrow={site.slogan} title={intro.title} />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {intro.items.map((item, index) => (
            <Reveal delay={index * 0.1} direction="depth" key={item.title}>
              <Tilt className="h-full rounded-[32px] p-8" surface surfaceClassName="rounded-[32px]">
                <Depth z={70}>
                  <span className="ez-display ez-extrude text-6xl">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </Depth>
                <Depth className="mt-8" z={40}>
                  <h3 className="ez-display text-3xl text-white">
                    <span className="text-white/50">{item.kicker}</span>{' '}
                    <span className="ez-serif ez-text-gradient font-normal">{item.title}</span>
                  </h3>
                </Depth>
                <Depth className="mt-5" z={15}>
                  <p className="text-[15px] text-white/65 leading-relaxed">
                    <Rich text={item.text} />
                  </p>
                </Depth>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="services">
        <SectionHeading align="center" subtitle={services.subtitle} title={services.title} />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.items.map((item, index) => (
            <Reveal delay={(index % 3) * 0.08} key={item.title}>
              <LocalLink className="group block h-full" href={item.href}>
                <Tilt
                  className="flex h-full flex-col rounded-[28px] p-7"
                  surface
                  surfaceClassName="rounded-[28px]"
                >
                  <Depth className="flex items-start justify-between" z={60}>
                    <span className="ez-icon-orb size-14">
                      <Icon className="size-6" name={item.icon} />
                    </span>
                    <ArrowUpRight
                      aria-hidden
                      className="group-hover:-translate-y-1 size-5 text-white/30 transition group-hover:translate-x-1 group-hover:text-[color:var(--accent)]"
                    />
                  </Depth>
                  <Depth className="mt-6" z={35}>
                    <h3 className="ez-display text-white text-xl">{item.title}</h3>
                  </Depth>
                  <Depth className="mt-3" z={15}>
                    <p className="text-sm text-white/60 leading-relaxed">{item.text}</p>
                  </Depth>
                </Tilt>
              </LocalLink>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="why-choose">
        <Reveal direction="depth">
          <div className="ez-glass ez-border-glow relative overflow-hidden rounded-[36px] px-7 py-16 text-center sm:px-16">
            <div aria-hidden className="ez-grid-floor opacity-40" />
            <h2 className="ez-display relative mx-auto max-w-3xl text-[clamp(2rem,4.6vw,3.6rem)] text-white">
              {whyChoose.title}
            </h2>
            <p className="ez-prose relative mx-auto mt-6 max-w-3xl text-lg">
              <Rich text={whyChoose.text} />
            </p>
            <div className="relative mt-10 flex flex-wrap justify-center gap-3">
              <LinkButton href="/" variant="primary">
                {whyChoose.cta}
              </LinkButton>
              <ContactButton subject="Falar com o Instituto" variant="ghost">
                Falar com o Instituto
              </ContactButton>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  )
}
