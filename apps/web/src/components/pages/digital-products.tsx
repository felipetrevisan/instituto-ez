'use client'

import { Book3D } from '@ez/web/components/experience/book-3d'
import { LinkButton } from '@ez/web/components/experience/local-link'
import { PageHero } from '@ez/web/components/experience/page-hero'
import { Reveal } from '@ez/web/components/experience/reveal'
import { useScene } from '@ez/web/components/experience/scene/store'
import { Section, SectionHeading } from '@ez/web/components/experience/section'
import { Depth, Tilt } from '@ez/web/components/experience/tilt'
import { digitalProducts } from '@ez/web/content/ebooks'
import { formatPrice } from '@ez/web/lib/format'
import type { PaymentSettings, PublicEbook } from '@ez/web/types/catalog'
import { Star } from 'lucide-react'

export type DigitalProductsPageProps = {
  ebooks: PublicEbook[]
  currency: PaymentSettings['currency']
}

export function DigitalProductsPage({ ebooks, currency }: DigitalProductsPageProps) {
  useScene({ shape: 'book', accent: '#e54c5b', accentSecondary: '#f2b544', offsetX: 1.8 })
  const { hero, catalog } = digitalProducts
  const featured = ebooks[0]

  return (
    <>
      <PageHero
        aside={
          featured && (
            <div className="hidden lg:block">
              <Book3D
                cover={featured.cover}
                spineColor={featured.accent}
                title={featured.title}
                width={320}
              />
            </div>
          )
        }
        eyebrow={hero.eyebrow}
        lines={[hero.title]}
        subtitle={
          <>
            {hero.subtitle}
            <span className="mt-3 block text-base text-white/50">{hero.text}</span>
          </>
        }
      >
        <a className="ez-btn" href="#catalog">
          {catalog.title} ↓
        </a>
      </PageHero>

      <Section id="catalog">
        <SectionHeading eyebrow={catalog.eyebrow} subtitle={catalog.text} title={catalog.title} />
        {ebooks.length === 0 && (
          <p className="ez-glass relative mt-14 rounded-3xl p-10 text-center text-white/60">
            Novos títulos em breve.
          </p>
        )}
        <div className="mt-14 grid gap-8">
          {ebooks.map((ebook) => (
            <Reveal direction="depth" key={ebook.slug}>
              <Tilt
                className="rounded-[36px] p-8 sm:p-12"
                max={6}
                style={{ ['--accent' as string]: ebook.accent }}
                surface
                surfaceClassName="rounded-[36px]"
              >
                <div className="grid items-center gap-10 lg:grid-cols-[auto_1fr]">
                  <Depth z={90}>
                    <Book3D
                      cover={ebook.cover}
                      float={false}
                      spineColor={ebook.accent}
                      title={ebook.title}
                      width={240}
                    />
                  </Depth>
                  <Depth z={40}>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="ez-chip">eBook</span>
                      <span className="inline-flex items-center gap-1 text-amber-300">
                        {Array.from({ length: ebook.badges.rating }, (_, i) => (
                          <Star aria-hidden className="size-4 fill-current" key={i} />
                        ))}
                        <span className="sr-only">{ebook.badges.rating} estrelas</span>
                      </span>
                      <span className="text-sm text-white/55">
                        +{ebook.badges.downloads} downloads
                      </span>
                    </div>
                    <h3 className="ez-display mt-5 text-[clamp(1.8rem,3.4vw,3rem)] text-white">
                      {ebook.title}
                    </h3>
                    <p className="mt-5 text-[15px] text-white/65 leading-relaxed">
                      {ebook.description}
                    </p>
                    <div className="mt-8 flex flex-wrap items-center gap-6">
                      <LinkButton href={`/ebooks/${ebook.slug}`} variant="primary">
                        {catalog.cta}
                      </LinkButton>
                      <span className="ez-display text-2xl text-white">
                        {formatPrice(ebook.price.regular, currency)}
                      </span>
                    </div>
                  </Depth>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  )
}
