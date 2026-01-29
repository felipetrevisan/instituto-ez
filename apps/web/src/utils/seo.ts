import { env } from '@ez/web/config/env'
import { routing } from '@ez/web/i18n/routing'
import { getLocalizedLink } from '@ez/web/utils/get-localized-link'

export function getMetadataBase(): URL {
  const value = env.NEXT_PUBLIC_VERCEL_URL

  try {
    return new URL(value)
  } catch {
    return new URL(`https://${value}`)
  }
}

function resolveLocalizedPath(locale: string, path: string) {
  if (path === '/') return '/'

  const pathnames = routing.pathnames as Record<string, string | Record<string, string>>
  const mapped = pathnames[path]

  if (!mapped) return path
  if (typeof mapped === 'string') return mapped

  return mapped[locale] ?? mapped[routing.defaultLocale] ?? path
}

export function getCanonicalPath(locale: string, path: string) {
  return getLocalizedLink(locale, resolveLocalizedPath(locale, path))
}

export function buildAlternates(locale: string, path: string) {
  const canonical = getCanonicalPath(locale, path)
  const languages = Object.fromEntries(
    routing.locales.map((entry) => [entry, getCanonicalPath(entry, path)]),
  )

  return {
    canonical,
    languages,
  }
}
