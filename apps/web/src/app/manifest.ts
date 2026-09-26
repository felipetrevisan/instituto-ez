import { getSiteSettings } from '@ez/web/server/catalog'
import { DEFAULT_FAVICON } from '@ez/web/types/site'
import type { MetadataRoute } from 'next'

export const revalidate = 300

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const settings = await getSiteSettings()

  return {
    name: settings.name,
    short_name: settings.name,
    description: settings.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#03050d',
    theme_color: '#03050d',
    icons: [{ src: settings.favicon || DEFAULT_FAVICON, sizes: 'any' }],
  }
}
