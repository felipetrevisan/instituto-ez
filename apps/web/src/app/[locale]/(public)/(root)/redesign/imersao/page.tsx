import { FaqAccordion } from '@ez/web/components/redesign/faq-accordion'
import { RedesignFooter } from '@ez/web/components/redesign/footer'
import { RedesignNav } from '@ez/web/components/redesign/nav'
import { NeuralBackground } from '@ez/web/components/redesign/neural-background'
import { ParallaxImage } from '@ez/web/components/redesign/parallax-image'
import { RevealSection } from '@ez/web/components/redesign/reveal-section'
import { StaggerGrid } from '@ez/web/components/redesign/stagger-grid'
import { TiltCard } from '@ez/web/components/redesign/tilt-card'
import { redesignImersaoContent } from '@ez/web/content/redesign/imersao'
import { redesignLayoutContent } from '@ez/web/content/redesign/layout'
import { CheckCircle2, MapPin } from 'lucide-react'
import type { Locale } from 'next-intl'

const GALLERY_COUNT = 10

export default async function RedesignImersaoPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const content = redesignImersaoContent[locale]
  const layout = redesignLayoutContent[locale]

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      <NeuralBackground />
      <RedesignNav content={layout.nav} />

      <main className="flex-1 pt-20">
        {/* Hero */}
        <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-6 text-center">
          <ParallaxImage
            alt={content.hero.imageAlt}
            className="h-full w-full object-cover opacity-40"
            containerClassName="absolute inset-0 -z-10"
            height={1080}
            priority
            src="/assets/redesign/imersao-hero.jpg"
            width={1920}
          />
          <div className="-z-10 absolute inset-0 bg-gradient-to-b from-[var(--rdg-bg)]/40 via-[var(--rdg-bg)]/70 to-[var(--rdg-bg)]" />
          <h1 className="rdg-display mb-6">{content.hero.title}</h1>
          <div className="rdg-label mb-8 flex flex-wrap items-center justify-center gap-3 text-[var(--rdg-copper)]">
            {content.hero.tags.map((tag, index) => (
              <span className="flex items-center gap-3" key={tag}>
                {index > 0 && <span className="opacity-40">•</span>}
                {tag}
              </span>
            ))}
          </div>
          <button className="rdg-btn rdg-btn-primary px-8 py-4" type="button">
            {content.hero.cta}
          </button>
        </section>

        {/* Intro */}
        <RevealSection className="mx-auto w-full max-w-4xl px-6 py-24">
          <h2 className="rdg-headline mb-8 text-center">{content.intro.title}</h2>
          <div className="space-y-6">
            {content.intro.paragraphs.map((paragraph) => (
              <p
                className="text-[var(--rdg-on-surface-variant)] text-lg"
                key={paragraph.slice(0, 24)}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </RevealSection>

        {/* Guides */}
        <RevealSection className="relative mx-auto w-full max-w-7xl px-6 py-24">
          <div
            aria-hidden
            className="-z-10 -translate-x-1/2 absolute inset-y-0 left-1/2 w-screen bg-[var(--rdg-surface-low)]"
          />
          <div className="mb-16 text-center">
            <span className="rdg-label mb-4 block text-[var(--rdg-copper)]">
              {content.guides.eyebrow}
            </span>
            <h2 className="rdg-headline mb-4">{content.guides.title}</h2>
            <p className="mx-auto max-w-2xl text-[var(--rdg-on-surface-variant)]">
              {content.guides.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
            <ParallaxImage
              alt={content.guides.imageAlt}
              className="h-full w-full object-cover"
              containerClassName="rdg-glass aspect-square w-full rounded-[2rem] p-2"
              height={1000}
              src="/assets/redesign/imersao-guides.jpg"
              width={1000}
            />
            <div className="space-y-6">
              {content.guides.people.map((person) => (
                <TiltCard className="rdg-glass rounded-[2rem] p-8" key={person.name}>
                  <h3 className="mb-1 font-bold text-xl">{person.name}</h3>
                  <p className="rdg-label mb-3 text-[var(--rdg-copper)]">{person.role}</p>
                  <p className="text-[var(--rdg-on-surface-variant)] text-sm">{person.bio}</p>
                </TiltCard>
              ))}
            </div>
          </div>
        </RevealSection>

        {/* 7 Elements */}
        <RevealSection className="mx-auto w-full max-w-7xl px-6 py-24">
          <div className="mb-12 text-center">
            <span className="rdg-label mb-4 block text-[var(--rdg-copper)]">
              {content.elements.eyebrow}
            </span>
            <h2 className="rdg-headline mb-4">{content.elements.title}</h2>
            <p className="mx-auto max-w-2xl text-[var(--rdg-on-surface-variant)]">
              {content.elements.intro}
            </p>
          </div>
          <ParallaxImage
            alt={content.elements.imageAlt}
            className="h-full w-full object-cover"
            containerClassName="rdg-glass mb-12 aspect-[21/9] w-full rounded-[2rem] p-2"
            height={686}
            src="/assets/redesign/imersao-elements.jpg"
            width={1600}
          />
          <StaggerGrid className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {content.elements.items.map((item, index) => (
              <TiltCard className="rdg-glass rounded-[2rem] p-8" key={item.title}>
                <span className="rdg-copper-text mb-3 block font-bold text-2xl">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mb-3 font-bold text-lg">{item.title}</h3>
                <p className="text-[var(--rdg-on-surface-variant)] text-sm">{item.description}</p>
              </TiltCard>
            ))}
          </StaggerGrid>
          <p className="mx-auto mt-12 max-w-2xl text-center text-[var(--rdg-on-surface-variant)]">
            {content.elements.closing}
          </p>
          <div className="mt-8 flex justify-center">
            <button className="rdg-btn rdg-btn-primary px-8 py-4" type="button">
              {content.elements.cta}
            </button>
          </div>
        </RevealSection>

        {/* Gallery */}
        <RevealSection className="relative mx-auto w-full max-w-7xl px-6 py-24">
          <div
            aria-hidden
            className="-z-10 -translate-x-1/2 absolute inset-y-0 left-1/2 w-screen bg-[var(--rdg-surface-low)]"
          />
          <h2 className="rdg-headline mb-10 text-center">{content.gallery.title}</h2>
          <StaggerGrid className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
            {Array.from({ length: GALLERY_COUNT }, (_, index) => (
              <ParallaxImage
                alt={`${content.gallery.imageAlt} ${index + 1}`}
                className="h-full w-full object-cover"
                containerClassName="rdg-glass aspect-[9/16] rounded-2xl p-1"
                height={711}
                key={`imersao-gallery-${index + 1}`}
                src={`/assets/redesign/imersao-gallery/photo-${index + 1}.jpg`}
                width={400}
              />
            ))}
          </StaggerGrid>
        </RevealSection>

        {/* For whom */}
        <RevealSection className="mx-auto w-full max-w-4xl px-6 py-24">
          <div className="mb-10 text-center">
            <span className="rdg-label mb-4 block text-[var(--rdg-copper)]">
              {content.forWhom.eyebrow}
            </span>
            <h2 className="rdg-headline">{content.forWhom.title}</h2>
          </div>
          <ul className="mb-10 space-y-4">
            {content.forWhom.items.map((item) => (
              <li className="flex items-start gap-3" key={item.slice(0, 24)}>
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--rdg-copper)]" />
                <span className="text-[var(--rdg-on-surface-variant)]">{item}</span>
              </li>
            ))}
          </ul>
          <p className="mb-8 text-center text-[var(--rdg-on-surface-variant)] italic">
            {content.forWhom.footer}
          </p>
          <div className="flex justify-center">
            <button className="rdg-btn rdg-btn-primary px-8 py-4" type="button">
              {content.forWhom.cta}
            </button>
          </div>
        </RevealSection>

        {/* FAQ */}
        <RevealSection className="relative mx-auto w-full max-w-3xl px-6 py-24">
          <div
            aria-hidden
            className="-z-10 -translate-x-1/2 absolute inset-y-0 left-1/2 w-screen bg-[var(--rdg-surface-low)]"
          />
          <div className="mb-10 text-center">
            <span className="rdg-label mb-4 block text-[var(--rdg-copper)]">
              {content.faq.eyebrow}
            </span>
            <h2 className="rdg-headline">{content.faq.title}</h2>
          </div>
          <FaqAccordion items={content.faq.items} />
        </RevealSection>

        {/* Next class */}
        <RevealSection className="mx-auto w-full max-w-4xl px-6 py-24 text-center">
          <div className="rdg-glass rounded-[2rem] p-16">
            <span className="rdg-label mb-4 block text-[var(--rdg-copper)]">
              {content.nextClass.eyebrow}
            </span>
            <h2 className="rdg-headline mb-8">{content.nextClass.title}</h2>
            <ul className="mx-auto mb-10 max-w-md space-y-3 text-left">
              {content.nextClass.details.map((detail) => (
                <li className="flex items-start gap-3" key={detail.slice(0, 24)}>
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--rdg-copper)]" />
                  <span className="text-[var(--rdg-on-surface-variant)] text-sm">{detail}</span>
                </li>
              ))}
            </ul>
            <button className="rdg-btn rdg-btn-primary px-10 py-4" type="button">
              {content.nextClass.cta}
            </button>
            <p className="rdg-label mt-6 opacity-70">{content.nextClass.footnote}</p>
          </div>
        </RevealSection>
      </main>

      <RedesignFooter content={layout.footer} />
    </div>
  )
}
