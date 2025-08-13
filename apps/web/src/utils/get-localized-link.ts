import { useLocale } from 'next-intl'

export function getLocalizedLink(link: string, isExternal = false): string {
  const locale = useLocale()
  let localizedLink = `/${locale}/${link}`

  // if the link starts with a slash, it is considered a relative path
  if (link.startsWith('/')) {
     localizedLink = `/${locale}${link}`
  }

  return !isExternal ? localizedLink : link
}
