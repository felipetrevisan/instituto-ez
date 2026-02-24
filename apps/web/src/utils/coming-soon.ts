import type { Navigation, NavigationItem } from '@ez/web/types/site'

export type HomeComingSoonMap = {
  services: boolean
  mentorship: boolean
  mathematizer: boolean
  development: boolean
  immersion: boolean
  digitalProducts: boolean
}

const defaultHomeComingSoonMap: HomeComingSoonMap = {
  services: false,
  mentorship: false,
  mathematizer: false,
  development: false,
  immersion: false,
  digitalProducts: false,
}

const normalizeText = (value: string) =>
  value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')

const toTokenList = (value: unknown): string[] => {
  if (!value) return []
  if (typeof value === 'string') return [normalizeText(value)]
  if (Array.isArray(value)) return value.flatMap((item) => toTokenList(item))
  if (typeof value === 'object') return Object.values(value).flatMap((item) => toTokenList(item))
  return []
}

const includesAny = (tokens: string[], values: string[]) =>
  values.some((value) => tokens.some((token) => token.includes(normalizeText(value))))

const getItemTokens = (item: NavigationItem) => {
  return [
    ...toTokenList(item.label),
    ...toTokenList(item.url?.link),
    ...(item.url?.type ? [String(item.url.type).toLowerCase()] : []),
  ]
}

const resolveFeatureFlags = (tokens: string[]) => {
  return {
    services: includesAny(tokens, ['service', 'servico', 'atendimento']),
    mentorship: includesAny(tokens, ['mentorship', 'mentoria', 'mentoring']),
    mathematizer: includesAny(tokens, ['mathematizer', 'matematizador']),
    development: includesAny(tokens, ['workshop', 'palestra', 'lecture', 'development', 'desenvolvimento']),
    immersion: includesAny(tokens, ['immersion', 'imersao']),
    digitalProducts: includesAny(tokens, [
      'masterclass',
      'ebook',
      'ebooks',
      'produtos-digitais',
      'produtos digitais',
      'digital-products',
      'digital products',
    ]),
  }
}

export const getHomeComingSoonMap = (navigation?: Navigation): HomeComingSoonMap => {
  const map: HomeComingSoonMap = { ...defaultHomeComingSoonMap }
  const items = navigation?.items ?? []

  const visit = (item: NavigationItem) => {
    const tokens = getItemTokens(item)
    const flags = resolveFeatureFlags(tokens)

    if (item.comingSoon) {
      if (flags.services) map.services = true
      if (flags.mentorship) map.mentorship = true
      if (flags.mathematizer) map.mathematizer = true
      if (flags.development) map.development = true
      if (flags.immersion) map.immersion = true
      if (flags.digitalProducts) map.digitalProducts = true
    }

    item.submenuItems?.forEach(visit)
  }

  items.forEach(visit)
  return map
}
