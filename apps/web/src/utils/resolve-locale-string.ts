type LocalizedString = Record<string, string> | string | null | undefined

export const resolveLocaleString = (value: LocalizedString, locale?: string) => {
  if (typeof value === 'string') return value
  if (!value || typeof value !== 'object') return undefined

  if (locale && typeof value[locale] === 'string') {
    return value[locale]
  }

  const fallback = Object.values(value).find((entry) => typeof entry === 'string')
  return typeof fallback === 'string' ? fallback : undefined
}
