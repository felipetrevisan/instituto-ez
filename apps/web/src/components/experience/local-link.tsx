'use client'

import { routing } from '@ez/web/i18n/routing'
import { getLocalizedLink } from '@ez/web/utils/get-localized-link'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { useLocale } from 'next-intl'
import type { ComponentProps, ReactNode } from 'react'

export function LocalLink({
  href,
  ...props
}: Omit<ComponentProps<typeof NextLink>, 'href'> & { href: string }) {
  const locale = useLocale()
  return <NextLink href={getLocalizedLink(locale, href)} {...props} />
}

/** Caminho atual sem o prefixo de idioma, ex.: "/sobre-nos". */
export function useBarePathname() {
  const pathname = usePathname() ?? '/'
  const segments = pathname.split('/').filter(Boolean)
  if (segments[0] && (routing.locales as readonly string[]).includes(segments[0])) segments.shift()
  const bare = `/${segments.join('/')}`
  return bare === '/home' ? '/' : bare
}

export function LinkButton({
  href,
  children,
  variant = 'ghost',
  className,
}: {
  href: string
  children: ReactNode
  variant?: 'primary' | 'ghost'
  className?: string
}) {
  return (
    <LocalLink
      className={`${variant === 'primary' ? 'ez-btn' : 'ez-btn-ghost'} ${className ?? ''}`}
      href={href}
    >
      {children}
      <span aria-hidden>→</span>
    </LocalLink>
  )
}
