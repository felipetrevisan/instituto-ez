export function getLocalizedLink(
  locale: string,
  link: string,
  isExternal = false,
  isHash = false,
): string {
  if (link === null) {
    return '/'
  }

  // Hash links (#section)
  if (isHash || link.startsWith('#')) {
    return link
  }

  // External URLs (http, https, mailto, tel)
  if (isExternal || /^(https?:\/\/|mailto:|tel:)/i.test(link)) {
    return link
  }

  // Normalize to avoid double slashes later
  const cleanLink = link.replace(/^\/+/, '')

  // Build localized internal path
  return `/${locale}/${cleanLink}`
}
