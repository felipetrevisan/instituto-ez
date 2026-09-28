'use client'

import { PageHero } from '@ez/web/components/experience/page-hero'
import { Reveal } from '@ez/web/components/experience/reveal'
import { useScene } from '@ez/web/components/experience/scene/store'
import { Section } from '@ez/web/components/experience/section'
import { privacy } from '@ez/web/content/privacy'
import { useSiteSettings } from '@ez/web/hooks/use-site-settings'

export function PrivacyPage() {
  useScene({ shape: 'lattice', accent: '#35e0c2', accentSecondary: '#5b8cff', offsetX: 1.7 })
  const site = useSiteSettings()

  return (
    <>
      <PageHero
        accent="Privacidade"
        eyebrow={`Atualizada em ${privacy.updatedAt}`}
        lines={['Política de']}
        subtitle={privacy.intro}
      />
      <Section containerClassName="max-w-[880px]">
        <div className="space-y-6">
          {privacy.sections.map((section, index) => (
            <Reveal delay={index * 0.05} direction="depth" key={section.title}>
              <article className="ez-glass p-7 sm:p-9">
                <h2 className="ez-display text-2xl text-white sm:text-3xl">{section.title}</h2>
                <div className="ez-prose mt-4">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
          <Reveal direction="depth">
            <article className="ez-glass p-7 sm:p-9">
              <h2 className="ez-display text-2xl text-white sm:text-3xl">Contato</h2>
              <p className="ez-prose mt-4">
                {privacy.contact}{' '}
                <a
                  className="ez-accent underline underline-offset-4"
                  href={`mailto:${site.contact.email}`}
                >
                  {site.contact.email}
                </a>
                .
              </p>
            </article>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
