export function getLocalizedLink(locale: string, link: string, isExternal = false): string {
  let localizedLink = `/${locale}/${link}`

  // if the link starts with a slash, it is considered a relative path
  if (link.startsWith('/')) {
     localizedLink = `/${locale}${link}`
  }

  return !isExternal ? localizedLink : link
}
