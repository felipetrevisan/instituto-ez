'use client'

import { footerNav, site as siteContent } from '@ez/web/content/site'
import { useSiteSettings } from '@ez/web/hooks/use-site-settings'
import { Mail, MapPin, Phone } from 'lucide-react'
import Image from 'next/image'
import { ContactButton } from './contact'
import { LocalLink } from './local-link'
import { Reveal } from './reveal'

export function Footer() {
  const year = new Date().getFullYear()
  const site = useSiteSettings()

  return (
    <footer
      className="relative mt-24 overflow-hidden border-white/5 border-t"
      style={{ perspective: 900 }}
    >
      <div aria-hidden className="ez-grid-floor opacity-40" />
      <div className="relative mx-auto max-w-[1400px] px-5 pt-20 pb-10 sm:px-8">
        <Reveal direction="depth">
          <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <p className="ez-eyebrow">{site.slogan}</p>
              <p className="ez-display mt-5 text-4xl text-white sm:text-6xl">
                Clareza não é sorte, <span className="ez-serif ez-text-gradient">é método.</span>
              </p>
            </div>
            <ContactButton subject="Contato pelo site">Falar com o Instituto EZ</ContactButton>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-10 border-white/5 border-t pt-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <Image
                alt=""
                className="rounded-full ring-1 ring-white/15"
                height={44}
                src={site.logo}
                unoptimized
                width={44}
              />
              <div>
                <p className="ez-display font-semibold text-white">{site.name}</p>
                <p className="text-white/50 text-xs uppercase tracking-[0.2em]">{site.slogan}</p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm text-white/55 leading-relaxed">
              {siteContent.fullName}
            </p>
          </div>

          <nav aria-label="Serviços">
            <h4 className="font-semibold text-sm text-white">Serviços</h4>
            <ul className="mt-4 space-y-2.5">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <LocalLink className="ez-link text-sm" href={item.href}>
                    {item.label}
                  </LocalLink>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h4 className="font-semibold text-sm text-white">Contato</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  className="ez-link inline-flex items-center gap-2"
                  href={`mailto:${site.contact.email}`}
                >
                  <Mail aria-hidden className="size-4 text-[color:var(--accent)]" />
                  {site.contact.email}
                </a>
              </li>
              {site.contact.phone && (
                <li>
                  <a
                    className="ez-link inline-flex items-center gap-2"
                    href={site.contact.phoneHref}
                  >
                    <Phone aria-hidden className="size-4 text-[color:var(--accent)]" />
                    {site.contact.phone}
                  </a>
                </li>
              )}
              {site.contact.location && (
                <li className="inline-flex items-center gap-2 text-white/55">
                  <MapPin aria-hidden className="size-4 text-[color:var(--accent)]" />
                  {site.contact.location}
                </li>
              )}
            </ul>
          </div>
        </div>

        <p className="mt-14 text-center text-white/40 text-xs">
          © {year} {site.name}. {siteContent.copyright}
        </p>
      </div>
    </footer>
  )
}
