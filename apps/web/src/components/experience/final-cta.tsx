'use client'

import { ContactButton } from './contact'
import { Reveal } from './reveal'
import { Rich } from './rich'
import { Section } from './section'

/** Chamada final: painel com piso em grade 3D e brilho da cor da página. */
export function FinalCta({
  title,
  text,
  tagline,
  cta,
  secondary,
}: {
  title: string
  text: string
  tagline?: string
  cta: string
  secondary?: string
}) {
  return (
    <Section id="final-cta">
      <Reveal direction="depth">
        <div className="ez-glass ez-border-glow relative overflow-hidden rounded-[36px] px-7 py-16 text-center sm:px-16 sm:py-20">
          <div aria-hidden className="ez-grid-floor opacity-50" />
          <div
            aria-hidden
            className="-translate-x-1/2 absolute top-0 left-1/2 h-64 w-[70%] rounded-full blur-3xl"
            style={{ background: 'color-mix(in oklab, var(--accent) 25%, transparent)' }}
          />
          <h2 className="ez-display relative mx-auto max-w-4xl text-balance text-[clamp(2rem,4.6vw,3.8rem)] text-white">
            {title}
          </h2>
          <p className="ez-prose relative mx-auto mt-6 max-w-3xl text-lg">
            <Rich text={text} />
          </p>
          <div className="relative mt-10 flex flex-wrap justify-center gap-3">
            <ContactButton subject={cta}>{cta}</ContactButton>
            {secondary && (
              <ContactButton subject={secondary} variant="ghost">
                {secondary}
              </ContactButton>
            )}
          </div>
          {tagline && <p className="ez-serif relative mt-8 text-white/60 text-xl">{tagline}</p>}
        </div>
      </Reveal>
    </Section>
  )
}
