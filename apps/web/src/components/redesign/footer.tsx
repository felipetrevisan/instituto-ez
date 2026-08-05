import type { RedesignLayoutContent } from '@ez/web/content/redesign/types'
import { Link } from '@ez/web/i18n/redesign-navigation'
import { Mail, MapPin, Phone } from 'lucide-react'

export function RedesignFooter({ content }: { content: RedesignLayoutContent['footer'] }) {
  return (
    <footer className="w-full border-[var(--rdg-outline-ghost)] border-t bg-[var(--rdg-bg-lowest)]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-16 md:grid-cols-3">
        <div>
          <span className="mb-2 block font-bold text-2xl text-[var(--rdg-copper)]">
            {content.brand}
          </span>
          <p className="text-[var(--rdg-on-surface-variant)] text-sm">{content.tagline}</p>
        </div>

        <div>
          <h3 className="rdg-label mb-4 text-[var(--rdg-on-surface)]">{content.servicesTitle}</h3>
          <ul className="space-y-3">
            {content.services.map((service) => (
              <li key={service.label}>
                <Link
                  className="text-[var(--rdg-on-surface-variant)] text-sm transition-colors hover:text-[var(--rdg-copper)]"
                  href={service.href}
                >
                  {service.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="rdg-label mb-4 text-[var(--rdg-on-surface)]">{content.contactTitle}</h3>
          <ul className="space-y-3 text-[var(--rdg-on-surface-variant)] text-sm">
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-[var(--rdg-copper)]" />
              <a
                className="transition-colors hover:text-[var(--rdg-copper)]"
                href={`mailto:${content.email}`}
              >
                {content.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-[var(--rdg-copper)]" />
              {content.phone}
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-[var(--rdg-copper)]" />
              {content.location}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-[var(--rdg-outline-ghost)] border-t px-6 py-6 text-center text-[var(--rdg-on-surface-variant)] text-xs">
        {content.copyright}
      </div>
    </footer>
  )
}
