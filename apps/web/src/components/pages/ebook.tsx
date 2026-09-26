'use client'

import { Accordion3D } from '@ez/web/components/experience/accordion-3d'
import { Book3D } from '@ez/web/components/experience/book-3d'
import { FlipBook } from '@ez/web/components/experience/flip-book'
import { Icon } from '@ez/web/components/experience/icon'
import { LocalLink } from '@ez/web/components/experience/local-link'
import { FadeUp, SplitTitle } from '@ez/web/components/experience/page-hero'
import { PurchaseButtons } from '@ez/web/components/experience/purchase'
import { Reveal } from '@ez/web/components/experience/reveal'
import { Rich } from '@ez/web/components/experience/rich'
import { useScene } from '@ez/web/components/experience/scene/store'
import { Prose, Section, SectionHeading } from '@ez/web/components/experience/section'
import { Stat } from '@ez/web/components/experience/stat'
import { Depth, Tilt } from '@ez/web/components/experience/tilt'
import { formatPrice } from '@ez/web/lib/format'
import type {
  CheckoutOptions,
  PaymentSettings,
  PublicEbook,
  Testimonial,
} from '@ez/web/types/catalog'
import { ArrowLeft, Clock, Download, Play, Quote, Star } from 'lucide-react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import Image from 'next/image'
import { useState } from 'react'

const seals = ['guarantee', 'quality', 'refund', 'safe-buy'].map(
  (name) => `/assets/images/seals/pt/${name}.png`,
)

function Video({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false)

  return (
    <div className="relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-black">
      {playing ? (
        <iframe
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 size-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
        />
      ) : (
        <button
          aria-label={`Reproduzir vídeo: ${title}`}
          className="group absolute inset-0 grid place-items-center"
          onClick={() => setPlaying(true)}
          type="button"
        >
          {/* biome-ignore lint/performance/noImgElement: thumbnail externa do YouTube */}
          <img
            alt=""
            className="absolute inset-0 size-full object-cover opacity-70 transition group-hover:scale-105"
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
          />
          <span className="relative grid size-20 place-items-center rounded-full bg-[color:var(--accent)] text-white shadow-[0_0_0_12px_color-mix(in_oklab,var(--accent)_25%,transparent)] transition group-hover:scale-110">
            <Play aria-hidden className="ml-1 size-8 fill-current" />
          </span>
        </button>
      )}
    </div>
  )
}

type PageProps = {
  ebook: PublicEbook
  testimonials: Testimonial[]
  checkout: CheckoutOptions
  currency: PaymentSettings['currency']
}

function StickyBuyBar({ ebook, checkout, currency }: Omit<PageProps, 'testimonials'>) {
  const { scrollY } = useScroll()
  const [visible, setVisible] = useState(false)
  useMotionValueEvent(scrollY, 'change', (value) => {
    const nearEnd = value + window.innerHeight > document.documentElement.scrollHeight - 900
    setVisible(value > window.innerHeight * 0.9 && !nearEnd)
  })

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          className="fixed inset-x-3 bottom-3 z-40 sm:inset-x-auto sm:right-6 sm:bottom-6"
          exit={{ y: 40, opacity: 0, rotateX: 40 }}
          initial={{ y: 40, opacity: 0, rotateX: 40 }}
          style={{ transformPerspective: 800, transformOrigin: 'bottom' }}
        >
          <div className="ez-glass ez-glass-strong ez-border-glow flex items-center gap-4 rounded-full p-2 pl-5">
            <div className="flex flex-col leading-tight">
              <span className="max-w-40 truncate text-white/60 text-xs sm:max-w-56">
                {ebook.title}
              </span>
              <span className="ez-display text-white">
                {formatPrice(ebook.price.regular, currency)}
              </span>
            </div>
            <PurchaseButtons checkout={checkout} compact ebook={ebook} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function EbookPage({ ebook, testimonials, checkout, currency }: PageProps) {
  useScene({
    shape: 'book',
    accent: ebook.accent,
    accentSecondary: ebook.accentSecondary,
    offsetX: -1.9,
  })

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[100svh] items-center pt-28 pb-16">
        <div className="mx-auto grid w-full max-w-[1280px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
          <FadeUp className="order-2 lg:order-1" delay={0.3}>
            <Book3D cover={ebook.cover} spineColor={ebook.accent} title={ebook.title} width={330} />
          </FadeUp>
          <div className="order-1 lg:order-2">
            <FadeUp>
              <LocalLink className="ez-link inline-flex items-center gap-2 text-sm" href="/ebooks">
                <ArrowLeft aria-hidden className="size-4" /> Voltar para o Catálogo
              </LocalLink>
            </FadeUp>
            <FadeUp className="mt-6 flex flex-wrap items-center gap-4 text-sm" delay={0.1}>
              <span className="inline-flex items-center gap-1 text-amber-300">
                {Array.from({ length: ebook.badges.rating }, (_, i) => (
                  <Star aria-hidden className="size-4 fill-current" key={i} />
                ))}
                <span className="sr-only">{ebook.badges.rating} estrelas</span>
              </span>
              <span className="inline-flex items-center gap-2 text-white/70">
                <Download aria-hidden className="size-4 text-[color:var(--accent)]" /> +
                {ebook.badges.downloads} downloads
              </span>
              <span className="inline-flex items-center gap-2 text-white/70">
                <Clock aria-hidden className="size-4 text-[color:var(--accent)]" /> Atualizado{' '}
                {ebook.badges.updated}
              </span>
            </FadeUp>
            <SplitTitle className="mt-6 text-[clamp(2.4rem,5.6vw,4.8rem)]" lines={[ebook.title]} />
            <FadeUp className="mt-6" delay={0.6}>
              <p className="text-[1.05rem] text-white/65 leading-relaxed">{ebook.description}</p>
            </FadeUp>
            <FadeUp className="mt-9 flex flex-wrap items-center gap-6" delay={0.8}>
              <PurchaseButtons checkout={checkout} ebook={ebook} />
              <div className="leading-tight">
                <span className="block text-white/50 text-xs uppercase tracking-[0.2em]">
                  {ebook.price.label}
                </span>
                <span className="ez-display text-3xl text-white">
                  {formatPrice(ebook.price.regular, currency)}
                </span>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Metadados */}
      {ebook.metadata.length > 0 && (
        <Section className="!py-10" id="overview">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            {ebook.metadata.map((item, index) => (
              <Reveal delay={index * 0.07} direction="depth" key={item.label}>
                <Tilt
                  className="h-full rounded-[28px] p-6"
                  max={16}
                  surface
                  surfaceClassName="rounded-[28px]"
                >
                  <Depth z={50}>
                    <span className="ez-icon-orb size-11">
                      <Icon className="size-5" name={item.icon} />
                    </span>
                  </Depth>
                  <Depth className="mt-5" z={80}>
                    <Stat label={item.label} value={item.value} />
                  </Depth>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* Índice + vídeo */}
      {(ebook.index.title || ebook.index.paragraphs.length > 0 || ebook.index.videoId) && (
        <Section id="index">
          <SectionHeading align="center" title={ebook.index.title} />
          <div
            className={`mt-14 grid items-start gap-12 ${ebook.index.videoId ? 'lg:grid-cols-[1.05fr_0.95fr]' : 'mx-auto max-w-3xl'}`}
          >
            {ebook.index.videoId && (
              <Reveal direction="left">
                <p className="ez-eyebrow mb-5">{ebook.index.videoTitle}</p>
                <Tilt className="rounded-3xl" max={6}>
                  <Video id={ebook.index.videoId} title={ebook.index.videoTitle} />
                </Tilt>
              </Reveal>
            )}
            <Reveal delay={0.1}>
              <Prose paragraphs={ebook.index.paragraphs} />
              <p className="mt-6 font-semibold text-white leading-relaxed">{ebook.index.closing}</p>
              <div className="mt-8">
                <PurchaseButtons checkout={checkout} ebook={ebook} />
              </div>
            </Reveal>
          </div>
        </Section>
      )}

      {/* Folheie */}
      {ebook.pages.length > 0 && (
        <Section id="chapters">
          <SectionHeading align="center" title="Folheie e conheça o Ebook por dentro" />
          <Reveal className="mt-14" direction="depth">
            <FlipBook pages={[ebook.cover, ...ebook.pages]} title={ebook.title} />
          </Reveal>
        </Section>
      )}

      {/* Depoimentos */}
      {testimonials.length > 0 && (
        <Section id="testimonials">
          <SectionHeading align="center" title="Depoimentos" />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {testimonials.map((item, index) => (
              <Reveal delay={index * 0.1} direction="depth" key={item.id}>
                <Tilt
                  className="flex h-full flex-col rounded-[28px] p-7"
                  surface
                  surfaceClassName="rounded-[28px]"
                >
                  <Depth z={60}>
                    <Quote aria-hidden className="size-8 text-[color:var(--accent)]" />
                  </Depth>
                  <Depth className="mt-4 flex-1" z={30}>
                    <blockquote className="text-[14.5px] text-white/70 leading-relaxed">
                      {item.text}
                    </blockquote>
                  </Depth>
                  <Depth className="mt-6 border-white/10 border-t pt-5" z={45}>
                    <p className="font-medium text-sm text-white">{item.author}</p>
                  </Depth>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* Perguntas */}
      {ebook.questions.length > 0 && (
        <Section id="questions">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SectionHeading title="Perguntas Frequentes" />
            </div>
            <Accordion3D items={ebook.questions} />
          </div>
        </Section>
      )}

      {/* Autor */}
      <Section id="author">
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
                  alt={ebook.author.name}
                  className="object-contain object-bottom"
                  fill
                  sizes="(min-width: 1024px) 380px, 80vw"
                  src={ebook.author.photo}
                  unoptimized
                />
              </Depth>
            </Tilt>
          </Reveal>
          <div>
            <SectionHeading eyebrow={ebook.author.name} title="Sobre o Autor" />
            <Reveal delay={0.1}>
              <Prose className="mt-8" paragraphs={ebook.author.paragraphs} />
              <p className="mt-6 font-semibold text-white">{ebook.author.closing}</p>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Compra */}
      <Section id="buy">
        <Reveal direction="depth">
          <Tilt
            className="rounded-[40px] p-8 sm:p-14"
            max={5}
            surface
            surfaceClassName="rounded-[40px] ez-glass-strong"
          >
            <div className="grid items-center gap-10 lg:grid-cols-[auto_1fr]">
              <Depth className="mx-auto" z={100}>
                <Book3D
                  cover={ebook.cover}
                  float={false}
                  spineColor={ebook.accent}
                  title={ebook.title}
                  width={220}
                />
              </Depth>
              <Depth z={45}>
                <h2 className="ez-display text-[clamp(2rem,4.4vw,3.6rem)] text-white">
                  Garanta já seu eBook
                </h2>
                <p className="mt-3 text-lg text-white/60">
                  <Rich text={`**${ebook.title}** — PDF com acesso imediato.`} />
                </p>
                <div className="mt-8 flex flex-wrap items-end gap-8">
                  <div className="leading-none">
                    <span className="block text-white/50 text-xs uppercase tracking-[0.2em]">
                      {ebook.price.label}
                    </span>
                    <span className="ez-display ez-extrude mt-2 block text-6xl">
                      {formatPrice(ebook.price.regular, currency)}
                    </span>
                  </div>
                  <PurchaseButtons checkout={checkout} ebook={ebook} />
                </div>
              </Depth>
            </div>
          </Tilt>
        </Reveal>
        <div className="mt-14 text-center">
          <SectionHeading align="center" title="Selos de Garantia" titleClassName="!text-2xl" />
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            {seals.map((seal, index) => (
              <Reveal delay={index * 0.08} direction="depth" key={seal}>
                <Tilt className="rounded-full" max={22}>
                  <Image
                    alt=""
                    className="size-24 object-contain drop-shadow-[0_12px_20px_rgba(0,0,0,0.5)] sm:size-28"
                    height={112}
                    src={seal}
                    unoptimized
                    width={112}
                  />
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <StickyBuyBar checkout={checkout} currency={currency} ebook={ebook} />
    </>
  )
}
