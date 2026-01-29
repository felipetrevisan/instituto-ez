import { landingSlugs } from '@ez/web/config/landing-slugs'
import { routing } from '@ez/web/i18n/routing'
import { getEbooks } from '@ez/web/server/get-ebook'
import { getCanonicalPath, getMetadataBase } from '@ez/web/utils/seo'
import type { MetadataRoute } from 'next'

function normalizePath(slug: string) {
  if (slug === '/') return '/'

  return `/${slug.replace(/^\/+/, '')}`
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getMetadataBase()
  const entries: MetadataRoute.Sitemap = []
  const seen = new Set<string>()

  const pushUrl = (path: string) => {
    const url = new URL(path, baseUrl).toString()
    if (seen.has(url)) return
    seen.add(url)
    entries.push({ url })
  }

  for (const locale of routing.locales) {
    for (const slug of landingSlugs) {
      const canonicalPath = getCanonicalPath(locale, normalizePath(slug))
      pushUrl(canonicalPath)
    }
  }

  const ebooks = await getEbooks()

  for (const ebook of ebooks ?? []) {
    if (ebook.disabled) continue

    for (const locale of routing.locales) {
      const currentSlug = ebook.slug?.[locale]?.current
      if (!currentSlug) continue

      const canonicalPath = getCanonicalPath(locale, `/ebooks/${currentSlug}`)
      pushUrl(canonicalPath)
    }
  }

  return entries
}
