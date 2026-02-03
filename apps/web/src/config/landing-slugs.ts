type LandingSlugEntry = {
  slugs: readonly string[]
  sitemap?: readonly string[]
}

const landingSlugConfig = {
  home: {
    slugs: ['/', 'home'],
    sitemap: ['/'],
  },
  mathematizer: {
    slugs: ['matematizador', 'mathematizer'],
  },
  'for-business': {
    slugs: ['para-empresas', 'desenvolvimento-humano', 'for-business', 'human-development'],
  },
  mentoring: {
    slugs: ['mentoria-e-assessoria', 'mentoring', 'mentoring-and-consulting'],
    sitemap: ['mentoria-e-assessoria', 'mentoring-and-consulting'],
  },
  about: {
    slugs: ['sobre-nos', 'about-us', 'sobre-nosotros'],
  },
  services: {
    slugs: ['atendimento', 'services', 'servicios'],
  },
  'digital-products': {
    slugs: ['ebooks', 'masterclass', 'produtos-digitais', 'digital-products'],
  },
  immersion: {
    slugs: ['imersao', 'immersion'],
  },
} as const satisfies Record<string, LandingSlugEntry>

export type LandingSlugKey = keyof typeof landingSlugConfig

const landingSlugEntries = Object.entries(landingSlugConfig) as [LandingSlugKey, LandingSlugEntry][]

export const landingSlugsByKey = Object.fromEntries(
  landingSlugEntries.map(([key, value]) => [key, value.slugs]),
) as { [K in LandingSlugKey]: readonly string[] }

export const landingSlugs = [
  ...new Set(landingSlugEntries.flatMap(([, entry]) => entry.sitemap ?? entry.slugs)),
]
