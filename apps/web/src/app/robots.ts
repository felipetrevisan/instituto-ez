import { getMetadataBase } from '@ez/web/utils/seo'
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getMetadataBase()

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: new URL('/sitemap.xml', baseUrl).toString(),
  }
}
