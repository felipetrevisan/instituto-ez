import { getAvailableLandingPages } from '@ez/web/config/landing-page'

export function useLandingConfig(pageKey?: string) {
  if (!pageKey) return null

  return getAvailableLandingPages().find((page) => page.key === pageKey) ?? null
}
